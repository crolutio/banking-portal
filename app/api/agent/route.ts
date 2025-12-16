import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { createDirectClient } from "@/lib/supabase/direct-client"
import {
  getAccountsOverview,
  getRecentTransactions,
  analyzeSpending,
  analyzeLoanPreapprovalForUser,
} from "@/lib/agent/tools"

export const runtime = "nodejs"

// Helper to safely fetch data from any Supabase table
async function fetchData(table: string, userId: string, column = "user_id") {
  const supabase = createDirectClient()
  try {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq(column, userId)
    
    if (error) {
      console.error(`[agent] Error fetching ${table}:`, error.message)
      return []
    }
    return data || []
  } catch (err) {
    console.error(`[agent] Exception fetching ${table}:`, err)
    return []
  }
}

type ToolCall = {
  name: string
  args?: Record<string, any>
}

function stripJson(text: string): string {
  // Remove possible code fences and surrounding text
  const jsonMatch = text.match(/```json([\s\S]*?)```/i)
  if (jsonMatch) return jsonMatch[1].trim()
  const braceIndex = text.indexOf("{")
  if (braceIndex >= 0) {
    const lastBrace = text.lastIndexOf("}")
    if (lastBrace > braceIndex) {
      return text.slice(braceIndex, lastBrace + 1)
    }
  }
  return text.trim()
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Log the full request for debugging
    console.log("[agent] Full request body:", JSON.stringify(body, null, 2))
    
    // Handle Vapi tool call format OR direct API call format
    // Vapi sends: { message: { content: "..." }, userId: "...", ... }
    // Direct API sends: { question: "...", userId: "...", ... }
    const question = body.message?.content || 
                     body.transcript || 
                     body.userMessage || 
                     body.question ||
                     body.query ||
                     body.input
    
    // Handle userId - Vapi might send "me" or other placeholders
    let requestedUserId = body.userId || 
                         body.user?.id || 
                         body.variables?.userId ||
                         body.requestedUserId
    
    // Map Vapi placeholders to actual user ID
    if (requestedUserId === "me" || requestedUserId === "user" || !requestedUserId) {
      requestedUserId = "11111111-1111-1111-1111-111111111111"
    }
    
    // Also check tool call args for userId
    if (body.message?.toolCalls?.[0]?.function?.arguments) {
      try {
        const args = typeof body.message.toolCalls[0].function.arguments === 'string' 
          ? JSON.parse(body.message.toolCalls[0].function.arguments)
          : body.message.toolCalls[0].function.arguments
        if (args.userId && args.userId !== "me" && args.userId !== "user") {
          requestedUserId = args.userId
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }
    
    const agentId = body.agentId || "banker"
    const currentPage = body.currentPage || "/home"
    const toolCall = body.message?.toolCalls?.[0] // Store for response formatting

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Missing 'question' string" }, { status: 400 })
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json(
        { error: "Missing GOOGLE_GENERATIVE_AI_API_KEY" },
        { status: 500 },
      )
    }

    const userId = requestedUserId || "11111111-1111-1111-1111-111111111111"
    
    console.log("[agent] Request received:", {
      question,
      requestedUserId,
      userId,
      agentId,
      currentPage,
    })

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemma-3-27b-it" })

    // -----------------------------------------------------------------------
    // 1) FETCH ALL DATA (like the chat agent does)
    // -----------------------------------------------------------------------
    console.log(`[agent] Fetching all data for user: ${userId}`)
    
    // Fetch Accounts first (needed for transactions)
    const accounts = await fetchData("accounts", userId)
    const accountIds = accounts.map((a: any) => a.id)
    
    // Fetch other data in parallel
    const [
      cards,
      loans,
      holdings,
      watchlist,
      goals,
      rewardProfileResult,
      rewardActivities,
      supportTickets
    ] = await Promise.all([
      fetchData("cards", userId),
      fetchData("loans", userId),
      fetchData("portfolio_holdings", userId),
      fetchData("watchlist", userId),
      fetchData("savings_goals", userId),
      fetchData("reward_profiles", userId),
      fetchData("reward_activities", userId),
      fetchData("support_tickets", userId)
    ])

    // Fetch Transactions (using account IDs)
    let transactions: any[] = []
    if (accountIds.length > 0) {
      const supabase = createDirectClient()
      const { data: txData, error: txError } = await supabase
        .from("transactions")
        .select("*")
        .in("account_id", accountIds)
        .order("date", { ascending: false })
      
      if (!txError && txData) {
        transactions = txData
      } else if (txError) {
        console.error("[agent] Error fetching transactions:", txError.message)
      }
    }

    // Fetch Goal Transactions
    let goalTransactions: any[] = []
    const goalIds = goals.map((g: any) => g.id)
    if (goalIds.length > 0) {
      const supabase = createDirectClient()
      const { data: gTxData, error: gTxError } = await supabase
        .from("savings_goal_transactions")
        .select("*")
        .in("goal_id", goalIds)
        .order("date", { ascending: false })
        
      if (!gTxError && gTxData) {
        goalTransactions = gTxData
      }
    }

    const rewardProfile = rewardProfileResult.length > 0 ? rewardProfileResult[0] : null

    console.log(`[agent] Data fetched: Accounts=${accounts.length}, Tx=${transactions.length}, Cards=${cards.length}, Loans=${loans.length}, Holdings=${holdings.length}, Goals=${goals.length}`)

    // -----------------------------------------------------------------------
    // 2) GENERATE ANSWER WITH GEMINI (using all the data)
    // -----------------------------------------------------------------------
    // Generate answer using Gemini with all the data (like chat agent does)
    const systemPrompt = `
You are the "Bank of the Future" AI banking assistant speaking to a user via voice.

User ID: ${userId}
Agent persona: ${agentId}
Current page: ${currentPage}

You have access to the user's complete financial data. Answer their question using ONLY the data provided below.

FINANCIAL DATA:

1. ACCOUNTS:
${JSON.stringify(accounts.map((a: any) => ({ id: a.id, name: a.name, type: a.type, balance: a.balance, available_balance: a.available_balance, currency: a.currency })))}

2. CARDS:
${JSON.stringify(cards.map((c: any) => ({ id: c.id, type: c.type, last4: c.last4, expiry: c.expiry, status: c.status, limit: c.limit })))}

3. LOANS:
${JSON.stringify(loans.map((l: any) => ({ id: l.id, type: l.type, amount: l.amount, remaining: l.remaining, interest_rate: l.interest_rate, monthly_payment: l.monthly_payment, status: l.status })))}

4. RECENT TRANSACTIONS (Last 50 of ${transactions.length}):
${JSON.stringify(transactions.slice(0, 50).map((tx: any) => ({ date: tx.date, description: tx.description, amount: tx.amount, type: tx.type, category: tx.category, is_unusual: tx.is_unusual, unusual_reason: tx.unusual_reason })))}

5. INVESTMENT PORTFOLIO:
${JSON.stringify(holdings.map((h: any) => ({ symbol: h.symbol, name: h.name, quantity: h.quantity, current_price: h.current_price, total_value: h.total_value })))}

6. SAVINGS GOALS:
${JSON.stringify(goals.map((g: any) => ({ id: g.id, name: g.name, target: g.target, current: g.current, deadline: g.deadline, status: g.status })))}

7. REWARDS:
- Profile: ${JSON.stringify(rewardProfile ? { tier: rewardProfile.tier, points: rewardProfile.points, next_tier: rewardProfile.next_tier } : null)}
- Recent Activity: ${JSON.stringify(rewardActivities.slice(0, 5).map((a: any) => ({ date: a.date, description: a.description, points: a.points })))}

8. SUPPORT TICKETS:
${JSON.stringify(supportTickets.slice(0, 5).map((t: any) => ({ id: t.id, subject: t.subject, status: t.status, created_at: t.created_at })))}

GUIDELINES:
- Answer based ONLY on the provided data.
- Provide a SHORT, concise answer (1-3 sentences maximum) for voice interaction.
- Keep it brief to avoid long pauses.
- Format currency as "AED X,XXX" (no decimals for voice).
- If asked about something not in the data, say you don't have that information.
- Transaction types: "credit" = income/deposits, "debit" = spending/withdrawals.
- Current Date: ${new Date().toISOString().split('T')[0]}
- Be professional but friendly.
- DO NOT include markdown, bullet points, or code blocks. Plain text sentences only.
`

    const answerResult = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nThe user asked: "${question}"\n\nProvide a short answer (1-3 sentences):` }],
        },
      ],
    })

    const answer = answerResult.response.text()

    // Detect if this is a Vapi request
    // Vapi API Request tool sends: { question, userId, ... } or { message: { toolCalls: [...] } }
    const isVapiRequest = !!(
      body.message?.toolCalls || 
      toolCall || 
      body.toolCallId ||
      body.function?.name || // Custom tool format
      (body.question && !body.agentId) // Has question but no agentId (likely Vapi)
    )
    
    console.log("[agent] Response format check:", {
      isVapiRequest,
      hasToolCall: !!toolCall,
      toolCallId: toolCall?.id || body.toolCallId,
      bodyKeys: Object.keys(body)
    })
    
    // Handle Vapi tool call response format (if request came from Vapi)
    if (isVapiRequest && toolCall?.id) {
      // Vapi expects this format for tool calls
      return NextResponse.json({
        results: [
          {
            toolCallId: toolCall.id,
            result: answer
          }
        ]
      })
    } else if (isVapiRequest && body.toolCallId) {
      // Alternative Vapi format
      return NextResponse.json({
        results: [
          {
            toolCallId: body.toolCallId,
            result: answer
          }
        ]
      })
    } else if (isVapiRequest) {
      // Vapi request but no toolCallId - return just the result
      // This handles API Request tool format
      return NextResponse.json({
        result: answer
      })
    }

    // Standard API response format (for Next.js chat interface)
    return NextResponse.json({ answer })
  } catch (error: any) {
    console.error("[agent] Error:", error)
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 },
    )
  }
}


