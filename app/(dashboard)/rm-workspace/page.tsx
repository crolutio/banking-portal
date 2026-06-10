"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useRole } from "@/lib/role-context"
import { useMarket, useFormatCurrency } from "@/lib/market-context"
import { useRmPortfolio, focusScore, CATEGORY_META, churnBand } from "@/lib/rm/use-portfolio"
import type { EnrichedClient } from "@/lib/rm/use-portfolio"
import { useFocus, FOCUS_PRIORITY_META, type FocusPriority } from "@/lib/rm/focus"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PortfolioPulseRow } from "@/components/rm/portfolio-pulse-row"
import { DraftOutreachButton } from "@/components/rm/draft-outreach-button"
import { MorningBriefing } from "@/components/rm/morning-briefing"
import {
  Users,
  TrendingUp,
  AlertCircle,
  Target,
  Loader2,
  Shield,
  ArrowRight,
  Sparkles,
  Phone,
  Flame,
} from "lucide-react"

const PRIORITY_ORDER: FocusPriority[] = ["balanced", "sme", "hnw", "churn", "dormant"]

function actionFor(c: EnrichedClient): string {
  if (c.churnSignals.some((s) => s.source === "call" || s.source === "ticket"))
    return "Retention call — address the open issue"
  if (c.churnScore >= 60) return "Urgent: reach out before they leave"
  if (c.category === "SME") return "Offer working-capital / cash management"
  if (c.category === "HNW") return "Wealth review — put idle cash to work"
  if (c.openTickets > 0) return "Follow up on open request"
  return "Proactive relationship check-in"
}

function actionPriority(c: EnrichedClient): "high" | "medium" | "low" {
  if (c.churnScore >= 60) return "high"
  if (c.churnScore >= 30 || c.openTickets > 0) return "medium"
  return "low"
}

