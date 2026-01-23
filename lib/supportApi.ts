import type { DbConversation, DbMessage } from "./types";

const SUPPORT_API_BASE_URL = process.env.NEXT_PUBLIC_SUPPORT_API_BASE_URL;

if (!SUPPORT_API_BASE_URL) {
  console.warn("[Support API] NEXT_PUBLIC_SUPPORT_API_BASE_URL is not set");
}

export async function createConversation(args: {
  customer_id: string;
  subject?: string;
  priority?: string;
  channel?: string;
}): Promise<DbConversation> {
  const endpoint = "POST /conversations";
  console.log(`[Support API] Calling: ${endpoint}`);
  console.log(`[Support API] Request data:`, {
    customer_id: args.customer_id,
    subject: args.subject,
    channel: args.channel ?? "app",
    priority: args.priority ?? "medium",
  });

  if (!SUPPORT_API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_SUPPORT_API_BASE_URL is not configured");
  }

  const response = await fetch(`${SUPPORT_API_BASE_URL}/conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer_id: args.customer_id,
      subject: args.subject ?? null,
      channel: args.channel ?? "app",
      priority: args.priority ?? "medium",
      status: "open",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[Support API] ${endpoint} - Error:`, {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    });
    throw new Error(`Failed to create conversation: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(`[Support API] ${endpoint} - Success:`, {
    status: "200 OK",
    conversation_id: data?.id,
  });

  return data as DbConversation;
}

export async function fetchMessages(conversationId: string): Promise<DbMessage[]> {
  const endpoint = `GET /conversations/${conversationId}/messages`;
  console.log(`[Support API] Calling: ${endpoint}`);
  console.log(`[Support API] Request params:`, { conversationId });

  if (!SUPPORT_API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_SUPPORT_API_BASE_URL is not configured");
  }

  const response = await fetch(`${SUPPORT_API_BASE_URL}/conversations/${conversationId}/messages`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[Support API] ${endpoint} - Error:`, {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    });
    throw new Error(`Failed to fetch messages: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(`[Support API] ${endpoint} - Success:`, {
    status: "200 OK",
    message_count: Array.isArray(data) ? data.length : 0,
  });

  return (Array.isArray(data) ? data : []) as DbMessage[];
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
  const endpoint = "POST /messages";
  console.log(`[Support API] Calling: ${endpoint}`);
  console.log(`[Support API] Request data:`, {
    conversation_id: args.conversation_id,
    sender_customer_id: args.sender_customer_id,
    content_length: args.content.length,
    content_preview: args.content.substring(0, 100) + (args.content.length > 100 ? "..." : ""),
  });

  if (!SUPPORT_API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_SUPPORT_API_BASE_URL is not configured");
  }

  const response = await fetch(`${SUPPORT_API_BASE_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversation_id: args.conversation_id,
      sender_type: "customer",
      sender_customer_id: args.sender_customer_id,
      sender_agent_id: null,
      content: args.content,
      is_internal: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[Support API] ${endpoint} - Error:`, {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    });
    throw new Error(`Failed to send message: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(`[Support API] ${endpoint} - Success:`, {
    status: "200 OK",
    message_id: data?.customer_message_id,
    response_status: data?.status || "ai",
  });

  return {
    status: data.status || "ai",
    customer_message_id: data.customer_message_id,
    ai_reply: data.ai_reply || null,
    ai_message_id: data.ai_message_id || null,
  };
}

export async function sendAgentMessage(args: {
  conversation_id: string;
  sender_agent_id: string;
  content: string;
  is_internal?: boolean;
}): Promise<DbMessage> {
  const endpoint = "POST /messages (agent)";
  console.log(`[Support API] Calling: ${endpoint}`);
  console.log(`[Support API] Request data:`, {
    conversation_id: args.conversation_id,
    sender_agent_id: args.sender_agent_id,
    is_internal: !!args.is_internal,
    content_length: args.content.length,
  });

  if (!SUPPORT_API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_SUPPORT_API_BASE_URL is not configured");
  }

  const response = await fetch(`${SUPPORT_API_BASE_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversation_id: args.conversation_id,
      sender_type: "agent",
      sender_customer_id: null,
      sender_agent_id: args.sender_agent_id,
      content: args.content,
      is_internal: !!args.is_internal,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[Support API] ${endpoint} - Error:`, {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    });
    throw new Error(`Failed to send agent message: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(`[Support API] ${endpoint} - Success:`, {
    status: "200 OK",
    message_id: data?.id,
  });

  return data as DbMessage;
}
