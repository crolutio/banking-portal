import { NextResponse } from "next/server"
import { createDirectClient } from "@/lib/supabase/direct-client"

export const runtime = "nodejs"

const SARAH_VOICE_USER_ID = "4e140685-8f38-49ff-aae0-d6109c46873d"

async function fetchData(table: string, userId: string, column = "customer_id") {
  const supabase = createDirectClient()
  try {
    const { data, error } = await supabase.from(table).select("*").eq(column, userId)
    if (error) {
      console.error(`[retell-context] Error fetching ${table}:`, error.message)
      return []
    }
    return data || []
  } catch (err) {
    console.error(`[retell-context] Exception fetching ${table}:`, err)
    return []
  }
}

function toNumber(value: any) {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}

function extractUserMessage(body: any): string | null {
  return (
    body?.user_message ||
    body?.message?.content ||
    body?.transcript ||
    body?.userMessage ||
    body?.last_user_message ||
    body?.question ||
    body?.query ||
    body?.input ||
    body?.args?.user_message ||
    body?.args?.userMessage ||
    body?.args?.last_user_message ||
    body?.args?.question ||
    body?.args?.query ||
    body?.dynamic_variables?.user_message ||
    body?.dynamicVariables?.user_message ||
    body?.metadata?.user_message ||
    null
  )
}

function extractConversationHistory(body: any): string | null {
  return (
    body?.conversation_history ||
    body?.conversationHistory ||
    body?.conversation?.history ||
    body?.args?.conversation_history ||
    body?.args?.conversationHistory ||
    body?.args?.conversation?.history ||
    body?.dynamic_variables?.conversation_history ||
    body?.dynamicVariables?.conversation_history ||
    body?.metadata?.conversation_history ||
    null
  )
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const userMessage = extractUserMessage(body)
    const conversationHistory = extractConversationHistory(body)
    const callId =
      body?.call_id ||
      body?.callId ||
      body?.conversation_id ||
      body?.args?.call_id ||
      body?.args?.callId ||
      body?.metadata?.call_id ||
      body?.metadata?.callId ||
      null
    const currentPage =
      body?.current_page ||
      body?.currentPage ||
      body?.args?.currentPage ||
      body?.args?.current_page ||
      body?.metadata?.current_page ||
      body?.metadata?.currentPage ||
      "/home"

    const userId = SARAH_VOICE_USER_ID

    const accounts = await fetchData("accounts", userId)
    const accountIds = accounts.map((account: any) => account.id)

    const [cards, loans, holdings, goals] = await Promise.all([
      fetchData("cards", userId),
      fetchData("loans", userId),
      fetchData("portfolio_holdings", userId),
      fetchData("savings_goals", userId),
    ])

    let transactions: any[] = []
    if (accountIds.length > 0) {
      const supabase = createDirectClient()
      const sixtyDaysAgo = new Date()
      sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60)

      const { data: txData, error: txError } = await supabase
        .from("transactions")
        .select("*")
        .in("account_id", accountIds)
        .gte("date", sixtyDaysAgo.toISOString())
        .order("date", { ascending: false })

      if (!txError && txData) {
        transactions = txData
      } else if (txError) {
        console.error("[retell-context] Error fetching transactions:", txError.message)
      }
    }

    const now = new Date()
    const thirtyDaysAgo = new Date(now)
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const txLast30Days = transactions.filter((tx: any) => {
      const txDate = new Date(tx.date)
      return !Number.isNaN(txDate.getTime()) && txDate >= thirtyDaysAgo
    })

    const spendingTxLast30Days = txLast30Days.filter((tx: any) => tx.type === "debit")
    const monthlySpending = spendingTxLast30Days.reduce(
      (sum: number, tx: any) => sum + Math.abs(toNumber(tx.amount)),
      0,
    )

    const incomeTxLast30Days = txLast30Days.filter((tx: any) => tx.type === "credit")
    const monthlyIncome = incomeTxLast30Days.reduce(
      (sum: number, tx: any) => sum + Math.abs(toNumber(tx.amount)),
      0,
    )

    const totalBalance = accounts.reduce((sum: number, account: any) => {
      const balance = toNumber(account.balance)
      const rate = account.currency === "USD" ? 3.67 : 1
      return sum + (balance * rate)
    }, 0)

    const availableCash = accounts.reduce((sum: number, account: any) => {
      const balance = toNumber(account.available_balance ?? account.balance)
      const rate = account.currency === "USD" ? 3.67 : 1
      return sum + (balance * rate)
    }, 0)

    const recentTransactions = transactions.slice(0, 10).map((tx: any) => ({
      date: tx.date,
      description: tx.description,
      amount: toNumber(tx.amount),
      type: tx.type,
      category: tx.category,
      isUnusual: tx.is_unusual,
      unusualReason: tx.unusual_reason,
    }))

    return NextResponse.json({
      conversation_context: {
        call_id: callId,
        user_message: userMessage,
        current_page: currentPage,
        conversation_history: conversationHistory,
      },
      supabase_context: {
        user_id: userId,
        totals: {
          total_balance_aed: Number(totalBalance.toFixed(2)),
          available_cash_aed: Number(availableCash.toFixed(2)),
          monthly_spending_aed: Number(monthlySpending.toFixed(2)),
          monthly_income_aed: Number(monthlyIncome.toFixed(2)),
        },
        accounts,
        cards,
        loans,
        holdings,
        goals,
        recent_transactions: recentTransactions,
      },
    })
  } catch (error: any) {
    console.error("[retell-context] Error:", error)
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 },
    )
  }
}
