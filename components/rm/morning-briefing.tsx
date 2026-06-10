"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useMarket, useFormatCurrency } from "@/lib/market-context"
import type { EnrichedClient } from "@/lib/rm/use-portfolio"
import type { FocusSettings } from "@/lib/rm/focus"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, RefreshCw, X } from "lucide-react"

function shortAction(c: EnrichedClient): string {
  if (c.churnScore >= 60) return "make an urgent retention call"
  if (c.category === "SME") return "offer a working-capital facility"
  if (c.category === "HNW") return "book a wealth review on the idle cash"
  if (c.openTickets > 0) return "follow up on their open request"
  return "do a proactive check-in"
}

export function MorningBriefing({
  clients,
  focus,
  focusLabel,
}: {
  clients: EnrichedClient[]
  focus: FocusSettings
  focusLabel: string
}) {
  const { market } = useMarket()
  const fmt = useFormatCurrency()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const [streaming, setStreaming] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const autoStartedRef = useRef(false)
  const prevPriorityRef = useRef(focus.priority)

  const fallbackText = useCallback(() => {
    const top = clients.slice(0, 3)
    let s = `Good morning. This week's focus is ${focusLabel}. Here are your top ${top.length} for today. `
    top.forEach((c, i) => {
      const risk = c.churnScore >= 40 ? ` They're a flight risk — about ${fmt(c.aumAtRiskValue)} at stake.` : ""
      s += `Number ${i + 1}, ${c.name}, a ${c.category} client. ${c.topConcern ?? "Proactive relationship check-in."}${risk} Best move: ${shortAction(c)}. `
    })
    s += "Start with number one."
    return s
  }, [clients, focusLabel, fmt])

  const generate = useCallback(async () => {
    setOpen(true)
    setStreaming(true)
    setText("")
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    const payload = {
      market,
      focusLabel,
      focus: {
        priority: focus.priority,
        riskSensitivity: focus.riskSensitivity,
        tone: focus.tone,
        autoDraft: focus.autoDraft,
      },
      clients: clients.slice(0, 4).map((c) => ({
        name: c.name,
        category: c.category,
        churnScore: c.churnScore,
        topConcern: c.topConcern,
        action: shortAction(c),
        opportunityValue: c.opportunityValue,
        aumAtRiskValue: c.aumAtRiskValue,
      })),
    }

    try {
      const res = await fetch("/api/rm-standup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      if (!res.ok || !res.body) throw new Error(`Standup API ${res.status}`)
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ""
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setText(acc)
      }
      setStreaming(false)
    } catch (err: any) {
      if (err?.name === "AbortError") return
      // graceful fallback — never leave the RM with a blank briefing
      setText(fallbackText())
      setStreaming(false)
    }
  }, [market, focusLabel, focus, clients, fallbackText])

  // Auto-generate the briefing as soon as the portfolio is loaded — the RM
  // shouldn't have to click — and re-generate whenever the focus PRIORITY
  // changes, so the spoken narrative always matches the re-ranked cards.
  // (Keyed on priority only, not every slider tick, to avoid over-billing.)
  useEffect(() => {
    if (clients.length === 0) return
    if (autoStartedRef.current && prevPriorityRef.current === focus.priority) return
    autoStartedRef.current = true
    prevPriorityRef.current = focus.priority
    generate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clients, focus.priority])

  // NOTE: we deliberately do NOT abort the in-flight request on unmount.
  // React StrictMode (dev) mounts → unmounts → remounts, and an unmount-abort
  // here would cancel the auto-started briefing while the remount's effect
  // skips re-firing (autoStartedRef already true) — leaving it stuck on
  // "Preparing…". Overlapping streams are already prevented by the per-call
  // abort at the top of generate(); a request finishing after navigation just
  // resolves into ignored state updates.

  if (!open) {
    return (
      <Button onClick={generate} className="gap-2" disabled={clients.length === 0}>
        <Sparkles className="h-4 w-4" /> Brief me on today
      </Button>
    )
  }

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card">
      <CardContent className="space-y-3 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-primary">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold">Your morning briefing</span>
            {streaming && (
              <Badge variant="outline" className="gap-1 text-[10px]">
                <Loader2 className="h-2.5 w-2.5 animate-spin" /> Preparing…
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {!streaming && (
              <Button variant="ghost" size="icon-sm" onClick={generate} title="Regenerate">
                <RefreshCw className="h-3.5 w-3.5" />
              </Button>
            )}
            <Button variant="ghost" size="icon-sm" onClick={() => setOpen(false)} title="Dismiss">
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-relaxed">
          {text}
          {streaming && <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-primary/60 align-middle" />}
        </p>
      </CardContent>
    </Card>
  )
}
