/**
 * Core RM-briefing generation pipeline, extracted so multiple routes can
 * reuse it (the per-client briefing endpoint AND the Portfolio Pulse strip,
 * which pre-generates briefings for the top-3 most-urgent clients on the
 * dashboard).
 *
 * Why this exists:
 *   - Pulse needs 1–2 sentence "why look at this client today" blurbs.
 *   - Briefing already produces a `main_concern` field of exactly that shape.
 *   - So instead of running a thin parallel Pulse-specific LLM call (which
 *     was hallucinating because it had fewer signals), we run a real briefing
 *     for each top-3 client and use its `main_concern` as the Pulse blurb.
 *   - As a side-effect, the dashboard can pre-warm the client-side briefing
 *     cache, making the per-client briefing card open instantly when the RM
 *     clicks in.
 */

import { z } from "zod"
import { generateObject } from "ai"
import { claudeQuality } from "@/lib/ai/claude"
import { createDirectClient } from "@/lib/supabase/direct-client"
import { MARKET_CONFIG, type Market } from "@/lib/markets"
import { buildMarketContext } from "@/lib/ai/market-context"
import type { BriefingResponse } from "@/lib/rm/client-briefings"

export const briefingSchema = z.object({
  briefing: z
    .string()
    .describe("2–3 sentence narrative summary of this client's situation right now."),
  main_concern: z
    .string()
    .describe("Single sentence describing the client's top concern or pain point."),
  next_best_action: z
    .string()
    .describe("Single actionable sentence — the concrete next step for the RM."),
  opportunity: z
    .string()
    .describe(
      "Single sentence identifying a specific product recommendation from the catalog, with a brief reason.",
    ),
  conversation_digest: z.object({
    sentiment_trend: z.enum(["positive", "neutral", "negative", "mixed"]),
    sentiment_reason: z
      .string()
      .max(160)
      .describe(
        "One short sentence explaining WHY the sentiment is what it is, citing specific topics or interactions.",
      ),
    recent_topics: z
      .array(z.string())
      .max(3)
      .describe("Up to 3 short noun phrases describing recent conversation topics."),
    open_requests: z
      .array(z.string())
      .describe("Short phrase per unresolved request, max 5."),
  }),
})

async function fetchBanking(table: string, clientId: string, column = "customer_id") {
  const supabase = createDirectClient()
  try {
    const { data, error } = await supabase.from(table).select("*").eq(column, clientId)
    if (error) {
      console.error(`[Briefing] Error fetching ${table}:`, error.message)
      return []
    }
    return data ?? []
  } catch (err) {
    console.error(`[Briefing] Exception fetching ${table}:`, err)
    return []
  }
}

