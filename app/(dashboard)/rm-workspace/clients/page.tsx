"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRole } from "@/lib/role-context"
import { useMarket, useFormatCurrency } from "@/lib/market-context"
import { useRmPortfolio, focusScore, CATEGORY_META, churnBand } from "@/lib/rm/use-portfolio"
import type { EnrichedClient } from "@/lib/rm/use-portfolio"
import { useFocus, FOCUS_PRIORITY_META } from "@/lib/rm/focus"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Loader2, Search, Shield, ArrowRight, SlidersHorizontal } from "lucide-react"

type Filter = "all" | "SME" | "HNW" | "Retail" | "atrisk"

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "SME", label: "SME" },
  { key: "HNW", label: "High Net Worth" },
  { key: "Retail", label: "Retail" },
  { key: "atrisk", label: "At Risk" },
]

export default function RMClientsPage() {
  const { currentRole, currentBankingUserId } = useRole()
  const { market } = useMarket()
  const fmt = useFormatCurrency()
  const [focus] = useFocus()
  const { clients, loading, totals } = useRmPortfolio(currentBankingUserId, market)
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<Filter>("all")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const matchesFilter = (c: EnrichedClient) => {
      if (filter === "all") return true
      if (filter === "atrisk") return c.churnScore >= 50
      return c.category === filter
    }
    return clients
      .filter(matchesFilter)
      .filter((c) => !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q))
      .sort((a, b) => focusScore(b, focus) - focusScore(a, focus))
  }, [clients, query, filter, focus])

  const counts = useMemo(
    () => ({
      all: clients.length,
      SME: totals.sme,
      HNW: totals.hnw,
      Retail: clients.filter((c) => c.category === "Retail").length,
      atrisk: clients.filter((c) => c.churnScore >= 50).length,
    }),
    [clients, totals],
  )

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
      <PageHeader title="Clients" description="Your full book — search and filter to find anyone fast." />

      {/* Search + focus hint */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or email…"
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search clients by name or email"
          />
        </div>
        <Link
          href="/rm-workspace/focus"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Sorted by focus: <span className="font-medium text-foreground">{FOCUS_PRIORITY_META[focus.priority].label}</span>
        </Link>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.key
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {f.label}
              <span className={`rounded-full px-1.5 text-[10px] ${active ? "bg-primary/20" : "bg-muted"}`}>
                {counts[f.key]}
              </span>
            </button>
          )
        })}
      </div>

      {loading ? (
        <div className="flex h-[40vh] items-center justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b px-4 py-2.5 text-xs text-muted-foreground">
              <span>
                Showing <span className="font-medium text-foreground">{filtered.length}</span> of {clients.length} clients
              </span>
              <span>Total AUM {fmt(totals.aum)}</span>
            </div>
            <div className="divide-y">
              {filtered.map((c) => (
                <ClientRow key={c.id} client={c} fmt={fmt} />
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No clients match this filter.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function ClientRow({ client, fmt }: { client: EnrichedClient; fmt: (n: number) => string }) {
  const band = churnBand(client.churnScore)
  const cat = CATEGORY_META[client.category]
  return (
    <Link
      href={`/rm-workspace/${client.id}`}
      className="group flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-muted/40"
    >
      <div className="flex min-w-0 items-center gap-3">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
            {client.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-medium">{client.name}</p>
            <Badge variant="secondary" className={`text-[10px] ${cat.className}`}>
              {cat.label}
            </Badge>
          </div>
          <p className="truncate text-xs text-muted-foreground">{client.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <div className="hidden text-right sm:block">
          <div className={`flex items-center justify-end gap-1.5 text-xs font-medium ${band.className}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${band.dot}`} />
            {client.churnScore >= 40 ? `Churn ${client.churnScore}` : band.label}
          </div>
          {client.topConcern && client.churnScore >= 40 && (
            <p className="mt-0.5 max-w-[220px] truncate text-[11px] text-muted-foreground">{client.topConcern}</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{fmt(client.totalBalance)}</p>
          <p className="text-xs text-muted-foreground">{client.accountCount} acct{client.accountCount === 1 ? "" : "s"}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </Link>
  )
}
