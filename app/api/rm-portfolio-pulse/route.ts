import { isClaudeConfigured } from "@/lib/ai/claude"
import { createDirectClient } from "@/lib/supabase/direct-client"
import { DEFAULT_MARKET, MARKET_CONFIG, isMarket, type Market } from "@/lib/markets"
import { generateBriefingForClient } from "@/lib/rm/briefing-generator"
import type { BriefingResponse } from "@/lib/rm/client-briefings"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Urgency = "high" | "medium" | "low"

interface PulseItem {
  clientId: string
  clientName: string
  reason: string
  urgency: Urgency
}

const FALLBACK_BY_RM: Record<string, PulseItem[]> = {
  // James Rodriguez (UAE RM)
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
  // Peter Mwangi (Kenya RM)
  "11ce0003-0003-4003-a003-000000000003": [
    {
      clientId: "11ce0001-0001-4001-a001-000000000001",
      clientName: "Wanjiru Kamau",
      reason: "Card blocked in Kigali — needs travel-flag review and goodwill FX waiver.",
      urgency: "high",
    },
    {
      clientId: "11ce0002-0002-4002-a002-000000000002",
      clientName: "Otieno Ouma",
      reason: "KEMSA tender statements pending — high-priority ticket open 7 days.",
      urgency: "high",
    },
  ],
}

