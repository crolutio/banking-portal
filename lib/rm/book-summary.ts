// ---------------------------------------------------------------------------
// Shared whole-book summary builder. The text Atlas route (/api/rm-atlas) and
// the voice path (/api/atlas-voice/*) BOTH call this, so the two surfaces can
// never drift apart on what the AI knows about the RM's book.
//
// Server-only: uses the direct (publishable-key) Supabase clients. Builds one
// compact row per client — category, balance, churn score + signals,
// opportunity, open tickets, dormant flag — so the model can reason over the
// whole portfolio without raw ledgers blowing the context budget.
// ---------------------------------------------------------------------------

import { createDirectClient } from "@/lib/supabase/direct-client"
import { MARKET_CONFIG, type Market } from "@/lib/markets"

// Same churn-keyword regex the client-side portfolio hook (use-portfolio.ts) uses.
export const CHURN_RE =
  /equity|competitor|external bank|another bank|redirect|closing|clos(e|ure)|migrat|churn|leav(e|ing)|cancel|unhappy|charges (are )?too|moving (my )?(funds|salary|account|money)/i

export type BookCategory = "SME" | "HNW" | "Retail"

export interface BookClient {
  name: string
  category: BookCategory
  segment: string | null
  kyc: string | null
  balanceKES: number
  churn: number
  signals: string[]
  openTickets: string[]
  opportunityKES: number
  dormant: boolean
}

export interface BookTotals {
  clients: number
  aumKES: number
  atRisk: number
  sme: number
  hnw: number
  dormant: number
}

const EMPTY_TOTALS: BookTotals = { clients: 0, aumKES: 0, atRisk: 0, sme: 0, hnw: 0, dormant: 0 }

/** Build the per-client book summary + portfolio totals for one RM. */
export async function buildBookSummary(
  rmId: string,
  market: Market,
): Promise<{ book: BookClient[]; totals: BookTotals }> {
  const marketCfg = MARKET_CONFIG[market]
  const supabase = createDirectClient()

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, segment, kyc_status, created_at, phone")
    .eq("assigned_rm_id", rmId)
    .eq("market", market)

  if (!profiles || profiles.length === 0) return { book: [], totals: { ...EMPTY_TOTALS } }
  const ids = profiles.map((p) => p.id)

  const usd = marketCfg.usdToHomeRate
  const num = (v: any) => (Number.isFinite(Number(v)) ? Number(v) : 0)

  // Negative call-center threads (separate project) — fetch concurrently with
  // the banking tables since it only needs the profile ids.
  const negConvosPromise = (async () => {
    try {
      const { createCallCenterClient } = await import("@/lib/supabase/call-center-client")
      const cc = createCallCenterClient()
      const { data } = await cc
        .from("conversations")
        .select("customer_id, subject, sentiment, status")
        .in("customer_id", ids)
        .eq("sentiment", "negative")
      return data ?? []
    } catch {
      return []
    }
  })()

  const [accountsRes, loansRes, ticketsRes, negConvos] = await Promise.all([
    supabase.from("accounts").select("id, customer_id, balance, currency, type").in("customer_id", ids),
    supabase.from("loans").select("customer_id, type, status, remaining_balance").in("customer_id", ids),
    supabase
      .from("support_tickets")
      .select("user_id, subject, status, priority")
      .in("user_id", ids)
      .in("status", ["open", "in_progress"]),
    negConvosPromise,
  ])
  const accounts = accountsRes.data ?? []
  const loans = loansRes.data ?? []
  const tickets = ticketsRes.data ?? []

  const acctIds = accounts.map((a: any) => a.id)
  const acctToCust = new Map<string, string>(accounts.map((a: any) => [a.id, a.customer_id]))
  let unusual: any[] = []
  for (let i = 0; i < acctIds.length; i += 100) {
    const { data } = await supabase
      .from("transactions")
      .select("account_id, unusual_reason, description")
      .eq("is_unusual", true)
      .in("account_id", acctIds.slice(i, i + 100))
    unusual = unusual.concat(data ?? [])
  }

  const book: BookClient[] = profiles.map((p: any) => {
    const my = accounts.filter((a: any) => a.customer_id === p.id)
    const balance = my.reduce((s: number, a: any) => s + num(a.balance) * (a.currency === "USD" ? usd : 1), 0)
    const hasBiz =
      my.some((a: any) => a.type === "business") ||
      loans.some((l: any) => l.customer_id === p.id && l.type === "business")
    const category: BookCategory = hasBiz ? "SME" : p.segment === "VIP" || p.segment === "Premium" ? "HNW" : "Retail"
    const myTk = tickets.filter((t: any) => t.user_id === p.id)
    const myUn = unusual.filter((t: any) => acctToCust.get(t.account_id) === p.id)
    const myNeg = negConvos.filter((c: any) => c.customer_id === p.id)
    const myLoans = loans.filter((l: any) => l.customer_id === p.id)

    let churn = 0
    const signals: string[] = []
    if (p.segment === "At Risk") { churn += 35; signals.push("segment At Risk") }
    if (myLoans.some((l: any) => l.status === "delinquent")) { churn += 15; signals.push("delinquent loan") }
    for (const t of myUn) if (CHURN_RE.test(t.unusual_reason || t.description || "")) { churn += 30; signals.push(`txn: ${(t.unusual_reason || t.description || "").slice(0, 80)}`) }
    for (const t of myTk) if (CHURN_RE.test(t.subject || "")) { churn += 20; signals.push(`ticket: ${t.subject}`) }
    if (myNeg.length) { churn += 25 * myNeg.length; signals.push(`negative call: ${myNeg[0].subject}`) }
    if (balance > 0 && balance < 100000) { churn += 10; signals.push("low balance") }
    churn = Math.max(0, Math.min(100, churn))

    const oppMult = category === "SME" ? 1.2 : category === "HNW" ? 0.5 : 0.3
    const opportunity = Math.round(balance * oppMult)
    const dormant = myTk.length === 0 && myUn.length === 0 && churn < 20 && my.length <= 1 && balance < 150000

    return {
      name: p.full_name,
      category,
      segment: p.segment,
      kyc: p.kyc_status,
      balanceKES: Math.round(balance),
      churn,
      signals,
      openTickets: myTk.map((t: any) => t.subject),
      opportunityKES: opportunity,
      dormant,
    }
  })

  const totals: BookTotals = {
    clients: book.length,
    aumKES: Math.round(book.reduce((s, c) => s + c.balanceKES, 0)),
    atRisk: book.filter((c) => c.churn >= 40).length,
    sme: book.filter((c) => c.category === "SME").length,
    hnw: book.filter((c) => c.category === "HNW").length,
    dormant: book.filter((c) => c.dormant).length,
  }

  return { book, totals }
}

/** Render the book summary as the prompt context block both paths embed. */
export function formatBookContext(book: BookClient[], totals: BookTotals, market: Market): string {
  const cfg = MARKET_CONFIG[market]
  return `PORTFOLIO TOTALS: ${totals.clients} clients · AUM ${cfg.currency} ${totals.aumKES.toLocaleString("en")} · ${totals.atRisk} at-risk · ${totals.sme} SME · ${totals.hnw} HNW · ${totals.dormant} dormant.

THE BOOK (one row per client — churn is 0–100, ${cfg.currency} figures are home-currency):
${JSON.stringify(book)}`
}
