"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useChat } from "ai/react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ConversationProvider, useConversation } from "@elevenlabs/react"
import { toast } from "sonner"
import { useRole } from "@/lib/role-context"
import { useMarket } from "@/lib/market-context"
import { useFocus, FOCUS_PRIORITY_META } from "@/lib/rm/focus"
import { PageHeader } from "@/components/ui/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send, Loader2, Sparkles, Shield, Square, RotateCcw, Mic, Phone } from "lucide-react"

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID

const SUGGESTIONS = [
  "Who's most likely to leave this week, and what should I do?",
  "Where's my biggest revenue opportunity right now?",
  "Give me a 5-bullet summary of my whole book.",
  "Draft outreach to my idle-cash HNW clients.",
  "Which SME clients need working capital, and how much?",
  "Who is dormant and worth reactivating?",
]

export default function RMAtlasPage() {
  const { currentRole } = useRole()

  if (currentRole !== "relationship_manager") {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Card className="max-w-md">
          <div className="px-6 pb-6 pt-6 text-center">
            <Shield className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-semibold">Access Restricted</h2>
            <p className="text-muted-foreground">Atlas is only available to Relationship Manager users.</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col space-y-4">
      <PageHeader
        title="Atlas"
        description="Your whole-book AI — ask about churn, opportunities, who to call, or draft outreach."
      />
      <ConversationProvider>
        <AtlasWorkspace />
      </ConversationProvider>
    </div>
  )
}

function AtlasWorkspace() {
  const { currentBankingUserId } = useRole()
  const { market } = useMarket()
  const [focus] = useFocus()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [starting, setStarting] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading, append, stop, setMessages } = useChat({
    api: "/api/rm-atlas",
    id: `rm-atlas-${currentBankingUserId ?? "none"}`,
    streamProtocol: "data",
    body: {
      rmId: currentBankingUserId,
      market,
      focus: {
        priority: focus.priority,
        riskSensitivity: focus.riskSensitivity,
        tone: focus.tone,
        autoDraft: focus.autoDraft,
        label: FOCUS_PRIORITY_META[focus.priority].label,
      },
    },
  })

  const conversation = useConversation({
    onError: (message: string) => toast.error("Atlas voice error", { description: message }),
  })
  const voiceStatus = conversation.status
  const voiceActive = starting || voiceStatus === "connecting" || voiceStatus === "connected"

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  const startVoice = useCallback(async () => {
    if (!AGENT_ID) {
      toast.error("Voice not configured", { description: "Set NEXT_PUBLIC_ELEVENLABS_AGENT_ID in your env." })
      return
    }
    setStarting(true)
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      // Public agent + static book in the prompt → no per-call data fetch.
      // Only the current focus is passed live (the RM name is hardcoded "Peter").
      conversation.startSession({
        agentId: AGENT_ID,
        dynamicVariables: {
          focus_label: FOCUS_PRIORITY_META[focus.priority].label,
        },
      })
    } catch (e: any) {
      toast.error("Couldn't start Atlas voice", { description: e?.message ?? String(e) })
    } finally {
      setStarting(false)
    }
  }, [conversation, focus.priority])

  const empty = messages.length === 0

  return (
    <Card className="flex min-h-0 flex-1 flex-col overflow-hidden">
      {voiceActive ? (
        <VoicePanel
          connecting={starting || voiceStatus === "connecting"}
          speaking={conversation.isSpeaking}
          onEnd={() => conversation.endSession()}
        />
      ) : (
        <>
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
            {empty ? (
              <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Bot className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">Atlas — your whole-book analyst</h3>
                  <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                    I can see all your clients at once. Ask me to rank, summarise, find opportunities, or draft outreach.
                    This week's focus is{" "}
                    <span className="font-medium text-foreground">{FOCUS_PRIORITY_META[focus.priority].label}</span>.
                  </p>
                </div>
                <div className="grid w-full max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => append({ role: "user", content: s })}
                      className="group flex items-start gap-2 rounded-lg border p-3 text-left text-sm transition-colors hover:border-primary/40 hover:bg-muted/40"
                    >
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m) => (
                <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "assistant" && (
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Bot className="h-4 w-4" />
                    </span>
                  )}
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[80%] rounded-2xl bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                        : "max-w-[85%] rounded-2xl bg-muted px-4 py-3"
                    }
                  >
                    {m.role === "user" ? (
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    ) : (
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1.5 prose-li:my-0.5 prose-headings:mt-3 prose-headings:mb-1 prose-table:text-xs prose-th:px-3 prose-th:py-1.5 prose-td:px-3 prose-td:py-1.5 prose-th:bg-background/60 prose-table:border prose-th:border prose-td:border">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Bot className="h-4 w-4" />
                </span>
                <Loader2 className="h-4 w-4 animate-spin" /> Reading your book…
              </div>
            )}
          </div>

          <div className="border-t p-3">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={startVoice}
                disabled={starting}
                title="Talk to Atlas"
                className="shrink-0 text-primary hover:text-primary"
              >
                {starting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about your book, or tap the mic to talk…"
                disabled={isLoading}
                className="flex-1"
              />
              {isLoading ? (
                <Button type="button" variant="outline" size="icon" onClick={stop} title="Stop">
                  <Square className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" size="icon" disabled={!input.trim()} title="Send">
                  <Send className="h-4 w-4" />
                </Button>
              )}
              {messages.length > 0 && !isLoading && (
                <Button type="button" variant="ghost" size="icon" onClick={() => setMessages([])} title="New chat">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              )}
            </form>
          </div>
        </>
      )}
    </Card>
  )
}

function VoicePanel({
  connecting,
  speaking,
  onEnd,
}: {
  connecting: boolean
  speaking: boolean
  onEnd: () => void
}) {
  const statusText = connecting ? "Connecting to Atlas…" : speaking ? "Atlas is speaking…" : "Listening…"
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-7 p-6">
      <div className="relative flex h-64 w-64 items-center justify-center">
        <div
          className={`absolute inset-0 rounded-full blur-[2px] animate-[spin_7s_linear_infinite] transition-transform duration-700 ${
            speaking ? "scale-105" : connecting ? "scale-95 opacity-80" : "scale-100"
          }`}
          style={{
            background:
              "conic-gradient(from 90deg, #1e3a8a, #3b82f6, #93c5fd, #a5f3fc, #ffffff, #2563eb, #1e40af, #1e3a8a)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9) 4%, transparent 38%)" }}
        />
        {speaking && <span className="absolute inset-0 rounded-full border border-primary/30 animate-ping" />}
        <button
          type="button"
          onClick={onEnd}
          title="End voice"
          className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
        >
          {connecting ? <Loader2 className="h-6 w-6 animate-spin" /> : <Phone className="h-6 w-6" />}
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm font-medium">{statusText}</p>
        <p className="mt-1 text-xs text-muted-foreground">Tap the button to end · voice by ElevenLabs</p>
      </div>
    </div>
  )
}
