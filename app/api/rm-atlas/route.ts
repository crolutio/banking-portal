import { streamText, type CoreMessage } from "ai"
import { claudeFast, isClaudeConfigured } from "@/lib/ai/claude"
import { DEFAULT_MARKET, MARKET_CONFIG, isMarket, type Market } from "@/lib/markets"
import { buildMarketContext } from "@/lib/ai/market-context"
import { buildFocusDirective, type FocusInput } from "@/lib/ai/focus-directive"
import { buildBookSummary, formatBookContext } from "@/lib/rm/book-summary"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const STREAM_HEADERS = {
  "Cache-Control": "no-store, no-transform",
  "X-Accel-Buffering": "no",
} as const

/**
 * Atlas (text) — the RM's whole-book AI. Answers questions across the RM's
 * ENTIRE book (not one client). The portfolio summary is built by the shared
 * `buildBookSummary` so the voice path (/api/atlas-voice/*) stays identical.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages, rmId } = body
    const market: Market = isMarket(body.market) ? body.market : DEFAULT_MARKET
    const marketCfg = MARKET_CONFIG[market]
    const focusDirective = buildFocusDirective(body.focus as FocusInput | undefined)

    if (!isClaudeConfigured()) return new Response("Missing CLAUDE_API_KEY", { status: 500 })
    if (!rmId || typeof rmId !== "string") return new Response("Missing rmId", { status: 400 })

    const { book, totals } = await buildBookSummary(rmId, market)
    if (book.length === 0) return new Response("No clients assigned to this RM.", { status: 404 })

    const systemPrompt = `${buildMarketContext(market)}

${focusDirective}

You are Atlas, the whole-book AI for a Relationship Manager at AIdeology Bank. Unlike a single-client assistant, you can see the RM's ENTIRE book and reason across all clients at once.

You are a sharp, analytical colleague — never a customer-facing chatbot. Be concise and action-oriented.

${formatBookContext(book, totals, market)}

GUIDELINES:
- Answer using ONLY the book data above. Never invent clients, numbers, or facts. If something isn't in the data, say so.
- When you name clients, sort by relevance to the question (e.g. churn for "who's leaving", opportunity for "where's the revenue") and HONOUR the RM focus settings above when ranking.
- Always cite concrete evidence: the churn score, the signal, the ${marketCfg.currency} figure, the open ticket subject.
- If asked to draft outreach, write a ready-to-send message grounded in that client's signals.
- Use markdown: **bold** for names/numbers, numbered lists for actions, tables when comparing clients. Keep it tight.
- Today's date: ${new Date().toISOString().split("T")[0]}.`

    const recent: CoreMessage[] = (messages ?? [])
      .slice(-10)
      .map((m: any) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content }))

    const result = await streamText({
      model: claudeFast(),
      system: systemPrompt,
      messages: recent,
      temperature: 0.4,
    })

    return result.toDataStreamResponse({ headers: STREAM_HEADERS })
  } catch (error: any) {
    console.error("[Atlas] Error:", error)
    return new Response(error?.message || "Internal Server Error", { status: 500 })
  }
}
