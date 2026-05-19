import { GoogleGenerativeAI } from "@google/generative-ai"
import { createDataStreamResponse } from "ai"
import { formatDataStreamPart } from "@ai-sdk/ui-utils"
import { iterateGeminiTextDeltas } from "@/lib/gemini-stream-response"
import { createDirectClient } from "@/lib/supabase/direct-client"
import { normalizeChatMessageDisplayText } from "@/lib/chat-message-format"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const CHAT_STREAM_HEADERS = {
  "Cache-Control": "no-store, no-transform",
  "X-Accel-Buffering": "no",
} as const

async function fetchBanking(table: string, clientId: string, column = "customer_id") {
  const supabase = createDirectClient()
  try {
    const { data, error } = await supabase.from(table).select("*").eq(column, clientId)
    if (error) {
      console.error(`[RM Chat] Error fetching ${table}:`, error.message)
      return []
    }
    return data ?? []
  } catch (err) {
    console.error(`[RM Chat] Exception fetching ${table}:`, err)
    return []
  }
}

async function fetchCallCenterData(clientId: string) {
  try {
    const { createCallCenterClient } = await import("@/lib/supabase/call-center-client")
    const cc = createCallCenterClient()

    const { data: conversations, error: convErr } = await cc
      .from("conversations")
      .select("*")
      .eq("customer_id", clientId)
      .order("updated_at", { ascending: false })
      .limit(10)

    if (convErr || !conversations?.length) {
      if (convErr) console.error("[RM Chat] Call center conversations error:", convErr.message)
      return []
    }

    const convIds = conversations.map((c: any) => c.id)
    const { data: messages } = await cc
      .from("messages")
      .select("id, conversation_id, sender_type, content, created_at")
      .in("conversation_id", convIds)
      .order("created_at", { ascending: true })

    return conversations.map((conv: any) => ({
      ...conv,
      messages: (messages ?? []).filter((m: any) => m.conversation_id === conv.id),
    }))
  } catch (err) {
    console.error("[RM Chat] Call center fetch failed (proceeding without):", err)
    return []
  }
}

