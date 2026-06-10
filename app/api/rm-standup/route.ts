import { streamText } from "ai"
import { claudeFast, isClaudeConfigured } from "@/lib/ai/claude"
import { DEFAULT_MARKET, MARKET_CONFIG, isMarket, type Market } from "@/lib/markets"
import { buildMarketContext } from "@/lib/ai/market-context"
import { buildFocusDirective, type FocusInput } from "@/lib/ai/focus-directive"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type BriefClient = {
  name: string
  category?: string
  churnScore?: number
  topConcern?: string | null
  action?: string
  opportunityValue?: number
  aumAtRiskValue?: number
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const market: Market = isMarket(body.market) ? body.market : DEFAULT_MARKET
    const marketCfg = MARKET_CONFIG[market]
    const focusLabel: string = typeof body.focusLabel === "string" ? body.focusLabel : "Balanced"
    const focus: FocusInput = { ...(body.focus ?? {}), label: focusLabel }
    const focusDirective = buildFocusDirective(focus)
    const clients: BriefClient[] = Array.isArray(body.clients) ? body.clients.slice(0, 4) : []

    if (clients.length === 0) {
      return Response.json({ error: "No clients provided" }, { status: 400 })
    }
    if (!isClaudeConfigured()) {
      return Response.json({ error: "Missing CLAUDE_API_KEY" }, { status: 500 })
    }

    const fmt = (n?: number) =>
      typeof n === "number" && n > 0
        ? `${marketCfg.currency} ${n.toLocaleString("en", { maximumFractionDigits: 0 })}`
        : null

    const lines = clients.map((c, i) => {
      const bits = [
        `${i + 1}. ${c.name}${c.category ? ` (${c.category})` : ""}`,
        c.churnScore && c.churnScore >= 40 ? `churn risk ${c.churnScore}/100` : null,
        c.topConcern ? `concern: ${c.topConcern}` : null,
        c.action ? `suggested action: ${c.action}` : null,
        fmt(c.aumAtRiskValue) ? `AUM at risk: ${fmt(c.aumAtRiskValue)}` : null,
        fmt(c.opportunityValue) ? `opportunity: ${fmt(c.opportunityValue)}` : null,
      ].filter(Boolean)
      return bits.join(" · ")
    })

    const systemPrompt = `${buildMarketContext(market)}

${focusDirective}

You are a sharp chief-of-staff AI giving a relationship manager their morning stand-up briefing. This text will be READ ALOUD, so:
- Write in spoken, second-person prose ("Good morning. Your top priority today is…").
- NO markdown, NO bullet symbols, NO headers — just natural sentences and short paragraphs.
- The clients below are ALREADY ranked by the RM's focus settings above — keep that order and let the focus shape how you frame each one (e.g. lead with the SME working-capital angle in an SME-focus week, the retention angle in a churn week).
- Open with one summary sentence that names this week's focus, then cover the top 3 clients in order. One or two crisp sentences each: who, why now, and the single action to take. Mention a money figure when it sharpens the point.
- Close with a one-line nudge.
- Keep it tight: 110–160 words total. Confident, warm, efficient. Never invent names or numbers beyond what's provided.`

    const userPrompt = `This week's focus: ${focusLabel}.
Today's ranked priority clients (already ordered by the focus settings):
${lines.join("\n")}

Give me my morning briefing.`

    const result = await streamText({
      model: claudeFast(),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.5,
      maxTokens: 400,
    })

    return result.toTextStreamResponse({
      headers: {
        "Cache-Control": "no-store, no-transform",
        "X-Accel-Buffering": "no",
      },
    })
  } catch (error: any) {
    console.error("[RM Standup] Error:", error)
    return Response.json({ error: error?.message || "Internal Server Error" }, { status: 500 })
  }
}
