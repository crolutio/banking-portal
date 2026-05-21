"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  Lightbulb,
  Loader2,
  Radar,
  Sparkles,
  Star,
  ArrowRight,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Urgency = "high" | "medium" | "low"

interface PulseItem {
  clientId: string
  clientName: string
  reason: string
  urgency: Urgency
}

const URGENCY_META: Record<
  Urgency,
  { icon: React.ReactNode; label: string; cardClass: string; badgeClass: string }
> = {
  high: {
    icon: <AlertTriangle className="h-4 w-4" />,
    label: "Act today",
    cardClass:
      "border-amber-300 bg-amber-50/40 dark:border-amber-900 dark:bg-amber-950/30 hover:border-amber-400",
    badgeClass:
      "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  },
  medium: {
    icon: <Star className="h-4 w-4" />,
    label: "This week",
    cardClass:
      "border-blue-300 bg-blue-50/40 dark:border-blue-900 dark:bg-blue-950/30 hover:border-blue-400",
    badgeClass:
      "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  },
  low: {
    icon: <Lightbulb className="h-4 w-4" />,
    label: "Next call",
    cardClass:
      "border-emerald-300 bg-emerald-50/40 dark:border-emerald-900 dark:bg-emerald-950/30 hover:border-emerald-400",
    badgeClass:
      "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  },
}

const REQUEST_TIMEOUT_MS = 30_000

export function PortfolioPulseRow({ rmId }: { rmId: string }) {
  const [items, setItems] = useState<PulseItem[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!rmId) return
    const controller = new AbortController()
    let cancelled = false
    let timedOut = false
    const timer = setTimeout(() => {
      timedOut = true
      controller.abort()
    }, REQUEST_TIMEOUT_MS)

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch("/api/rm-portfolio-pulse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rmId }),
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`Pulse API returned ${res.status}`)
        const data = (await res.json()) as { items: PulseItem[] }
        if (cancelled) return
        setItems(data.items ?? [])
      } catch (err: any) {
        if (cancelled) return
        // Component-unmount / StrictMode re-run aborts are not real failures.
        if (err?.name === "AbortError" && !timedOut) return
        console.warn("[PortfolioPulseRow] error:", err?.message)
        setError("Pulse temporarily unavailable.")
        setItems([])
      } finally {
        clearTimeout(timer)
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
      controller.abort()
      clearTimeout(timer)
    }
  }, [rmId])

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Radar className="h-4 w-4 text-primary" />
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                Portfolio Pulse
                {loading ? (
                  <Badge
                    variant="outline"
                    className="gap-1 text-[10px] font-normal border-primary/40 bg-primary/10 text-primary animate-pulse"
                  >
                    <Loader2 className="h-2.5 w-2.5 animate-spin" />
                    Analyzing…
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-[10px] font-normal gap-1">
                    <Sparkles className="h-2.5 w-2.5" />
                    AI flagged
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {loading
                  ? "Reviewing your portfolio for clients that need attention today…"
                  : "Clients to look at first — surfaced from this morning's signal scan."}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading && <PulseLoading />}
        {!loading && items && items.length > 0 && (
          <div className="grid gap-3 md:grid-cols-3">
            {items.map((item) => (
              <PulseCard key={item.clientId} item={item} />
            ))}
          </div>
        )}
        {!loading && items && items.length === 0 && (
          <div className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
            No urgent client signals right now — your portfolio looks calm.
          </div>
        )}
        {error && (
          <p className="mt-3 text-xs text-amber-700 dark:text-amber-300">{error}</p>
        )}
      </CardContent>
    </Card>
  )
}

function PulseCard({ item }: { item: PulseItem }) {
  const meta = URGENCY_META[item.urgency]
  return (
    <Link
      href={`/rm-workspace/${item.clientId}`}
      className={cn(
        "group block rounded-lg border p-3 transition-all hover:shadow-sm",
        meta.cardClass,
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <Badge
          variant="outline"
          className={cn("gap-1 text-[10px]", meta.badgeClass)}
        >
          <span className="[&_svg]:h-3 [&_svg]:w-3">{meta.icon}</span>
          {meta.label}
        </Badge>
        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-sm font-semibold mb-1">{item.clientName}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{item.reason}</p>
    </Link>
  )
}

const PULSE_LOADING_STEPS = [
  "Pulling latest balances and transactions…",
  "Scanning support tickets and call-center conversations…",
  "Reading sentiment across recent client messages…",
  "Cross-referencing loans and credit exposure…",
  "Ranking clients by urgency…",
  "Drafting one-line reasons for the top three…",
]

function PulseLoading() {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setStepIndex((i) => (i + 1) % PULSE_LOADING_STEPS.length)
    }, 1100)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 shadow-sm">
        <div className="relative flex h-8 w-8 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <Loader2 className="relative h-5 w-5 animate-spin text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground leading-tight">
            Analyzing your client book…
          </p>
          <p
            key={stepIndex}
            className="text-xs text-muted-foreground mt-0.5 animate-in fade-in slide-in-from-bottom-1 duration-300"
          >
            {PULSE_LOADING_STEPS[stepIndex]}
          </p>
        </div>
        <Sparkles className="h-4 w-4 text-primary/70 shrink-0" />
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border p-3 space-y-2">
            <div className="h-3.5 w-16 rounded-full bg-muted animate-pulse" />
            <div className="h-4 w-32 rounded bg-muted animate-pulse" />
            <div className="h-3 w-full rounded bg-muted animate-pulse" />
            <div className="h-3 w-3/4 rounded bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
