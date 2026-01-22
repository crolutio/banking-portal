"use client";


import { useEffect, useRef, useState } from "react";
import type { DbMessage } from "../types";
import { sendCustomerMessage } from "@/lib/supportApi";
import { createCallCenterClient } from "../supabase/call-center-client";
import { subscribeToConversationMessages } from "../realtime";

export function useConversationMessages(params: {
  conversationId: string | null;
  customerId: string; // provided by app context
}) {
  const { conversationId, customerId } = params;

  const [messages, setMessages] = useState<DbMessage[]>([]);
  const [waitingForReply, setWaitingForReply] = useState(false);
  const seenIdsRef = useRef<Set<string>>(new Set());
  const lastAiMessageIdRef = useRef<string | null>(null);

  // Load history
  useEffect(() => {
    let cancelled = false;

    async function load() {
      // #region agent log
      if (typeof window !== "undefined") {
        fetch("http://127.0.0.1:7243/ingest/416c505f-0f39-4083-9a11-a59f7ac8dac3", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: "useConversationMessages.ts:21",
            message: "load() start",
            data: { conversationId, customerId, hasConversationId: !!conversationId },
            timestamp: Date.now(),
            sessionId: "debug-session",
            runId: "run7",
            hypothesisId: "F",
          }),
        }).catch(() => {});
      }
      // #endregion
      if (!conversationId) {
        setMessages([]);
        seenIdsRef.current = new Set();
        return;
      }
      let history: DbMessage[] = [];
      try {
        // #region agent log
        if (typeof window !== "undefined") {
          fetch("http://127.0.0.1:7243/ingest/416c505f-0f39-4083-9a11-a59f7ac8dac3", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              location: "useConversationMessages.ts:31",
              message: "before messages query",
              data: { conversationId, table: "messages" },
              timestamp: Date.now(),
              sessionId: "debug-session",
              runId: "run7",
              hypothesisId: "F",
            }),
          }).catch(() => {});
        }
        // #endregion
        const supabase = createCallCenterClient();
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .eq("conversation_id", conversationId)
          .eq("is_internal", false)
          .order("created_at", { ascending: true });

        if (error) {
          throw error;
        }
      history = (data ?? []) as DbMessage[];
      } catch (err) {
        // #region agent log
        if (typeof window !== "undefined") {
          fetch("http://127.0.0.1:7243/ingest/416c505f-0f39-4083-9a11-a59f7ac8dac3", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              location: "useConversationMessages.ts:44",
              message: "messages query error",
              data: { conversationId, error: err?.toString() },
              timestamp: Date.now(),
              sessionId: "debug-session",
              runId: "run7",
              hypothesisId: "F",
            }),
          }).catch(() => {});
        }
        // #endregion
        throw err;
      }
      if (cancelled) return;

      const filteredHistory = history.filter((m) => !m.is_internal);
      const seen = new Set<string>();
      for (const m of filteredHistory) seen.add(m.id);
      seenIdsRef.current = seen;

      // #region agent log
      if (typeof window !== "undefined") {
        fetch("http://127.0.0.1:7243/ingest/416c505f-0f39-4083-9a11-a59f7ac8dac3", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: "useConversationMessages.ts:58",
            message: "history loaded",
            data: { conversationId, count: filteredHistory.length, ids: filteredHistory.map((m) => m.id) },
            timestamp: Date.now(),
            sessionId: "debug-session",
            runId: "run7",
            hypothesisId: "F",
          }),
        }).catch(() => {});
      }
      // #endregion
      setMessages(filteredHistory);
    }

    load().catch((e) => console.error("[useConversationMessages] load error", e));

    return () => {
      cancelled = true;
    };
  }, [conversationId]);

  // Subscribe realtime
  useEffect(() => {
    if (!conversationId) return;

    const unsubscribe = subscribeToConversationMessages(conversationId, (msg: DbMessage) => {
      if (msg.is_internal) return;
      // Filter out customer messages - we render them optimistically, so we don't need realtime updates
      if (msg.sender_type === "customer") return;
      if (lastAiMessageIdRef.current && msg.id === lastAiMessageIdRef.current) return;
      const seen = seenIdsRef.current;
      if (seen.has(msg.id)) return;
      seen.add(msg.id);
      setMessages((prev) => [...prev, msg]);
      
      // Always stop waiting when we receive an agent message via realtime
      // (Agent messages are the only ones that pass the filters above)
      setWaitingForReply(false);
    });

    return unsubscribe;
  }, [conversationId]);

  // Option A send: insert via API, append immediately, dedupe echo
  async function send(content: string) {
    if (!conversationId) return;
    const trimmed = content.trim();
    if (!trimmed) return;

    // Generate temporary ID for optimistic message
    const tempId = `temp-${Date.now()}-${Math.random()}`;
    const seen = seenIdsRef.current;
    
    // Add temp ID to seenIdsRef to prevent duplicates
    seen.add(tempId);
    
    // Create and append optimistic customer message immediately
    const optimisticMessage: DbMessage = {
      id: tempId,
      conversation_id: conversationId,
      sender_type: "customer",
      sender_customer_id: customerId,
      sender_agent_id: null,
      content: trimmed,
      is_internal: false,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticMessage]);
    
    // Set waiting for reply
    setWaitingForReply(true);

    try {
      const response = await sendCustomerMessage({
        conversation_id: conversationId,
        sender_customer_id: customerId,
        content: trimmed,
      });

      // Replace optimistic message with real one
      seen.add(response.customer_message_id);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId
            ? {
                ...msg,
                id: response.customer_message_id,
              }
            : msg
        )
      );

      if (response.ai_message_id) {
        lastAiMessageIdRef.current = response.ai_message_id;
      }

      // Handle AI reply if available
      if (response.status === "ai" && response.ai_reply && response.ai_message_id && !seen.has(response.ai_message_id)) {
        const aiMessage: DbMessage = {
          id: response.ai_message_id,
          conversation_id: conversationId,
          sender_type: "agent",
          sender_customer_id: null,
          sender_agent_id: null,
          content: response.ai_reply,
          is_internal: false,
          created_at: new Date().toISOString(),
        };
        seen.add(response.ai_message_id);
        setMessages((prev) => [...prev, aiMessage]);
        setWaitingForReply(false);
      } else if (response.status !== "ai") {
        // If no AI reply (handoff or human), stop waiting
        setWaitingForReply(false);
      }
      // Note: If status === "ai" but no reply yet, we keep waiting
      // The realtime handler will set waitingForReply(false) when the agent message arrives
    } catch (error) {
      // On error, remove optimistic message and stop waiting
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
      seen.delete(tempId);
      setWaitingForReply(false);
      throw error;
    }
  }

  return { messages, send, waitingForReply };
}
