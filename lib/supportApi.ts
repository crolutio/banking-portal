import type { DbConversation, DbMessage } from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_SUPPORT_API_BASE_URL ??
  process.env.NEXT_PUBLIC_SUPABASE_API_BASE_URL ??
  "http://localhost:8000";
const API_BASE_CLEAN = API_BASE.replace(/\/+$/, "");

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  // #region agent log
  if (typeof window !== "undefined") {
    fetch("http://127.0.0.1:7243/ingest/416c505f-0f39-4083-9a11-a59f7ac8dac3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "supportApi.ts:6",
        message: "api() request",
        data: { apiBase: API_BASE, path, method: init?.method ?? "GET" },
        timestamp: Date.now(),
        sessionId: "debug-session",
        runId: "run6",
        hypothesisId: "D",
      }),
    }).catch(() => {});
  }
  // #endregion
  const res = await fetch(`${API_BASE_CLEAN}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    // #region agent log
    if (typeof window !== "undefined") {
      fetch("http://127.0.0.1:7243/ingest/416c505f-0f39-4083-9a11-a59f7ac8dac3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: "supportApi.ts:19",
          message: "api() error",
          data: { apiBase: API_BASE, path, status: res.status, textPreview: text.slice(0, 120) },
          timestamp: Date.now(),
          sessionId: "debug-session",
          runId: "run6",
          hypothesisId: "D",
        }),
      }).catch(() => {});
    }
    // #endregion
    throw new Error(`API ${res.status}: ${text}`);
  }
  return (await res.json()) as T;
}

export async function createConversation(args: {
  customer_id: string;
  subject?: string;
  priority?: string;
  channel?: string;
}): Promise<DbConversation> {
  return api<DbConversation>(`/api/conversations`, {
    method: "POST",
    body: JSON.stringify({
      customer_id: args.customer_id,
      subject: args.subject ?? null,
      channel: args.channel ?? "app",
      priority: args.priority ?? "medium",
    }),
  });
}

export async function fetchMessages(conversationId: string): Promise<DbMessage[]> {
  return api<DbMessage[]>(`/api/conversations/${encodeURIComponent(conversationId)}/messages`);
}

export type CustomerMessageResponse = {
  status: "ai" | "handoff" | "human";
  customer_message_id: string;
  ai_reply: string | null;
  ai_message_id: string | null;
};

export async function sendCustomerMessage(args: {
  conversation_id: string;
  sender_customer_id: string;
  content: string;
}): Promise<CustomerMessageResponse> {
  return api<CustomerMessageResponse>(`/api/messages`, {
    method: "POST",
    body: JSON.stringify({
      conversation_id: args.conversation_id,
      sender_type: "customer",
      sender_customer_id: args.sender_customer_id,
      sender_agent_id: null,
      content: args.content,
      is_internal: false,
    }),
  });
}

export async function sendAgentMessage(args: {
  conversation_id: string;
  sender_agent_id: string;
  content: string;
  is_internal?: boolean;
}): Promise<DbMessage> {
  return api<DbMessage>(`/api/messages`, {
    method: "POST",
    body: JSON.stringify({
      conversation_id: args.conversation_id,
      sender_type: "agent",
      sender_customer_id: null,
      sender_agent_id: args.sender_agent_id,
      content: args.content,
      is_internal: !!args.is_internal,
    }),
  });
}