export async function POST(req: Request) {
  try {
    const { messages, userId, currentPage } = await req.json()

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new Response("Missing GOOGLE_GENERATIVE_AI_API_KEY", { status: 500 })
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" })

    // 1. Profile
    const supabase = createDirectClient()
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single()

    if (profileErr || !profile) {
      return new Response(`Client not found: ${userId}`, { status: 404 })
    }

    // 2. Banking data
    const accounts = await fetchBanking("accounts", userId)
    const accountIds = accounts.map((a: any) => a.id)

    const [cards, loans] = await Promise.all([
      fetchBanking("cards", userId),
      fetchBanking("loans", userId),
    ])

    // 3. Transactions via account IDs
    let transactions: any[] = []
    if (accountIds.length > 0) {
      const { data: txData } = await supabase
        .from("transactions")
        .select("*")
        .in("account_id", accountIds)
        .order("date", { ascending: false })
        .limit(30)
      transactions = txData ?? []
    }

    // 4. Support tickets with full message threads
    const tickets = await fetchBanking("support_tickets", userId, "user_id")
    const ticketIds = tickets.map((t: any) => t.id)
    let ticketMessages: any[] = []
    if (ticketIds.length > 0) {
      const { data: msgData } = await supabase
        .from("support_messages")
        .select("id, ticket_id, sender_type, content, created_at")
        .in("ticket_id", ticketIds)
        .order("created_at", { ascending: true })
      ticketMessages = msgData ?? []
    }
    const ticketsWithThreads = tickets.map((t: any) => ({
      id: t.id,
      subject: t.subject,
      status: t.status,
      priority: t.priority,
      created_at: t.created_at,
      messages: ticketMessages.filter((m: any) => m.ticket_id === t.id),
    }))

    // 5. Call center conversations (capped at 10, with messages)
    const conversationsWithMessages = await fetchCallCenterData(userId)

    // 6. Product catalog
    const { data: products } = await supabase.from("products").select("name, description")
    const productCatalog = products ?? []

    // 7. Build RM system prompt
    const toNumber = (v: any) => { const n = Number(v); return Number.isFinite(n) ? n : 0 }
    const totalBalance = accounts.reduce((s: number, a: any) => {
      const rate = a.currency === "USD" ? 3.67 : 1
      return s + toNumber(a.balance) * rate
    }, 0)
    const totalLiabilities = loans.reduce((s: number, l: any) => s + toNumber(l.remaining_balance), 0)

    const systemPrompt = `You are an intelligent advisor assisting a Relationship Manager (RM) at AIdeology Bank. You help the RM prepare for client meetings, identify opportunities, and make data-driven recommendations.

You are NOT a customer-facing chatbot. You speak to the RM as a knowledgeable colleague — professional, analytical, and action-oriented. Reference specific data points, numbers, and product names.

CLIENT PROFILE:
- Name: ${profile.full_name}
- Email: ${profile.email}
- Segment: ${profile.segment}
- KYC Status: ${profile.kyc_status}
- Client Since: ${profile.created_at ? new Date(profile.created_at).toLocaleDateString() : "Unknown"}

FINANCIAL SUMMARY:
- Total Balance: KES ${totalBalance.toLocaleString("en", { minimumFractionDigits: 2 })}
- Total Liabilities: KES ${totalLiabilities.toLocaleString("en", { minimumFractionDigits: 2 })}
- Accounts: ${accounts.length}
- Cards: ${cards.length}
- Active Loans: ${loans.length}

ACCOUNTS:
${JSON.stringify(accounts.map((a: any) => ({ name: a.name, type: a.type, balance: a.balance, currency: a.currency, status: a.status })))}

CARDS:
${JSON.stringify(cards.map((c: any) => ({ type: c.type, last_four: c.last_four, status: c.status, credit_limit: c.credit_limit, spent_amount: c.spent_amount })))}

LOANS:
${JSON.stringify(loans.map((l: any) => ({ type: l.type, principal_amount: l.principal_amount, remaining_balance: l.remaining_balance, interest_rate: l.interest_rate, monthly_payment: l.monthly_payment, status: l.status, next_payment_date: l.next_payment_date })))}

RECENT TRANSACTIONS (last 30):
${JSON.stringify(transactions.map((tx: any) => ({ date: tx.date, description: tx.description, amount: tx.amount, type: tx.type, category: tx.category })))}


SUPPORT TICKETS (with full message threads):
${JSON.stringify(ticketsWithThreads.map((t: any) => ({
  subject: t.subject, status: t.status, priority: t.priority,
  messages: t.messages.map((m: any) => ({ sender: m.sender_type, content: m.content, date: m.created_at }))
})))}

CONTACT CENTER CONVERSATIONS (recent, with messages):
${JSON.stringify(conversationsWithMessages.map((c: any) => ({
  subject: c.subject, channel: c.channel, status: c.status, sentiment: c.sentiment,
  messages: (c.messages ?? []).map((m: any) => ({ sender: m.sender_type, content: m.content, date: m.created_at }))
})))}

PRODUCT CATALOG (available for recommendations):
${JSON.stringify(productCatalog)}

GUIDELINES:
- Answer based ONLY on the provided data. Do not fabricate information.
- When recommending products, cite specific product names, rates, and eligibility from the catalog.
- When discussing client history, reference specific conversations, ticket subjects, and message content.
- Format currency as KES (e.g., KES 1,250.00).
- Use **bold** for emphasis. Use numbered lists for action items.
- Be concise and actionable. The RM is busy.
- Current Date: ${new Date().toISOString().split("T")[0]}
- If asked about something outside banking scope, politely redirect to financial topics.`

    // 8. Stream via Gemini
    const geminiMessages = [
      {
        role: "user",
        parts: [{ text: `${systemPrompt}\n\nPlease acknowledge you understand this context and are ready to assist.` }],
      },
      {
        role: "model",
        parts: [{ text: `I have the full picture on ${profile.full_name} — financials, support history, and product catalog. How can I help you prepare?` }],
      },
      ...messages.slice(-10).map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
    ]

    const chat = model.startChat({ history: geminiMessages.slice(0, -1) })
    const lastMessage = messages[messages.length - 1]?.content || ""
    const streamResult = await chat.sendMessageStream(lastMessage)

    return createDataStreamResponse({
      headers: CHAT_STREAM_HEADERS,
      async execute(writer) {
        for await (const delta of iterateGeminiTextDeltas(streamResult)) {
          writer.write(formatDataStreamPart("text", delta))
        }
        writer.write(formatDataStreamPart("finish_message", { finishReason: "stop" }))
      },
    })
  } catch (error: any) {
    console.error("[RM Chat] Error:", error)
    return new Response(error.message || "Internal Server Error", { status: 500 })
  }
}