async function fetchCallCenterData(clientId: string, sinceIso: string) {
  try {
    const { createCallCenterClient } = await import("@/lib/supabase/call-center-client")
    const cc = createCallCenterClient()

    const { data: conversations, error: convErr } = await cc
      .from("conversations")
      .select("*")
      .eq("customer_id", clientId)
      .gte("updated_at", sinceIso)
      .order("updated_at", { ascending: false })
      .limit(10)

    if (convErr || !conversations?.length) {
      if (convErr) console.error("[Briefing] Call center conversations error:", convErr.message)
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
    console.error("[Briefing] Call center fetch failed (proceeding without):", err)
    return []
  }
}

/**
 * Runs the full briefing pipeline for a single client and returns a
 * `BriefingResponse` ready to ship to the UI or cache. Throws on profile
 * not-found and on Claude failure — callers decide how to handle.
 */
export async function generateBriefingForClient(
  clientId: string,
  market: Market,
): Promise<BriefingResponse> {
  const marketCfg = MARKET_CONFIG[market]
  const supabase = createDirectClient()

  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", clientId)
    .single()

  if (profileErr || !profile) {
    throw new Error(`Client not found: ${clientId}`)
  }

  const accounts = await fetchBanking("accounts", clientId)
  const accountIds = accounts.map((a: any) => a.id)

  const [cards, loans] = await Promise.all([
    fetchBanking("cards", clientId),
    fetchBanking("loans", clientId),
  ])

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

  const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000
  const sinceIso = new Date(Date.now() - NINETY_DAYS_MS).toISOString()

  const { data: ticketsRaw } = await supabase
    .from("support_tickets")
    .select("*")
    .eq("user_id", clientId)
    .gte("created_at", sinceIso)
  const tickets = ticketsRaw ?? []
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

  const conversationsWithMessages = await fetchCallCenterData(clientId, sinceIso)

  const { data: products } = await supabase
    .from("products")
    .select("name, category, tagline, description, target_segment, rate_pct")
    .eq("market", market)
  const productCatalog = products ?? []

  const toNumber = (v: any) => {
    const n = Number(v)
    return Number.isFinite(n) ? n : 0
  }
  const usdRate = marketCfg.usdToHomeRate
  const totalBalance = accounts.reduce((s: number, a: any) => {
    const rate = a.currency === "USD" ? usdRate : 1
    return s + toNumber(a.balance) * rate
  }, 0)
  const totalLiabilities = loans.reduce(
    (s: number, l: any) => s + toNumber(l.remaining_balance),
    0,
  )

  const openTickets = ticketsWithThreads.filter(
    (t: any) => t.status !== "closed" && t.status !== "resolved",
  ).length
  const openConvs = conversationsWithMessages.filter(
    (c: any) => c.status !== "closed" && c.status !== "resolved",
  ).length

  const systemPrompt = `${buildMarketContext(market)}

You are an analyst preparing a proactive briefing for a Relationship Manager (RM) at AIdeology Bank. The RM is about to meet with this client and needs a concise, actionable, insight-led summary.

Write like an experienced banker speaking to a colleague — specific, human, and confident. Lead with the human angle, not just numbers. Reference real names, numbers, and product names from the data; never fabricate.

GROUNDING RULES (read carefully):
- Only describe a transaction as "flagged", "unusual", "suspicious", or "caught by the system" when its is_unusual field is true in the data. For un-flagged transactions, describe them factually — even if a pattern looks notable to you, do NOT frame it as something the bank's monitoring caught.
- Do not invent dates. Use the actual date field from each transaction or ticket. Do not extrapolate "her normal cycle is X" from one or two observations.
- Lead with whichever signal in the data is strongest right now: a returned/failed payment, an open high-priority ticket, an is_unusual transaction with a real unusual_reason, a card status change. If the strongest signal is mundane, say so — don't manufacture urgency.

INSTRUCTIONS FOR EACH FIELD:
- briefing: 2–3 sentences. Tell the RM the most important things to know about this client right now. Be specific (cite ${marketCfg.currency} figures, product names, recent events).
- main_concern: One sentence. The dominant pain point, worry, or unresolved request — pull from tickets and call center messages.
- next_best_action: One sentence. A concrete RM step (e.g., "Call to confirm card replacement delivery before her trip on the 24th").
- opportunity: One sentence. A specific product from the catalog that fits this client's profile + a one-clause reason.
- conversation_digest: Summarise the client's interactions across support tickets + call center conversations (last 90 days only).
  - sentiment_trend: positive / neutral / negative / mixed — overall tone across the conversations you can see.
  - sentiment_reason: ONE short sentence (max ~140 chars) explaining WHY — cite specific topics or signals (e.g., "Frustration on card friction during travel; positive feedback on resolution speed.").
  - recent_topics: up to 3 short noun phrases (e.g., "card replacement", "FX fees").
  - open_requests: 1 short phrase per unresolved item, max 5.
  - Do NOT include counts — those are computed server-side and merged in after your response.

Current Date: ${new Date().toISOString().split("T")[0]}`

  const userPrompt = `CLIENT PROFILE:
- Name: ${profile.full_name}
- Email: ${profile.email}
- Segment: ${profile.segment}
- KYC Status: ${profile.kyc_status}
- Client Since: ${profile.created_at ? new Date(profile.created_at).toLocaleDateString() : "Unknown"}

FINANCIAL SUMMARY:
- Total Balance: ${marketCfg.currency} ${totalBalance.toLocaleString("en", { minimumFractionDigits: 2 })}
- Total Liabilities: ${marketCfg.currency} ${totalLiabilities.toLocaleString("en", { minimumFractionDigits: 2 })}
- Accounts: ${accounts.length}, Cards: ${cards.length}, Active Loans: ${loans.length}
- Open Support Tickets: ${openTickets}
- Open Call Center Conversations: ${openConvs}

ACCOUNTS:
${JSON.stringify(accounts.map((a: any) => ({ name: a.name, type: a.type, balance: a.balance, currency: a.currency, status: a.status })))}

CARDS:
${JSON.stringify(cards.map((c: any) => ({ type: c.type, last_four: c.last_four, status: c.status, credit_limit: c.credit_limit, spent_amount: c.spent_amount })))}

LOANS:
${JSON.stringify(loans.map((l: any) => ({ type: l.type, principal_amount: l.principal_amount, remaining_balance: l.remaining_balance, interest_rate: l.interest_rate, status: l.status })))}

RECENT TRANSACTIONS (last 30):
${JSON.stringify(transactions.map((tx: any) => ({ date: tx.date, description: tx.description, amount: tx.amount, type: tx.type, category: tx.category, status: tx.status, is_unusual: tx.is_unusual, unusual_reason: tx.unusual_reason })))}

SUPPORT TICKETS (with full message threads):
${JSON.stringify(ticketsWithThreads.map((t: any) => ({
    subject: t.subject,
    status: t.status,
    priority: t.priority,
    messages: t.messages.map((m: any) => ({ sender: m.sender_type, content: m.content })),
  })))}

CALL CENTER CONVERSATIONS (recent, with messages):
${JSON.stringify(conversationsWithMessages.map((c: any) => ({
    subject: c.subject,
    channel: c.channel,
    status: c.status,
    sentiment: c.sentiment,
    messages: (c.messages ?? []).map((m: any) => ({ sender: m.sender_type, content: m.content })),
  })))}

PRODUCT CATALOG (only recommend products from this list):
${JSON.stringify(productCatalog)}

Generate the structured briefing now.`

  const { object } = await generateObject({
    model: claudeQuality(),
    schema: briefingSchema,
    system: systemPrompt,
    prompt: userPrompt,
    temperature: 0.4,
  })

  const ticketsCount = ticketsWithThreads.length
  const contactCenterCount = conversationsWithMessages.length
  const totalCount = ticketsCount + contactCenterCount
  const openCount = openTickets + openConvs

  return {
    ...object,
    conversation_digest: {
      ...object.conversation_digest,
      total_count: totalCount,
      open_count: openCount,
      tickets_count: ticketsCount,
      contact_center_count: contactCenterCount,
    },
  }
}
