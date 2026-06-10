"use client"

import type React from "react"
import { useMemo } from "react"
import Link from "next/link"
import { useRole } from "@/lib/role-context"
import { useMarket, useFormatCurrency } from "@/lib/market-context"
import { useRmPortfolio, CATEGORY_META, churnBand } from "@/lib/rm/use-portfolio"
import type { EnrichedClient, ChurnSignal } from "@/lib/rm/use-portfolio"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Loader2,
  Shield,
  Radar,
  Users,
  TrendingDown,
  AlertTriangle,
  PhoneCall,
  MessageSquareWarning,
  Banknote,
  TrendingUp,
  ArrowRight,
} from "lucide-react"
import { DraftOutreachButton } from "@/components/rm/draft-outreach-button"

const SIGNAL_ICON: Record<ChurnSignal["source"], React.ElementType> = {
  segment: AlertTriangle,
  transaction: TrendingDown,
  ticket: MessageSquareWarning,
  call: PhoneCall,
  loan: Banknote,
  balance: TrendingDown,
}

function savePlay(c: EnrichedClient): string {
  if (c.churnSignals.some((s) => s.source === "call" || s.source === "ticket"))
    return "Call today — acknowledge the issue directly, offer a fee/rate review, and a retention package."
  if (c.churnScore >= 70) return "Urgent retention call — a senior RM should reach out before month-end."
  if (c.category === "SME") return "Offer a working-capital facility to re-anchor the business relationship."
  if (c.category === "HNW") return "Book a wealth review — move idle cash into better-yielding products."
  return "Proactive check-in to understand the recent change in behaviour."
}

export default function RMRetentionPage() {
  const { currentRole, currentBankingUserId } = useRole()
  const { market } = useMarket()
  const fmt = useFormatCurrency()
  const { clients, loading } = useRmPortfolio(currentBankingUserId, market)

  const radar = useMemo(
    () => clients.filter((c) => c.churnScore >= 25).sort((a, b) => b.churnScore - a.churnScore),
    [clients],
  )
  const stats = useMemo(() => {
    const high = clients.filter((c) => c.churnScore >= 70)
    const watch = clients.filter((c) => c.churnScore >= 40 && c.churnScore < 70)
    const aumAtRisk = clients.filter((c) => c.churnScore >= 40).reduce((t, c) => t + c.aumAtRiskValue, 0)
    return { high: high.length, watch: watch.length, aumAtRisk }
  }, [clients])

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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Retention Radar"
        description="Clients showing signs of leaving — ranked by flight risk, with the signals and a save play for each."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="High flight risk" value={stats.high} icon={AlertTriangle} accent="negative" />
        <StatCard title="On watch" value={stats.watch} icon={Radar} accent="warning" />
        <StatCard title="AUM at risk" value={fmt(stats.aumAtRisk)} icon={TrendingDown} accent="negative" />
      </div>

      {loading ? (
        <div className="flex h-[40vh] items-center justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
        </div>
      ) : radar.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            <Users className="mx-auto mb-3 h-10 w-10 opacity-40" />
            No flight-risk signals in your book right now — your portfolio looks healthy.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {radar.map((c) => (
            <RetentionCard key={c.id} client={c} fmt={fmt} />
          ))}
        </div>
      )}
    </div>
  )
}

function RetentionCard({ client, fmt }: { client: EnrichedClient; fmt: (n: number) => string }) {
  const band = churnBand(client.churnScore)
  const cat = CATEGORY_META[client.category]
  return (
    <Card className={client.churnScore >= 70 ? "border-red-500/30" : client.churnScore >= 40 ? "border-amber-500/30" : ""}>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11">
              <AvatarFallback className="bg-primary/15 text-primary text-sm font-semibold">
                {client.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                {client.name}
                <Badge variant="secondary" className={`text-[10px] ${cat.className}`}>
                  {cat.label}
                </Badge>
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                {fmt(client.totalBalance)} balance · <span className="font-medium text-red-600 dark:text-red-400">≈ {fmt(client.aumAtRiskValue)} at risk</span> · {client.openTickets} open ticket{client.openTickets === 1 ? "" : "s"}
              </p>
            </div>
          </div>
          <div className="w-40">
            <div className="mb-1 flex items-center justify-between">
              <span className={`text-xs font-semibold ${band.className}`}>{band.label}</span>
              <span className="text-xs font-semibold tabular-nums">{client.churnScore}/100</span>
            </div>
            <Progress value={client.churnScore} className="h-1.5" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Signals */}
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Why it's flagged
          </p>
          <div className="flex flex-wrap gap-2">
            {client.churnSignals.map((s, i) => {
              const Icon = SIGNAL_ICON[s.source]
              return (
                <span
                  key={i}
                  className="inline-flex max-w-full items-center gap-1.5 rounded-md border bg-muted/40 px-2 py-1 text-xs"
                >
                  <Icon className="h-3 w-3 shrink-0 text-muted-foreground" />
                  <span className="truncate">{s.label}</span>
                </span>
              )
            })}
          </div>
        </div>

        {/* Save play */}
        <div className="flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3">
          <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Recommended save play</p>
            <p className="text-sm">{savePlay(client)}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button asChild size="sm">
            <Link href={`/rm-workspace/${client.id}`}>
              Open 360 <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <DraftOutreachButton clientId={client.id} clientName={client.name} opportunity={savePlay(client)} />
        </div>
      </CardContent>
    </Card>
  )
}
