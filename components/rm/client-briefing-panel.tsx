"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  CompassIcon,
  Lightbulb,
  Loader2,
  Mail,
  Sparkles,
  Target,
  WifiOff,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  getFallbackBriefing,
  hasHardcodedFallback,
  type BriefingResponse,
} from "@/lib/rm/client-briefings"
import {
  readCachedBriefing,
  writeCachedBriefing,
  clearCachedBriefing,
} from "@/lib/rm/briefing-cache"
import { useMarket } from "@/lib/market-context"
import { ConversationDigest } from "@/components/rm/conversation-digest"
import { OutreachDialog } from "@/components/rm/outreach-dialog"

const REQUEST_TIMEOUT_MS = 30_000

type Source = "live" | "cache" | "fallback"

export function ClientBriefingPanel({
  clientId,
  clientName,
}: {
  clientId: string
  clientName: string
}) {
  const { market } = useMarket()
  const [briefing, setBriefing] = useState<BriefingResponse | null>(null)
  const [source, setSource] = useState<Source>("live")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [outreachOpen, setOutreachOpen] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const loadBriefing = useCallback(
    async (opts?: { skipCache?: boolean }) => {
      setLoading(true)
      setError(null)

      if (!opts?.skipCache) {
        const cached = readCachedBriefing(clientId, market)
        if (cached) {
          setBriefing(cached)
          setSource("cache")
          setLoading(false)
          return
        }
      }

      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller
      let timedOut = false
      const timer = setTimeout(() => {
        timedOut = true
        controller.abort()
      }, REQUEST_TIMEOUT_MS)

      // Helper: are we still the in-flight request? React StrictMode mounts
      // effects twice in dev, so the first run's fetch gets aborted and we
      // must not let its rejection clobber the second run's state.
      const isCurrent = () => abortRef.current === controller

      try {
        const res = await fetch("/api/rm-briefing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clientId, market }),
          signal: controller.signal,
        })

        if (!res.ok) {
          throw new Error(`Briefing API returned ${res.status}`)
        }

        const data = (await res.json()) as BriefingResponse
        if (!isCurrent()) return
        setBriefing(data)
        setSource("live")
        writeCachedBriefing(clientId, data, market)
      } catch (err: any) {
        if (!isCurrent()) return
        // AbortError without our timeout flag = component unmount or
        // superseded request. Not a real failure, leave state alone.
        if (err?.name === "AbortError" && !timedOut) {
          return
        }
        console.warn("[ClientBriefingPanel] Falling back:", err?.message ?? err)
        setBriefing(getFallbackBriefing(clientId))
        setSource("fallback")
        setError(
          timedOut
            ? "AI briefing timed out — showing pre-prepared notes."
            : "AI briefing unavailable — showing pre-prepared notes.",
        )
      } finally {
        clearTimeout(timer)
        if (isCurrent()) setLoading(false)
      }
    },
    [clientId, market],
  )

  useEffect(() => {
    loadBriefing()
    return () => abortRef.current?.abort()
  }, [loadBriefing])

  const handleRefresh = () => {
    clearCachedBriefing(clientId, market)
    loadBriefing({ skipCache: true })
  }

  if (loading && !briefing) {
    return <BriefingSkeleton />
  }

  if (!briefing) {
    return null
  }

  const draftOutreachDisabled =
    !briefing.opportunity ||
    briefing.opportunity === getFallbackBriefing("__unknown__").opportunity

  return (
    <>
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card">
        <CardHeader className="pb-3">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" />
              AI Briefing
              {source === "cache" && (
                <Badge variant="outline" className="text-[10px] font-normal">
                  cached
                </Badge>
              )}
              {source === "fallback" && (
                <Badge
                  variant="outline"
                  className="text-[10px] font-normal border-amber-300 text-amber-700 dark:border-amber-900 dark:text-amber-300"
                >
                  <WifiOff className="h-2.5 w-2.5 mr-1" />
                  offline notes
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Proactive insights on <strong>{clientName}</strong> — ready before you walk in.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-lg bg-background/60 border p-4">
            <p className="text-sm leading-relaxed">{briefing.briefing}</p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <InsightCard
              icon={<AlertTriangle className="h-4 w-4" />}
              label="Key Concern"
              text={briefing.main_concern}
              tone="warn"
            />
            <InsightCard
              icon={<Target className="h-4 w-4" />}
              label="Next Best Action"
              text={briefing.next_best_action}
              tone="action"
            />
            <InsightCard
              icon={<Lightbulb className="h-4 w-4" />}
              label="Opportunity"
              text={briefing.opportunity}
              tone="opportunity"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              variant="default"
              onClick={() => setOutreachOpen(true)}
              disabled={draftOutreachDisabled}
              className="h-8"
            >
              <Mail className="h-3.5 w-3.5 mr-1.5" />
              Draft outreach
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRefresh}
              disabled={loading}
              className="h-8 gap-1.5 border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
              title="Re-run the AI briefing for this client"
            >
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Regenerating…
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  Regenerate
                </>
              )}
            </Button>
          </div>

          <ConversationDigest digest={briefing.conversation_digest} />

          {error && source === "fallback" && (
            <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300">
              <CompassIcon className="h-3.5 w-3.5" />
              {error}
              {hasHardcodedFallback(clientId) ? "" : " No pre-prepared notes for this client."}
            </div>
          )}
        </CardContent>
      </Card>

      <OutreachDialog
        open={outreachOpen}
        onOpenChange={setOutreachOpen}
        clientId={clientId}
        clientName={clientName}
        opportunity={briefing.opportunity}
      />
    </>
  )
}

function InsightCard({
  icon,
  label,
  text,
  tone,
}: {
  icon: React.ReactNode
  label: string
  text: string
  tone: "warn" | "action" | "opportunity"
}) {
  const toneClasses: Record<typeof tone, string> = {
    warn:
      "border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20 [&_.icon]:text-amber-600 dark:[&_.icon]:text-amber-400",
    action:
      "border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20 [&_.icon]:text-blue-600 dark:[&_.icon]:text-blue-400",
    opportunity:
      "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20 [&_.icon]:text-emerald-600 dark:[&_.icon]:text-emerald-400",
  }

  return (
    <div className={cn("rounded-lg border p-3 space-y-2", toneClasses[tone])}>
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide font-semibold">
        <span className="icon">{icon}</span>
        {label}
      </div>
      <p className="text-sm leading-relaxed">{text}</p>
    </div>
  )
}

function BriefingSkeleton() {
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <div className="h-4 w-32 rounded bg-muted animate-pulse" />
        </div>
        <div className="h-3 w-64 rounded bg-muted animate-pulse mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border bg-background/60 p-4 space-y-2">
          <div className="h-3 w-full rounded bg-muted animate-pulse" />
          <div className="h-3 w-11/12 rounded bg-muted animate-pulse" />
          <div className="h-3 w-9/12 rounded bg-muted animate-pulse" />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg border p-3 space-y-2">
              <div className="h-3 w-20 rounded bg-muted animate-pulse" />
              <div className="h-3 w-full rounded bg-muted animate-pulse" />
              <div className="h-3 w-10/12 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>
        <div className="rounded-lg border p-4 space-y-2">
          <div className="h-3 w-40 rounded bg-muted animate-pulse" />
          <div className="h-3 w-full rounded bg-muted animate-pulse" />
          <div className="h-3 w-3/4 rounded bg-muted animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}
