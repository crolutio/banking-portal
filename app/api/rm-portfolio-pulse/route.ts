import { generateObject } from "ai"
import { z } from "zod"
import { claude, isClaudeConfigured } from "@/lib/ai/claude"
import { createDirectClient } from "@/lib/supabase/direct-client"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Urgency = "high" | "medium" | "low"

interface PulseItem {
  clientId: string
  clientName: string
  reason: string
  urgency: Urgency
}

const itemSchema = z.object({
  clientId: z.string(),
  reason: z
    .string()
    .max(140)
    .describe(
      "One short sentence (max ~120 chars) explaining why this client needs attention now. Specific, actionable, banker-speak.",
    ),
  urgency: z
    .enum(["high", "medium", "low"])
    .describe(
      "high = action needed today/this week, medium = within 2 weeks, low = opportunity to surface next interaction",
    ),
})

const pulseSchema = z.object({
  items: z.array(itemSchema).max(5),
})

const FALLBACK_BY_RM: Record<string, PulseItem[]> = {
  // James Rodriguez (demo RM)
  "51880b1d-3935-49dd-bac6-9469d33d3ee3": [
    {
      clientId: "4e140685-8f38-49ff-aae0-d6109c46873d",
      clientName: "Sarah Chen",
      reason: "Card blocked in London — second incident this quarter. Trust eroding.",
      urgency: "high",
    },
    {
      clientId: "22222222-2222-2222-2222-222222222222",
      clientName: "Mohammed Ali",
      reason: "3 active loans = AED 4.2M. Consolidation could save ~AED 18K/yr.",
      urgency: "medium",
    },
    {
      clientId: "33ec752e-c91d-45a6-a572-33ccae68dca5",
      clientName: "Aisha Al-Farsi",
      reason: "AED 125K idle in savings — eligible for High-Yield at 4.5%.",
      urgency: "low",
    },
  ],
}