function safeNumber(v: any): number {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

/** Renders an ISO timestamp as something a banker would actually say in a sentence ("May 21, 2026"). */
function formatDateForPrompt(iso: string): string {
  if (!iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

interface ClientSignals {
  clientId: string
  clientName: string
  segment: string | null
  totalBalance: number
  openHighPriorityTickets: number
  openTickets: number
  activeLoans: number
  loanTypes: string[]
  hasUnusualTransaction: boolean
  hasCardBlocked: boolean
  recentTicketSubject: string | null
  recentTicketPriority: string | null
  /** Single most-recent unusual transaction, with description + amount, for narrative grounding. */
  recentUnusualTx: { description: string; amount: number; date: string } | null
}

async function gatherSignals(rmId: string, market: Market): Promise<ClientSignals[]> {
  const supabase = createDirectClient()

  // Scope client enumeration to the active market. Downstream queries
  // are then implicitly scoped via the resulting clientIds.
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, segment")
    .eq("assigned_rm_id", rmId)
    .eq("market", market)

  if (!profiles || profiles.length === 0) return []

  const clientIds = profiles.map((p: any) => p.id)
  const usdRate = MARKET_CONFIG[market].usdToHomeRate

  const [accountsRes, ticketsRes, loansRes, cardsRes] = await Promise.all([
    supabase.from("accounts").select("customer_id, balance, currency").in("customer_id", clientIds),
    supabase
      .from("support_tickets")
      .select("user_id, subject, priority, status, created_at")
      .in("user_id", clientIds)
      .in("status", ["open", "in_progress"])
      .order("created_at", { ascending: false }),
    supabase
      .from("loans")
      .select("customer_id, type, status")
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
    // Pull description + amount so the AI has concrete narrative material
    // (a "Carrefour Kenya cheque uncleared" line beats a boolean every time).
    const { data: txData } = await supabase
      .from("transactions")
      .select("account_id, is_unusual, date, description, amount")
      .in("account_id", accountIds)
      .eq("is_unusual", true)
      .order("date", { ascending: false })
      .limit(30)
    unusualTxs = txData ?? []
  }

  return profiles.map((p: any) => {
    const clientAccounts = accounts.filter((a: any) => a.customer_id === p.id)
    const totalBalance = clientAccounts.reduce((s: number, a: any) => {
      const rate = a.currency === "USD" ? usdRate : 1
      return s + safeNumber(a.balance) * rate
    }, 0)
    // Tickets are ordered created_at DESC; first one is the most recent.
    // High-priority tickets bubble to the top so they win as `recentTicketSubject`.
    const clientTickets = tickets
      .filter((t: any) => t.user_id === p.id)
      .sort((a: any, b: any) => {
        const aPri = a.priority === "high" || a.priority === "urgent" ? 0 : 1
        const bPri = b.priority === "high" || b.priority === "urgent" ? 0 : 1
        return aPri - bPri
      })
    const highPri = clientTickets.filter(
      (t: any) => t.priority === "high" || t.priority === "urgent",
    )
    const clientLoans = loans.filter((l: any) => l.customer_id === p.id)
    const loanTypes = Array.from(new Set(clientLoans.map((l: any) => String(l.type ?? "")).filter(Boolean))) as string[]
    const clientCards = cards.filter((c: any) => c.customer_id === p.id)
    const clientUnusual = unusualTxs.filter(
      (tx: any) => accountIdToClient.get(tx.account_id) === p.id,
    )
    const recentUnusualTx = clientUnusual[0]
      ? {
          description: String(clientUnusual[0].description ?? "Unusual transaction"),
          amount: safeNumber(clientUnusual[0].amount),
          date: String(clientUnusual[0].date ?? ""),
        }
      : null
    const hasCardBlocked = clientCards.some((c: any) => c.status === "blocked")
    return {
      clientId: p.id,
      clientName: p.full_name,
      segment: p.segment,
      totalBalance,
      openHighPriorityTickets: highPri.length,
      openTickets: clientTickets.length,
      activeLoans: clientLoans.length,
      loanTypes,
      hasUnusualTransaction: clientUnusual.length > 0,
      hasCardBlocked,
      recentTicketSubject: clientTickets[0]?.subject ?? null,
      recentTicketPriority: clientTickets[0]?.priority ?? null,
      recentUnusualTx,
    }
  })
}

/**
 * Builds a narrative 1–2 sentence deterministic reason that leans on the
 * client's MOST specific signal (ticket subject → unusual tx description →
 * distinct loan type → balance). Used when the LLM is unavailable or returns
 * a true duplicate across clients. Each branch deliberately uses a different
 * sentence shape so two clients hitting different branches feel distinct.
 */
function buildDeterministicReason(s: ClientSignals, currency: string): string {
  const fmt = (n: number) => `${currency} ${Math.abs(n).toLocaleString("en", { maximumFractionDigits: 0 })}`
  if (s.openHighPriorityTickets > 0 && s.recentTicketSubject) {
    return `${s.clientName.split(" ")[0]} has an open ${s.recentTicketPriority ?? "high"}-priority ticket: "${s.recentTicketSubject}". Resolve or escalate before next contact.`
  }
  if (s.recentTicketSubject) {
    return `An open support thread is sitting on "${s.recentTicketSubject}". A quick follow-up will close it out before it escalates.`
  }
  if (s.hasCardBlocked) {
    return `Card is currently blocked and needs proactive outreach today — confirm the trigger with the client and arrange a replacement.`
  }
  if (s.recentUnusualTx) {
    return `${s.clientName.split(" ")[0]}'s ${fmt(s.recentUnusualTx.amount)} ${s.recentUnusualTx.description} from ${formatDateForPrompt(s.recentUnusualTx.date)} was auto-flagged as unusual. A short courtesy call will confirm it's legitimate and keep the relationship warm.`
  }
  if (s.loanTypes.length >= 2) {
    return `${s.activeLoans} active loans currently running (${s.loanTypes.slice(0, 3).join(", ")}). Consolidation conversation could simplify their position and improve the relationship.`
  }
  if (s.activeLoans >= 3) {
    return `${s.activeLoans} active loans on book — a debt consolidation review could unlock meaningful savings for the client and tighter relationship economics for the bank.`
  }
  return `${fmt(s.totalBalance)} sitting across accounts — wallet-share opportunity worth exploring on the next touchpoint.`
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
    let body: { rmId?: unknown; market?: unknown } = {}
    try {
      body = await req.json()
    } catch {
      return Response.json({ error: "Empty or invalid request body" }, { status: 400 })
    }
    const { rmId } = body
    if (!rmId || typeof rmId !== "string") {
      return Response.json({ error: "Missing or invalid rmId" }, { status: 400 })
    }
    // Fall back to default market if the client didn't send one.
    const market: Market = isMarket(body.market) ? body.market : DEFAULT_MARKET
    const marketCfg = MARKET_CONFIG[market]

    const signals = await gatherSignals(rmId, market)
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
        reason: buildDeterministicReason(s, marketCfg.currency),
        urgency: s.urgency,
      }))
      return Response.json({ items }, { status: 200 })
    }

    // Generate full briefings for the top-3 clients in parallel. The Pulse
    // blurb is just each briefing's `main_concern` (one tight sentence) — by
    // reusing the briefing pipeline we get the same depth and the same
    // anti-hallucination grounding for free, instead of a thinner parallel
    // LLM call that drifts. As a bonus, the full briefings ride back in the
    // response so the client can pre-warm its briefing cache and the
    // per-client briefing card opens instantly when the RM clicks in.
    const briefingResults = await Promise.allSettled(
      topN.map((s) => generateBriefingForClient(s.clientId, market)),
    )

    const briefings: Record<string, BriefingResponse> = {}
    const items: PulseItem[] = topN.map((s, i) => {
      const result = briefingResults[i]
      if (result.status === "fulfilled" && result.value?.main_concern) {
        briefings[s.clientId] = result.value
        return {
          clientId: s.clientId,
          clientName: s.clientName,
          reason: result.value.main_concern,
          urgency: s.urgency,
        }
      }
      console.warn(
        `[Portfolio Pulse] Briefing failed for ${s.clientName} (${s.clientId})`,
        result.status === "rejected" ? result.reason?.message ?? result.reason : "no main_concern",
      )
      return {
        clientId: s.clientId,
        clientName: s.clientName,
        reason: buildDeterministicReason(s, marketCfg.currency),
        urgency: s.urgency,
      }
    })

    if (items.length === 0) {
      const fallback = FALLBACK_BY_RM[rmId]
      return Response.json({ items: fallback ?? [] }, { status: 200 })
    }

    const rank = { high: 0, medium: 1, low: 2 }
    items.sort((a, b) => rank[a.urgency] - rank[b.urgency])

    return Response.json({ items, briefings }, { status: 200 })
  } catch (error: any) {
    console.error("[Portfolio Pulse] Error:", error)
    return Response.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 },
    )
  }
}
