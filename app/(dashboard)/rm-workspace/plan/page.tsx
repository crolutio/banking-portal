"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRole } from "@/lib/role-context"
import { useMarket, useFormatCurrency } from "@/lib/market-context"
import { useRmPortfolio, focusScore, CATEGORY_META, churnBand } from "@/lib/rm/use-portfolio"
import type { EnrichedClient } from "@/lib/rm/use-portfolio"
import { useFocus, FOCUS_PRIORITY_META } from "@/lib/rm/focus"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DraftOutreachButton } from "@/components/rm/draft-outreach-button"
import {
  Bot,
  Phone,
  Mail,
  MessageCircle,
  MessageSquare,
  Users,
  Loader2,
  Shield,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Clock,
} from "lucide-react"

type Channel = "call" | "whatsapp" | "email" | "sms" | "in_person"

const CHANNEL_META: Record<Channel, { label: string; icon: typeof Phone; className: string }> = {
  call: { label: "Call", icon: Phone, className: "text-red-600 dark:text-red-400" },
  whatsapp: { label: "WhatsApp", icon: MessageCircle, className: "text-emerald-600 dark:text-emerald-400" },
  email: { label: "Email", icon: Mail, className: "text-blue-600 dark:text-blue-400" },
  sms: { label: "SMS", icon: MessageSquare, className: "text-violet-600 dark:text-violet-400" },
  in_person: { label: "In person", icon: Users, className: "text-amber-600 dark:text-amber-400" },
}

const SLOTS = ["9:00 AM", "9:45 AM", "10:30 AM", "11:30 AM", "1:30 PM", "2:30 PM", "3:30 PM", "4:30 PM"]

function headlineFor(c: EnrichedClient): string {
  if (c.churnSignals.some((s) => s.source === "call" || s.source === "ticket")) return "Retention — resolve the open issue"
  if (c.churnScore >= 60) return "Urgent retention outreach"
  if (c.category === "SME") return "Offer working-capital / cash management"
  if (c.category === "HNW") return "Wealth review — put idle cash to work"
  if (c.openTickets > 0) return "Follow up on the open request"
  if (c.isDormant) return "Reactivation nudge"
  return "Proactive relationship check-in"
}

function defaultChannel(c: EnrichedClient): Channel {
  if (c.churnScore >= 40) return "call"
  if (c.openTickets > 0) return "whatsapp"
  return c.category === "Retail" ? "whatsapp" : "email"
}

interface PlanItem {
  client: EnrichedClient
  channel: Channel
  bestTime: string
  headline: string
  talkingPoints: string[]
}

