"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { createCallCenterClient } from "@/lib/supabase/call-center-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Headphones, Loader2, MessageSquare, User } from "lucide-react"

type SupportItem =
  | {
      kind: "conversation"
      id: string
      subject: string
      status: string
      channel?: string | null
      source?: string | null
      updatedAt: string
    }
  | {
      kind: "ticket"
      id: string
      subject: string
      status: string
      priority: string
      updatedAt: string
    }

type ThreadMessage = {
  id: string
  sender_type: string
  content: string
  created_at: string
}

function isCustomerMessage(senderType: string) {
  return senderType === "customer" || senderType === "user"
}

export function ClientSupportSection({
  clientId,
  clientName,
}: {
  clientId: string
  clientName: string
}) {
  const [items, setItems] = useState<SupportItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<SupportItem | null>(null)
  const [threadMessages, setThreadMessages] = useState<ThreadMessage[]>([])
  const [threadLoading, setThreadLoading] = useState(false)

  const loadItems = useCallback(async () => {
    setLoading(true)
    try {
      const cc = createCallCenterClient()
      const { data: conversations } = await cc
        .from("conversations")
        .select("*")
        .eq("customer_id", clientId)
        .order("updated_at", { ascending: false })

      const supabase = createClient()
      const { data: tickets } = await supabase
        .from("support_tickets")
        .select("id, subject, status, priority, updated_at")
        .eq("user_id", clientId)
        .order("updated_at", { ascending: false })

      const merged: SupportItem[] = [
        ...(conversations ?? []).map((c) => ({
          kind: "conversation" as const,
          id: c.id,
          subject: c.subject || "Untitled conversation",
          status: c.status,
          channel: c.channel,
          source: c.source,
          updatedAt: c.updated_at || c.created_at,
        })),
        ...(tickets ?? []).map((t) => ({
          kind: "ticket" as const,
          id: t.id,
          subject: t.subject,
          status: t.status,
          priority: t.priority,
          updatedAt: t.updated_at,
        })),
      ]

      merged.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      setItems(merged)
    } finally {
      setLoading(false)
    }
  }, [clientId])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  const loadThread = useCallback(
    async (item: SupportItem) => {
      setThreadLoading(true)
      setThreadMessages([])
      try {
        if (item.kind === "conversation") {
          const cc = createCallCenterClient()
          const { data, error } = await cc
            .from("messages")
            .select("id, sender_type, content, created_at")
            .eq("conversation_id", item.id)
            .order("created_at", { ascending: true })

          if (error) throw error
          setThreadMessages((data ?? []) as ThreadMessage[])
        } else {
          const supabase = createClient()
          const { data, error } = await supabase
            .from("support_messages")
            .select("id, sender_type, content, created_at")
            .eq("ticket_id", item.id)
            .order("created_at", { ascending: true })

          if (error) throw error
          setThreadMessages((data ?? []) as ThreadMessage[])
        }
      } catch (e) {
        console.error("[ClientSupportSection] thread load error", e)
      } finally {
        setThreadLoading(false)
      }
    },
    [],
  )

  const openItem = (item: SupportItem) => {
    setSelected(item)
    loadThread(item)
  }

  const sheetTitle = useMemo(() => {
    if (!selected) return "Support"
    return selected.subject
  }, [selected])

  return (
    <>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquare className="h-4 w-4 text-primary" />
            Support ({items.length})
          </CardTitle>
          <CardDescription>
            Tickets and conversations for {clientName}. Click a row to view message history.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No support history found</p>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <button
                  key={`${item.kind}-${item.id}`}
                  type="button"
                  onClick={() => openItem(item)}
                  className="w-full text-left rounded-lg border p-3 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-medium truncate">{item.subject}</p>
                    <div className="flex items-center gap-1 shrink-0">
                      <Badge variant="outline" className="text-[10px]">
                        {item.kind === "conversation" ? "Chat" : "Ticket"}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {item.kind === "conversation" && item.channel && <span>{item.channel}</span>}
                    {item.kind === "ticket" && <span>{item.priority} priority</span>}
                    <span>· {new Date(item.updatedAt).toLocaleString()}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-lg flex flex-col">
          <SheetHeader>
            <SheetTitle className="pr-8">{sheetTitle}</SheetTitle>
            <SheetDescription>
              {selected?.kind === "conversation" ? "Contact center thread" : "Support ticket thread"}
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="flex-1 mt-4 pr-4">
            {threadLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : threadMessages.length === 0 ? (
              <p className="text-sm text-muted-foreground">No messages in this thread.</p>
            ) : (
              <div className="space-y-4 pb-6">
                {threadMessages.map((m) => {
                  const isUser = isCustomerMessage(m.sender_type)
                  return (
                    <div
                      key={m.id}
                      className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      {!isUser && (
                        <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <Headphones className="h-3.5 w-3.5" />
                        </div>
                      )}
                      <div className={`max-w-[85%] ${isUser ? "items-end" : "items-start"}`}>
                        <div
                          className={`rounded-2xl px-3 py-2 text-sm ${
                            isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {m.content}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1 px-1">
                          {new Date(m.created_at).toLocaleString()}
                        </p>
                      </div>
                      {isUser && (
                        <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <User className="h-3.5 w-3.5" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </ScrollArea>

          <div className="pt-3 border-t">
            <Button variant="outline" className="w-full" onClick={() => setSelected(null)}>
              Close
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