function safeNumber(v: any): number {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

interface ClientSignals {
  clientId: string
  clientName: string
  segment: string | null
  totalBalance: number
  openHighPriorityTickets: number
  openTickets: number
  activeLoans: number
  hasUnusualTransaction: boolean
  hasCardBlocked: boolean
  recentTicketSubject: string | null
}

async function gatherSignals(rmId: string): Promise<ClientSignals[]> {
  const supabase = createDirectClient()

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, segment")
    .eq("assigned_rm_id", rmId)

  if (!profiles || profiles.length === 0) return []

  const clientIds = profiles.map((p: any) => p.id)

  const [accountsRes, ticketsRes, loansRes, cardsRes] = await Promise.all([
    supabase.from("accounts").select("customer_id, balance, currency").in("customer_id", clientIds),
    supabase
      .from("support_tickets")
      .select("user_id, subject, priority, status")
      .in("user_id", clientIds)
      .in("status", ["open", "in_progress"]),
    supabase
      .from("loans")
      .select("customer_id, status")
      .in("customer_id", clientIds)
      .eq("status", "active"),
    supabase
      .from("cards")
      .select("customer_id, status")
      .in("customer_id", clientIds),
  ])

  const accounts = accountsRes.data ?? []
  const tickets = ticketsRes.data ?? []
  const loans = loansRes.data ?? []
  const cards = cardsRes.data ?? []

  const { data: accountRows } = await supabase
    .from("accounts")
    .select("id, customer_id")
    .in("customer_id", clientIds)
  const accountIdToClient = new Map<string, string>()
  for (const a of accountRows ?? []) {
    accountIdToClient.set(a.id, a.customer_id)
  }
  const accountIds = Array.from(accountIdToClient.keys())
  let unusualTxs: any[] = []
  if (accountIds.length > 0) {
    const { data: txData } = await supabase
      .from("transactions")
      .select("account_id, is_unusual, date")
      .in("account_id", accountIds)
      .eq("is_unusual", true)
      .order("date", { ascending: false })
      .limit(20)
    unusualTxs = txData ?? []
  }

  return profiles.map((p: any) => {
    const clientAccounts = accounts.filter((a: any) => a.customer_id === p.id)
    const totalBalance = clientAccounts.reduce((s: number, a: any) => {
      const rate = a.currency === "USD" ? 3.67 : 1
      return s + safeNumber(a.balance) * rate
    }, 0)
    const clientTickets = tickets.filter((t: any) => t.user_id === p.id)
    const highPri = clientTickets.filter(
      (t: any) => t.priority === "high" || t.priority === "urgent",
    )
    const clientLoans = loans.filter((l: any) => l.customer_id === p.id)
    const clientCards = cards.filter((c: any) => c.customer_id === p.id)
    const hasUnusual = unusualTxs.some(
      (tx: any) => accountIdToClient.get(tx.account_id) === p.id,
    )
    const hasCardBlocked = clientCards.some((c: any) => c.status === "blocked")
    return {
      clientId: p.id,
      clientName: p.full_name,
      segment: p.segment,
      totalBalance,
      openHighPriorityTickets: highPri.length,
      openTickets: clientTickets.length,
      activeLoans: clientLoans.length,
      hasUnusualTransaction: hasUnusual,
      hasCardBlocked,
      recentTicketSubject: clientTickets[0]?.subject ?? null,
    }
  })
}

function scoreUrgency(s: ClientSignals): { score: number; urgency: Urgency } {
  let score = 0
  if (s.openHighPriorityTickets > 0) score += 100
  if (s.hasCardBlocked) score += 80
  if (s.hasUnusualTransaction) score += 60
  if (s.openTickets > 0) score += 25
  if (s.activeLoans >= 3) score += 30
  if (s.totalBalance > 500_000) score += 15
  const urgency: Urgency = score >= 80 ? "high" : score >= 30 ? "medium" : "low"
  return { score, urgency }
}

export async function POST(req: Request) {
  try {
    let body: { rmId?: unknown } = {}
    try {
      body = await req.json()
    } catch {
      return Response.json({ error: "Empty or invalid request body" }, { status: 400 })
    }
    const { rmId } = body
    if (!rmId || typeof rmId !== "string") {
      return Response.json({ error: "Missing or invalid rmId" }, { status: 400 })
    }

    const signals = await gatherSignals(rmId)
    if (signals.length === 0) {
      return Response.json({ items: [] }, { status: 200 })
    }

    const scored = signals.map((s) => ({ ...s, ...scoreUrgency(s) }))
    scored.sort((a, b) => b.score - a.score)
    const topN = scored.slice(0, 3)

    if (!topN.some((s) => s.score > 0)) {
      const fallback = FALLBACK_BY_RM[rmId]
      if (fallback) return Response.json({ items: fallback }, { status: 200 })
      return Response.json({ items: [] }, { status: 200 })
    }

    if (!isClaudeConfigured()) {
      const items: PulseItem[] = topN.map((s) => ({
        clientId: s.clientId,
        clientName: s.clientName,
        reason: s.openHighPriorityTickets
          ? `Open high-priority ticket: ${s.recentTicketSubject}`
          : s.hasCardBlocked
            ? `Card currently blocked — needs proactive outreach.`
            : s.hasUnusualTransaction
              ? `Unusual transaction flagged — review with client.`
              : s.activeLoans >= 3
                ? `${s.activeLoans} active loans — debt consolidation opportunity.`
                : `Significant balance with attention opportunity.`,
        urgency: s.urgency,
      }))
      return Response.json({ items }, { status: 200 })
    }

    const systemPrompt = `You are an analyst preparing a one-line "why this client needs attention now" reason for a Relationship Manager's dashboard. For each candidate, return:
  - clientId (exact match from input)
  - reason: ONE short sentence (max ~120 characters), specific and actionable. Reference the actual signal you see (open ticket subject, card status, loan count, balance). Never invent.
  - urgency: high / medium / low based on the signal strength

Output a JSON object with an "items" array of length equal to inputs.
Tone: experienced banker, terse, no fluff.
Currency: AED with thousands separators.`

    const userPrompt = `RM is reviewing their dashboard. Here are 3 candidate clients with deterministic signals:

${topN
  .map((s, i) => {
    return `Candidate ${i + 1}:
- clientId: ${s.clientId}
- name: ${s.clientName}
- segment: ${s.segment ?? "Standard"}
- total balance: AED ${s.totalBalance.toLocaleString("en", { maximumFractionDigits: 0 })}
- open tickets: ${s.openTickets} (${s.openHighPriorityTickets} high priority)
- recent ticket subject: ${s.recentTicketSubject ?? "—"}
- active loans: ${s.activeLoans}
- card blocked: ${s.hasCardBlocked ? "yes" : "no"}
- unusual transaction flagged: ${s.hasUnusualTransaction ? "yes" : "no"}
- deterministic urgency suggestion: ${s.urgency}`
  })
  .join("\n\n")}

Return the items array. Preserve clientId exactly. Adjust urgency if you disagree with the deterministic suggestion based on the signal mix.`

    try {
      const { object } = await generateObject({
        model: claude(),
        schema: pulseSchema,
        system: systemPrompt,
        prompt: userPrompt,
        temperature: 0.4,
      })

      const nameById = new Map(topN.map((s) => [s.clientId, s.clientName]))
      const items: PulseItem[] = (object.items ?? [])
        .filter((it) => nameById.has(it.clientId))
        .map((it) => ({
          clientId: it.clientId,
          clientName: nameById.get(it.clientId)!,
          reason: it.reason,
          urgency: it.urgency,
        }))

      if (items.length === 0) {
        const fallback = FALLBACK_BY_RM[rmId]
        return Response.json({ items: fallback ?? [] }, { status: 200 })
      }

      const rank = { high: 0, medium: 1, low: 2 }
      items.sort((a, b) => rank[a.urgency] - rank[b.urgency])

      return Response.json({ items }, { status: 200 })
    } catch (aiErr: any) {
      console.warn("[Portfolio Pulse] AI failed, using deterministic reasons:", aiErr?.message)
      const items: PulseItem[] = topN.map((s) => ({
        clientId: s.clientId,
        clientName: s.clientName,
        reason: s.openHighPriorityTickets
          ? `Open high-priority ticket: ${s.recentTicketSubject}`
          : s.hasCardBlocked
            ? `Card currently blocked — needs proactive outreach.`
            : s.hasUnusualTransaction
              ? `Unusual transaction flagged — review with client.`
              : s.activeLoans >= 3
                ? `${s.activeLoans} active loans — debt consolidation opportunity.`
                : `Significant balance with attention opportunity.`,
        urgency: s.urgency,
      }))
      return Response.json({ items }, { status: 200 })
    }
  } catch (error: any) {
    console.error("[Portfolio Pulse] Error:", error)
    return Response.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 },
    )
  }
}
