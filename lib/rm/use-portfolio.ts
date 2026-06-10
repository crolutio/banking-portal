"use client"

// ---------------------------------------------------------------------------
// useRmPortfolio — the single data hook behind the RM triage surfaces
// (Today / Clients / Retention). Fetches the RM's assigned clients from the
// banking DB, enriches each with a derived category (SME / HNW / Retail) and a
// churn score built from real signals (At-Risk segment, "unusual" transactions
// like the Equity transfers, open tickets, and negative call-center threads),
// then exposes helpers to rank the book by the active Focus setting.
// ---------------------------------------------------------------------------

import { useEffect, useMemo, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { createCallCenterClient } from "@/lib/supabase/call-center-client"
import { byMarket } from "@/lib/market-filter"
import { MARKET_CONFIG } from "@/lib/markets"
import type { Market } from "@/lib/markets"
import type { FocusSettings } from "@/lib/rm/focus"

export type ClientCategory = "SME" | "HNW" | "Retail"

export interface ChurnSignal {
  label: string
  weight: number
  source: "segment" | "transaction" | "ticket" | "call" | "loan" | "balance"
}

export interface EnrichedClient {
  id: string
  name: string
  email: string
  phone: string | null
  avatar: string | null
  segment: string
  kycStatus: string
  category: ClientCategory
  totalBalance: number
  accountCount: number
  hasBusiness: boolean
  openTickets: number
  churnScore: number // 0–100
  churnSignals: ChurnSignal[]
  topConcern: string | null
  isDormant: boolean
  /** Estimated home-currency value of this client's next-best opportunity. */
  opportunityValue: number
  /** Expected home-currency AUM at risk = balance × churn probability. */
  aumAtRiskValue: number
}

const CHURN_RE =
  /equity|competitor|external bank|another bank|redirect|closing|clos(e|ure)|migrat|churn|leav(e|ing)|cancel|unhappy|charges (are )?too|moving (my )?(funds|salary|account|money)/i

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n))
}

export function useRmPortfolio(rmId: string | null | undefined, market: Market) {
  const [clients, setClients] = useState<EnrichedClient[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!rmId) return
      setLoading(true)
      const supabase = createClient()

      const { data: profiles } = await byMarket(
        supabase.from("profiles").select("*"),
        market,
      ).eq("assigned_rm_id", rmId)

      if (!profiles || profiles.length === 0) {
        if (!cancelled) {
          setClients([])
          setLoading(false)
        }
        return
      }

      const clientIds = profiles.map((p: any) => p.id)

      const [accountsRes, loansRes, ticketsRes] = await Promise.all([
        byMarket(supabase.from("accounts").select("id, customer_id, balance, currency, type"), market).in(
          "customer_id",
          clientIds,
        ),
        byMarket(supabase.from("loans").select("customer_id, type, status"), market).in("customer_id", clientIds),
        byMarket(
          supabase.from("support_tickets").select("user_id, subject, status, priority"),
          market,
        )
          .in("user_id", clientIds)
          .in("status", ["open", "in_progress"]),
      ])

      const accounts = accountsRes.data || []
      const loans = loansRes.data || []
      const tickets = ticketsRes.data || []

      const accountIds = accounts.map((a: any) => a.id)
      const accountToCustomer = new Map<string, string>()
      for (const a of accounts) accountToCustomer.set(a.id, a.customer_id)

      // Unusual transactions carry the churn/fraud/NSF prose the AI reads.
      let unusualTx: any[] = []
      if (accountIds.length > 0) {
        const { data } = await byMarket(
          supabase
            .from("transactions")
            .select("account_id, description, unusual_reason, is_unusual, date")
            .eq("is_unusual", true),
          market,
        ).in("account_id", accountIds)
        unusualTx = data || []
      }

      // Negative call-center threads (separate Supabase project).
      let negativeConvos: any[] = []
      try {
        const cc = createCallCenterClient()
        const { data } = await byMarket(
          cc.from("conversations").select("customer_id, subject, sentiment, status"),
          market,
        )
          .in("customer_id", clientIds)
          .eq("sentiment", "negative")
        negativeConvos = data || []
      } catch {
        // Call-center is best-effort; banking signals still drive churn.
      }

      const usdRate = MARKET_CONFIG[market].usdToHomeRate

      const enriched: EnrichedClient[] = profiles.map((p: any) => {
        const myAccounts = accounts.filter((a: any) => a.customer_id === p.id)
        const totalBalance = myAccounts.reduce((sum: number, a: any) => {
          const rate = a.currency === "USD" ? usdRate : 1
          return sum + Number(a.balance) * rate
        }, 0)
        const hasBusiness =
          myAccounts.some((a: any) => a.type === "business") ||
          loans.some((l: any) => l.customer_id === p.id && l.type === "business")

        const category: ClientCategory = hasBusiness
          ? "SME"
          : p.segment === "VIP" || p.segment === "Premium"
            ? "HNW"
            : "Retail"

        const myTickets = tickets.filter((t: any) => t.user_id === p.id)
        const myUnusual = unusualTx.filter((t: any) => accountToCustomer.get(t.account_id) === p.id)
        const myConvos = negativeConvos.filter((c: any) => c.customer_id === p.id)
        const myLoans = loans.filter((l: any) => l.customer_id === p.id)

        // ---- churn scoring -------------------------------------------------
        const signals: ChurnSignal[] = []
        if (p.segment === "At Risk") {
          signals.push({ label: 'Segment flagged "At Risk"', weight: 35, source: "segment" })
        }
        if (myLoans.some((l: any) => l.status === "delinquent")) {
          signals.push({ label: "Loan repayment delinquent", weight: 15, source: "loan" })
        }
        let txWeight = 0
        for (const t of myUnusual) {
          const reason: string = t.unusual_reason || t.description || ""
          if (CHURN_RE.test(reason)) {
            txWeight += 30
            signals.push({
              label: reason.length > 110 ? reason.slice(0, 107) + "…" : reason,
              weight: 30,
              source: "transaction",
            })
          }
        }
        // cap stacked transaction weight so one client can't blow past sense
        if (txWeight > 50) {
          // keep signals, but reflect the cap in the score below
        }
        for (const t of myTickets) {
          if (CHURN_RE.test(t.subject || "")) {
            signals.push({ label: `Ticket: ${t.subject}`, weight: 20, source: "ticket" })
          }
        }
        for (const c of myConvos) {
          signals.push({
            label: `Call (${c.status}): ${c.subject}`,
            weight: 25,
            source: "call",
          })
        }
        if (totalBalance > 0 && totalBalance < 100000) {
          signals.push({ label: "Low / declining balance", weight: 10, source: "balance" })
        }

        const rawScore = signals.reduce((s, x) => s + x.weight, 0)
        const churnScore = clamp(Math.round(rawScore), 0, 100)

        // top concern = highest-weight non-segment signal, else the segment one
        const ranked = [...signals].sort((a, b) => b.weight - a.weight)
        const topConcern =
          ranked.find((s) => s.source !== "segment")?.label ?? ranked[0]?.label ?? null

        const isDormant =
          myTickets.length === 0 &&
          myUnusual.length === 0 &&
          churnScore < 20 &&
          myAccounts.length <= 1 &&
          totalBalance < 150000

        // Rough "size of the play" for this client's next-best action, and the
        // expected AUM at stake if they churn. Demo heuristics, but consistent.
        const oppMultiplier = category === "SME" ? 1.2 : category === "HNW" ? 0.5 : 0.3
        const opportunityValue = Math.round(totalBalance * oppMultiplier)
        const aumAtRiskValue = Math.round(totalBalance * (churnScore / 100))

        return {
          id: p.id,
          name: p.full_name,
          email: p.email,
          phone: p.phone,
          avatar: p.avatar_url,
          segment: p.segment || "Standard",
          kycStatus: p.kyc_status || "Pending",
          category,
          totalBalance,
          accountCount: myAccounts.length,
          hasBusiness,
          openTickets: myTickets.length,
          churnScore,
          churnSignals: ranked,
          topConcern,
          isDormant,
          opportunityValue,
          aumAtRiskValue,
        }
      })

      if (!cancelled) {
        setClients(enriched)
        setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [rmId, market])

  const totals = useMemo(() => {
    const aum = clients.reduce((t, c) => t + c.totalBalance, 0)
    const atRisk = clients.filter((c) => c.churnScore >= 50).length
    const sme = clients.filter((c) => c.category === "SME").length
    const hnw = clients.filter((c) => c.category === "HNW").length
    const openActions = clients.reduce((t, c) => t + c.openTickets, 0)
    // Money framing: open opportunity across active hooks; expected AUM at risk.
    const opportunity = clients.reduce(
      (t, c) => t + (c.openTickets > 0 || c.category !== "Retail" ? c.opportunityValue : 0),
      0,
    )
    const aumAtRiskValue = clients
      .filter((c) => c.churnScore >= 40)
      .reduce((t, c) => t + c.aumAtRiskValue, 0)
    return { aum, atRisk, sme, hnw, openActions, opportunity, aumAtRiskValue, count: clients.length }
  }, [clients])

  return { clients, loading, totals }
}

