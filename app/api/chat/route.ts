import { OpenAI } from "openai"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { createClient } from "@/lib/supabase/server"

// Set the runtime to nodejs for better compatibility
export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { messages, userId: requestedUserId } = await req.json()

    // Initialize OpenAI client
    if (!process.env.OPENAI_API_KEY) {
      console.error("Missing OPENAI_API_KEY")
      return new Response("Missing OPENAI_API_KEY", { status: 500 })
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Get the current user
    const supabase = await createClient()
    
    // Determine userId:
    // 1. Try auth (if logged in)
    // 2. Use requestedUserId (from client, e.g. role switcher)
    // 3. Fallback to demo default
    
    let userId = "11111111-1111-1111-1111-111111111111" // Default to Sarah Chen for demo
    
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      userId = user.id
    } else if (requestedUserId) {
        userId = requestedUserId
    }

    // Fetch user's financial data for context
    const [accounts, cards, loans, transactions, holdings, goals, rewardProfile, rewardActivities] = await Promise.all([
      supabase.from("accounts").select("*").eq("user_id", userId),
      supabase.from("cards").select("*").eq("user_id", userId),
      supabase.from("loans").select("*").eq("user_id", userId),
      supabase.from("transactions").select("*").eq("user_id", userId).order("date", { ascending: false }).limit(10),
      supabase.from("portfolio_holdings").select("*").eq("user_id", userId),
      supabase.from("savings_goals").select("*").eq("user_id", userId),
      supabase.from("reward_profiles").select("*").eq("user_id", userId).single(),
      supabase.from("reward_activities").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(5),
    ])

    // Construct the system prompt with context
    const systemPrompt = `
  You are an AI Banker Assistant for "Bank of the Future". You have access to the user's financial data.
  Your goal is to provide helpful, accurate, and concise financial advice and answer questions about their accounts.

  User Context:
  - ID: ${userId}

  Financial Data:
  1. ACCOUNTS:
  ${JSON.stringify(accounts.data, null, 2)}

  2. CARDS:
  ${JSON.stringify(cards.data, null, 2)}

  3. LOANS:
  ${JSON.stringify(loans.data, null, 2)}

  4. RECENT TRANSACTIONS (Last 10):
  ${JSON.stringify(transactions.data, null, 2)}

  5. INVESTMENT PORTFOLIO:
  ${JSON.stringify(holdings.data, null, 2)}

  6. SAVINGS GOALS:
  ${JSON.stringify(goals.data, null, 2)}
  
  7. REWARDS & POINTS:
  - Profile: ${JSON.stringify(rewardProfile.data, null, 2)}
  - Recent Activity: ${JSON.stringify(rewardActivities.data, null, 2)}

  Guidelines:
  - Be professional yet friendly.
  - Use the provided data to answer questions specifically. e.g., "Your current balance in your Primary Account is AED 45,000".
  - If the user asks about something not in the data, explain that you don't have that information.
  - Do NOT make up transaction data that isn't there.
  - Format currency appropriately (e.g., AED 1,000.00).
  - If the user asks to perform an action (like transfer money), guide them on how to do it or say "I can help you prepare a transfer" (in a real app you'd call a function).
  - Keep responses concise.
  
   Formatting Guidelines:
  - Use Markdown for formatting.
  - Do NOT use double asterisks (**) for bolding headers or lists if it clutters the view. Instead, use clean spacing and indentation.
  - For lists of items (like transactions or portfolio holdings), follow this clean format:
  
    1. Item Name
       - Detail: Value
       - Detail: Value
  
  - Avoid excessive bolding within sentences. Use it only for key figures if absolutely necessary.
  `

    // Request the OpenAI API for the response based on the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      stream: true,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    })

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response as any)

    // Respond with the stream
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error("Error in chat route:", error)
    return new Response(error instanceof Error ? error.message : "Internal Server Error", { status: 500 })
  }
}
