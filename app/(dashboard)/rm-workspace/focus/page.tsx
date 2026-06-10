"use client"

import type React from "react"
import { useMemo } from "react"
import { useRole } from "@/lib/role-context"
import { useMarket } from "@/lib/market-context"
import {
  useFocus,
  FOCUS_PRIORITY_META,
  FOCUS_TONE_META,
  type FocusPriority,
  type FocusTone,
} from "@/lib/rm/focus"
import { useRmPortfolio, focusScore, CATEGORY_META } from "@/lib/rm/use-portfolio"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Shield, Check, Sparkles, Target, Briefcase, Gem, ShieldAlert, MoonStar } from "lucide-react"

const PRIORITY_ICON: Record<FocusPriority, React.ElementType> = {
  balanced: Target,
  sme: Briefcase,
  hnw: Gem,
  churn: ShieldAlert,
  dormant: MoonStar,
}

const PRIORITY_ORDER: FocusPriority[] = ["balanced", "sme", "hnw", "churn", "dormant"]
const TONE_ORDER: FocusTone[] = ["concise", "consultative", "data_heavy"]

export default function RMFocusPage() {
  const { currentRole, currentBankingUserId } = useRole()
  const { market } = useMarket()
  const [focus, setFocus] = useFocus()
  const { clients } = useRmPortfolio(currentBankingUserId, market)

  const preview = useMemo(
    () => [...clients].sort((a, b) => focusScore(b, focus) - focusScore(a, focus)).slice(0, 3),
    [clients, focus],
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
      <PageHeader
        title="Focus"
        description="Tell the assistant what to prioritise. These settings steer the Today queue, the Retention radar, and how outreach is drafted."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Weekly priority */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-primary" /> This week's priority
              </CardTitle>
              <CardDescription>What the AI weights most heavily when ranking your book.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PRIORITY_ORDER.map((key) => {
                const meta = FOCUS_PRIORITY_META[key]
                const Icon = PRIORITY_ICON[key]
                const active = focus.priority === key
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFocus({ priority: key })}
                    className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                      active ? "border-primary bg-primary/5 ring-1 ring-primary/30" : "hover:bg-muted/40"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                        active ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-medium">{meta.label}</p>
                        {active && <Check className="h-3.5 w-3.5 text-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{meta.blurb}</p>
                    </div>
                  </button>
                )
              })}
            </CardContent>
          </Card>

          {/* Sensitivity + tone + auto-draft */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Assistant settings</CardTitle>
              <CardDescription>Fine-tune how the assistant flags risk and writes for you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label>Risk sensitivity</Label>
                  <span className="text-xs font-medium text-muted-foreground">
                    {focus.riskSensitivity < 34 ? "Relaxed" : focus.riskSensitivity < 67 ? "Balanced" : "Aggressive"} ·{" "}
                    {focus.riskSensitivity}
                  </span>
                </div>
                <Slider
                  value={[focus.riskSensitivity]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(v) => setFocus({ riskSensitivity: v[0] })}
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Higher sensitivity pushes lower-signal clients onto the radar earlier.
                </p>
              </div>

              <div>
                <Label className="mb-2 block">Outreach tone</Label>
                <div className="flex flex-wrap gap-2">
                  {TONE_ORDER.map((t) => {
                    const active = focus.tone === t
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFocus({ tone: t })}
                        title={FOCUS_TONE_META[t].blurb}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                          active ? "border-primary bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50"
                        }`}
                      >
                        {FOCUS_TONE_META[t].label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <Label htmlFor="autodraft" className="text-sm">
                    Auto-draft morning outreach
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Pre-write an outreach message for the day's #1 priority client.
                  </p>
                </div>
                <Switch
                  id="autodraft"
                  checked={focus.autoDraft}
                  onCheckedChange={(v) => setFocus({ autoDraft: v })}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live preview */}
        <Card className="h-fit lg:sticky lg:top-6">
          <CardHeader>
            <CardTitle className="text-base">With this focus, you'd see first…</CardTitle>
            <CardDescription>{FOCUS_PRIORITY_META[focus.priority].banner}.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {preview.length === 0 && <p className="text-sm text-muted-foreground">No clients loaded yet.</p>}
            {preview.map((c, i) => (
              <div key={c.id} className="flex items-center gap-3 rounded-lg border p-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {CATEGORY_META[c.category].label}
                    {c.churnScore >= 40 ? ` · churn ${c.churnScore}` : ""}
                  </p>
                </div>
              </div>
            ))}
            <p className="pt-1 text-[11px] text-muted-foreground">
              Updates live as you change the settings — the same ranking drives the Today queue.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