// ---------------------------------------------------------------------------
// Focus-aware ranking. Higher score = higher up the RM's "do this now" list.
// ---------------------------------------------------------------------------
// When a *segment* focus is active (SME / HNW / Dormant), matching clients must
// sit clearly above everyone else — otherwise a few high-churn clients (whose
// churnScore can reach 100) would dominate every list and switching focus would
// barely change the ranking. This boost exceeds the maximum possible churn-based
// score, so the selected bucket always leads; churn + tickets then order clients
// *within* the bucket. "Churn" and "Balanced" stay risk-weighted by design.
const SEGMENT_FOCUS_BOOST = 1000

export function focusScore(c: EnrichedClient, f: FocusSettings): number {
  let s = c.churnScore * (f.riskSensitivity / 50) // sensitivity 50 → ×1
  switch (f.priority) {
    case "churn":
      s += c.churnScore // double-weight risk so flight-risk clients lead
      break
    case "sme":
      if (c.category === "SME") s += SEGMENT_FOCUS_BOOST
      break
    case "hnw":
      if (c.category === "HNW") s += SEGMENT_FOCUS_BOOST
      break
    case "dormant":
      if (c.isDormant) s += SEGMENT_FOCUS_BOOST
      break
    case "balanced":
    default:
      if (c.category === "HNW" || c.category === "SME") s += 25
      break
  }
  s += c.openTickets * 8
  return s
}

export const CATEGORY_META: Record<ClientCategory, { label: string; className: string }> = {
  SME: { label: "SME", className: "bg-violet-500/15 text-violet-600 dark:text-violet-400" },
  HNW: { label: "High Net Worth", className: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
  Retail: { label: "Retail", className: "bg-muted text-muted-foreground" },
}

/** Risk band for a churn score — drives colour + label across the surfaces. */
export function churnBand(score: number): { label: string; className: string; dot: string } {
  if (score >= 70)
    return {
      label: "High flight risk",
      className: "text-red-600 dark:text-red-400",
      dot: "bg-red-500",
    }
  if (score >= 40)
    return {
      label: "Watch",
      className: "text-amber-600 dark:text-amber-400",
      dot: "bg-amber-500",
    }
  return { label: "Stable", className: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" }
}
