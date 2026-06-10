"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Mail, MessageCircle, MessageSquare, Send, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMarket } from "@/lib/market-context"
import { useFocus, FOCUS_PRIORITY_META } from "@/lib/rm/focus"

type Channel = "email" | "sms" | "whatsapp"
type Tone = "warm" | "direct" | "formal"

const CHANNEL_ICONS: Record<Channel, React.ReactNode> = {
  email: <Mail className="h-3.5 w-3.5" />,
  sms: <MessageSquare className="h-3.5 w-3.5" />,
  whatsapp: <MessageCircle className="h-3.5 w-3.5" />,
}

const CHANNEL_LABELS: Record<Channel, string> = {
  email: "Email",
  sms: "SMS",
  whatsapp: "WhatsApp",
}

const TONES: { id: Tone; label: string }[] = [
  { id: "warm", label: "Warm" },
  { id: "direct", label: "Direct" },
  { id: "formal", label: "Formal" },
]

interface OutreachDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clientId: string
  clientName: string
  opportunity: string
}

export function OutreachDialog({
  open,
  onOpenChange,
  clientId,
  clientName,
  opportunity,
}: OutreachDialogProps) {
  const { market } = useMarket()
  const [focus] = useFocus()
  const [channel, setChannel] = useState<Channel>("email")
  const [tone, setTone] = useState<Tone>("warm")
  const [draft, setDraft] = useState("")
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const dirtyRef = useRef(false)

  const generate = useCallback(async () => {
    setStreaming(true)
    setError(null)
    setDraft("")
    dirtyRef.current = false

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch("/api/rm-draft-outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          opportunity,
          channel,
          tone,
          market,
          focus: {
            priority: focus.priority,
            riskSensitivity: focus.riskSensitivity,
            tone: focus.tone,
            autoDraft: focus.autoDraft,
            label: FOCUS_PRIORITY_META[focus.priority].label,
          },
        }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        throw new Error(`Draft API returned ${res.status}`)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setDraft((prev) => prev + chunk)
      }
    } catch (err: any) {
      if (err?.name === "AbortError") return
      console.warn("[OutreachDialog] draft error:", err?.message ?? err)
      setError("Couldn't generate the draft. You can write one manually below.")
    } finally {
      setStreaming(false)
    }
  }, [clientId, opportunity, channel, tone, market, focus])

  useEffect(() => {
    if (open) {
      generate()
    } else {
      abortRef.current?.abort()
    }
    return () => abortRef.current?.abort()
  }, [open, generate])

  const handleSend = () => {
    onOpenChange(false)
    toast.success(`Sent to ${clientName} via ${CHANNEL_LABELS[channel]}`, {
      description: "Demo mode — message logged but not actually delivered.",
      duration: 4000,
    })
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Draft outreach to {clientName}
          </DialogTitle>
          <DialogDescription>
            AI generates a personalised message based on the briefing's opportunity. Edit before sending.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-md border bg-muted/30 p-3 text-xs">
            <div className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-1">
              Opportunity
            </div>
            <p className="leading-relaxed">{opportunity}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px]">
              <div className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-1.5">
                Channel
              </div>
              <Tabs value={channel} onValueChange={(v) => setChannel(v as Channel)}>
                <TabsList className="grid w-full grid-cols-3">
                  {(Object.keys(CHANNEL_LABELS) as Channel[]).map((c) => (
                    <TabsTrigger key={c} value={c} className="text-xs gap-1.5">
                      {CHANNEL_ICONS[c]}
                      {CHANNEL_LABELS[c]}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-1.5">
                Tone
              </div>
              <div className="flex gap-1">
                {TONES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTone(t.id)}
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs border transition-colors",
                      tone === t.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background hover:bg-accent border-input",
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <Textarea
              value={draft}
              onChange={(e) => {
                dirtyRef.current = true
                setDraft(e.target.value)
              }}
              placeholder={streaming ? "AI is drafting…" : "Your message will appear here."}
              className="min-h-[260px] font-mono text-sm leading-relaxed"
              disabled={streaming && !dirtyRef.current}
            />
            {streaming && (
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="gap-1 text-[10px]">
                  <Loader2 className="h-2.5 w-2.5 animate-spin" />
                  Streaming
                </Badge>
              </div>
            )}
          </div>

          {error && (
            <p className="text-xs text-amber-700 dark:text-amber-300">{error}</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={streaming || !draft.trim()}>
            <Send className="h-3.5 w-3.5 mr-1.5" />
            Send via {CHANNEL_LABELS[channel]}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