export default function RMTodayPage() {
  const { currentRole, currentBankingUserId } = useRole()
  const { market } = useMarket()
  const fmt = useFormatCurrency()
  const [focus, setFocus] = useFocus()
  const { clients, loading, totals } = useRmPortfolio(currentBankingUserId, market)

  const ranked = useMemo(
    () => [...clients].sort((a, b) => focusScore(b, focus) - focusScore(a, focus)),
    [clients, focus],
  )
  const top3 = useMemo(() => ranked.slice(0, 3), [ranked])
  const queue = useMemo(() => ranked.slice(3, 9), [ranked])

  if (currentRole !== "relationship_manager") {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
            <p className="text-muted-foreground">The RM Workspace is only available to Relationship Manager users.</p>
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
      <PageHeader title="Today" description="Your most pressing client work, ranked for you." />

      {/* Focus banner */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card">
        <CardContent className="flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">This week's focus:</span>
            <span className="font-semibold">{FOCUS_PRIORITY_META[focus.priority].label}</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {PRIORITY_ORDER.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setFocus({ priority: p })}
                className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                  focus.priority === p
                    ? "border-primary bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/50"
                }`}
              >
                {FOCUS_PRIORITY_META[p].label}
              </button>
            ))}
            <Link href="/rm-workspace/focus" className="ml-1 text-xs text-muted-foreground underline-offset-2 hover:underline">
              more
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Brief me — auto-generates on load */}
      <MorningBriefing clients={ranked} focus={focus} focusLabel={FOCUS_PRIORITY_META[focus.priority].label} />

      {/* Top 3 priorities */}
      {top3.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Top priorities today
            </h2>
          </div>
          <PriorityHero client={top3[0]} rank={1} fmt={fmt} autoDraft={focus.autoDraft} />
          {top3.length > 1 && (
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {top3.slice(1).map((c, i) => (
                <PriorityMini key={c.id} client={c} rank={i + 2} fmt={fmt} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Stat cards — framed around money */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Portfolio Clients" value={totals.count} icon={Users} accent="primary" />
        <StatCard title="Total AUM" value={fmt(totals.aum)} icon={TrendingUp} accent="positive" />
        <StatCard
          title="AUM at Risk"
          value={fmt(totals.aumAtRiskValue)}
          icon={AlertCircle}
          accent="negative"
          description={`${totals.atRisk} client${totals.atRisk === 1 ? "" : "s"} flagged`}
        />
        <StatCard
          title="Open Opportunity"
          value={fmt(totals.opportunity)}
          icon={Target}
          accent="warning"
          description={`${totals.openActions} open action${totals.openActions === 1 ? "" : "s"}`}
        />
      </div>

      {/* AI Portfolio Pulse */}
      {currentBankingUserId && <PortfolioPulseRow rmId={currentBankingUserId} />}

      {/* Action queue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-4 w-4 text-primary" /> Your action queue
          </CardTitle>
          <Link href="/rm-workspace/clients" className="text-xs text-muted-foreground hover:text-foreground">
            View all clients →
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {queue.map((c) => {
              const pr = actionPriority(c)
              const band = churnBand(c.churnScore)
              return (
                <Link
                  key={c.id}
                  href={`/rm-workspace/${c.id}`}
                  className="group flex items-center justify-between gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/40"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
                        {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium">{c.name}</p>
                        <Badge variant="secondary" className={`text-[10px] ${CATEGORY_META[c.category].className}`}>
                          {CATEGORY_META[c.category].label}
                        </Badge>
                      </div>
                      <p className="truncate text-xs text-muted-foreground">
                        {actionFor(c)} ·{" "}
                        {c.churnScore >= 40
                          ? `${fmt(c.aumAtRiskValue)} at risk`
                          : `${fmt(c.opportunityValue)} opportunity`}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    {c.churnScore >= 40 && (
                      <span className={`hidden text-xs font-medium sm:inline ${band.className}`}>churn {c.churnScore}</span>
                    )}
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${
                        pr === "high"
                          ? "border-red-500/50 text-red-600 dark:text-red-400"
                          : pr === "medium"
                            ? "border-yellow-500/50 text-yellow-600 dark:text-yellow-400"
                            : "border-border text-muted-foreground"
                      }`}
                    >
                      {pr}
                    </Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </Link>
              )
            })}
            {queue.length === 0 && (
              <div className="py-6 text-center text-sm text-muted-foreground">No clients in your portfolio yet.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PriorityHero({
  client,
  rank = 1,
  fmt,
  autoDraft,
}: {
  client: EnrichedClient
  rank?: number
  fmt: (n: number) => string
  autoDraft: boolean
}) {
  const band = churnBand(client.churnScore)
  const cat = CATEGORY_META[client.category]
  return (
    <Card className="overflow-hidden border-primary/30">
      <div className="bg-primary/10 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
        <span className="inline-flex items-center gap-1.5">
          <Flame className="h-3.5 w-3.5" /> #{rank} priority right now
        </span>
      </div>
      <CardContent className="flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14 shrink-0">
            <AvatarFallback className="bg-primary/15 text-primary text-lg font-semibold">
              {client.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold">{client.name}</h2>
              <Badge variant="secondary" className={`text-[10px] ${cat.className}`}>
                {cat.label}
              </Badge>
              {client.churnScore >= 40 && (
                <span className={`inline-flex items-center gap-1 text-xs font-medium ${band.className}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${band.dot}`} /> {band.label} · {client.churnScore}
                </span>
              )}
              <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                {client.churnScore >= 40
                  ? `≈ ${fmt(client.aumAtRiskValue)} at risk`
                  : `≈ ${fmt(client.opportunityValue)} opportunity`}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {client.topConcern ?? `${cat.label} client · ${fmt(client.totalBalance)} balance`}
            </p>
            <p className="mt-0.5 text-sm font-medium">{actionFor(client)}</p>
            {autoDraft && (
              <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-primary">
                <Sparkles className="h-3 w-3" /> Outreach already drafted for you
              </p>
            )}
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {client.phone && (
            <Button asChild variant="outline" size="sm">
              <a href={`tel:${client.phone}`}>
                <Phone className="h-3.5 w-3.5" /> Call
              </a>
            </Button>
          )}
          <DraftOutreachButton
            clientId={client.id}
            clientName={client.name}
            opportunity={client.topConcern ?? actionFor(client)}
          />
          <Button asChild size="sm">
            <Link href={`/rm-workspace/${client.id}`}>
              Open 360 <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function PriorityMini({
  client,
  rank,
  fmt,
}: {
  client: EnrichedClient
  rank: number
  fmt: (n: number) => string
}) {
  const band = churnBand(client.churnScore)
  const cat = CATEGORY_META[client.category]
  const atRisk = client.churnScore >= 40
  return (
    <Card className="flex h-full flex-col">
      <CardContent className="flex flex-1 flex-col gap-3 py-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {rank}
          </span>
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarFallback className="bg-primary/15 text-primary text-sm font-semibold">
              {client.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="truncate text-sm font-semibold">{client.name}</p>
              <Badge variant="secondary" className={`text-[10px] ${cat.className}`}>
                {cat.label}
              </Badge>
              {atRisk && (
                <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${band.className}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${band.dot}`} /> {client.churnScore}
                </span>
              )}
            </div>
            <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
              {client.topConcern ?? `${cat.label} client · ${fmt(client.totalBalance)} balance`}
            </p>
            <p className="mt-1 text-xs font-medium">{actionFor(client)}</p>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium">
            {atRisk ? `≈ ${fmt(client.aumAtRiskValue)} at risk` : `≈ ${fmt(client.opportunityValue)} opportunity`}
          </span>
          <div className="flex items-center gap-1.5">
            <DraftOutreachButton
              clientId={client.id}
              clientName={client.name}
              opportunity={client.topConcern ?? actionFor(client)}
              label="Draft"
            />
            <Button asChild size="sm" variant="outline">
              <Link href={`/rm-workspace/${client.id}`}>
                Open <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