export default function RMDayPlanPage() {
  const { currentRole, currentBankingUserId } = useRole()
  const { market } = useMarket()
  const fmt = useFormatCurrency()
  const [focus] = useFocus()
  const { clients, loading } = useRmPortfolio(currentBankingUserId, market)

  const ranked = useMemo(
    () => [...clients].sort((a, b) => focusScore(b, focus) - focusScore(a, focus)).slice(0, 7),
    [clients, focus],
  )

  const [summary, setSummary] = useState("")
  const [items, setItems] = useState<PlanItem[]>([])
  const [building, setBuilding] = useState(false)
  const startedRef = useRef(false)
  const prevPriorityRef = useRef(focus.priority)

  const deterministicItems = useCallback(
    (cs: EnrichedClient[]): PlanItem[] =>
      cs.map((c, i) => ({
        client: c,
        channel: defaultChannel(c),
        bestTime: SLOTS[i] ?? "Afternoon",
        headline: headlineFor(c),
        talkingPoints: [
          c.topConcern ?? `${CATEGORY_META[c.category].label} relationship check-in`,
          c.churnScore >= 40 ? `≈ ${fmt(c.aumAtRiskValue)} of AUM at risk` : `≈ ${fmt(c.opportunityValue)} opportunity`,
        ],
      })),
    [fmt],
  )

  const build = useCallback(async () => {
    if (ranked.length === 0) return
    setBuilding(true)
    const base = deterministicItems(ranked)
    try {
      const res = await fetch("/api/rm-day-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          market,
          focusLabel: FOCUS_PRIORITY_META[focus.priority].label,
          focus: {
            priority: focus.priority,
            riskSensitivity: focus.riskSensitivity,
            tone: focus.tone,
            autoDraft: focus.autoDraft,
          },
          clients: ranked.map((c) => ({
            name: c.name,
            category: c.category,
            churnScore: c.churnScore,
            topConcern: c.topConcern,
            action: headlineFor(c),
            opportunityValue: c.opportunityValue,
            aumAtRiskValue: c.aumAtRiskValue,
            openTickets: c.openTickets,
          })),
        }),
      })
      if (!res.ok) throw new Error(`Day plan API ${res.status}`)
      const data = await res.json()
      const byName = new Map(ranked.map((c) => [c.name.toLowerCase(), c]))
      const merged: PlanItem[] = (Array.isArray(data.items) ? data.items : [])
        .map((it: any) => {
          const client = byName.get(String(it.clientName ?? "").toLowerCase())
          if (!client) return null
          return {
            client,
            channel: (CHANNEL_META as any)[it.channel] ? (it.channel as Channel) : defaultChannel(client),
            bestTime: typeof it.bestTime === "string" ? it.bestTime : "",
            headline: typeof it.headline === "string" ? it.headline : headlineFor(client),
            talkingPoints: Array.isArray(it.talkingPoints) && it.talkingPoints.length ? it.talkingPoints : [],
          } as PlanItem
        })
        .filter(Boolean) as PlanItem[]
      // assign sequential time slots, keep ranked order for any client the AI dropped
      const finalItems = (merged.length ? merged : base).map((it, i) => ({
        ...it,
        bestTime: it.bestTime || SLOTS[i] || "Afternoon",
      }))
      setItems(finalItems)
      setSummary(typeof data.summary === "string" ? data.summary : "")
    } catch {
      setItems(base)
      setSummary(
        `Good morning. ${ranked.length} priorities lined up for today, led by ${ranked[0]?.name}. This week's focus is ${FOCUS_PRIORITY_META[focus.priority].label}.`,
      )
    } finally {
      setBuilding(false)
    }
  }, [ranked, market, focus, deterministicItems])

  // Build on first load and whenever the focus priority changes.
  useEffect(() => {
    if (ranked.length === 0) return
    if (startedRef.current && prevPriorityRef.current === focus.priority) return
    startedRef.current = true
    prevPriorityRef.current = focus.priority
    build()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ranked, focus.priority])

  if (currentRole !== "relationship_manager") {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
            <p className="text-muted-foreground">The Day Plan is only available to Relationship Manager users.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Day Plan" description="Your AI-built agenda for today — who to reach, when, and what to say." />

      {/* AI summary */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card">
        <CardContent className="flex items-start gap-3 py-4">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Bot className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-sm font-semibold">Your plan for today</span>
              <Badge variant="outline" className="gap-1 text-[10px]">
                <Sparkles className="h-3 w-3 text-primary" /> {FOCUS_PRIORITY_META[focus.priority].label}
              </Badge>
              {building && (
                <Badge variant="outline" className="gap-1 text-[10px]">
                  <Loader2 className="h-2.5 w-2.5 animate-spin" /> Building…
                </Badge>
              )}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {summary || (building ? "Planning your day…" : "")}
            </p>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={build} disabled={building} title="Rebuild plan">
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="space-y-3">
        {items.map((it, i) => {
          const c = it.client
          const ch = CHANNEL_META[it.channel]
          const ChIcon = ch.icon
          const band = churnBand(c.churnScore)
          const cat = CATEGORY_META[c.category]
          const atRisk = c.churnScore >= 40
          return (
            <Card key={c.id} className="overflow-hidden">
              <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start">
                {/* time + step */}
                <div className="flex shrink-0 items-center gap-3 sm:w-28 sm:flex-col sm:items-start">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" /> {it.bestTime}
                  </span>
                </div>

                {/* body */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
                        {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{c.name}</span>
                    <Badge variant="secondary" className={`text-[10px] ${cat.className}`}>{cat.label}</Badge>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${ch.className}`}>
                      <ChIcon className="h-3.5 w-3.5" /> {ch.label}
                    </span>
                    {atRisk && (
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${band.className}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${band.dot}`} /> churn {c.churnScore}
                      </span>
                    )}
                    <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium">
                      {atRisk ? `≈ ${fmt(c.aumAtRiskValue)} at risk` : `≈ ${fmt(c.opportunityValue)} opportunity`}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium">{it.headline}</p>
                  {it.talkingPoints.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {it.talkingPoints.map((tp, j) => (
                        <li key={j} className="flex gap-1.5 text-xs text-muted-foreground">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                          {tp}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* actions */}
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  {c.phone && it.channel === "call" && (
                    <Button asChild variant="outline" size="sm">
                      <a href={`tel:${c.phone}`}><Phone className="h-3.5 w-3.5" /> Call</a>
                    </Button>
                  )}
                  <DraftOutreachButton
                    clientId={c.id}
                    clientName={c.name}
                    opportunity={c.topConcern ?? it.headline}
                    label="Draft"
                  />
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/rm-workspace/${c.id}`}>Open <ArrowRight className="h-3.5 w-3.5" /></Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
        {items.length === 0 && !building && (
          <div className="py-10 text-center text-sm text-muted-foreground">No clients to plan around yet.</div>
        )}
      </div>
    </div>
  )
}
