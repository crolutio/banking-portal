import { z } from "zod"
import { generateObjectWithFallback, isClaudeConfigured } from "@/lib/ai/claude"
import { DEFAULT_MARKET, MARKET_CONFIG, isMarket, type Market } from "@/lib/markets"
import { buildMarketContext } from "@/lib/ai/market-context"
import { buildFocusDirective, type FocusInput } from "@/lib/ai/focus-directive"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const PlanSchema = z.object({
  summary: z.string().describe("One or two warm, spoken sentences framing the RM's day and this week's focus."),
  items: z
    .array(
      z.object({
        clientName: z.string().describe("Must exactly match one of the provided client names, in the same order."),
        channel: z.enum(["call", "whatsapp", "email", "sms", "in_person"]),
        bestTime: z.string().describe("A short human time hint, e.g. '9:00 AM', 'Mid-morning', 'After lunch'."),
        headline: z.string().describe("One-line objective for this touch."),
        talkingPoints: z.array(z.string()).describe("2-3 concrete, data-grounded talking points."),
      }),
    )
    .describe("One entry per provided client, in the SAME order."),
})

type InClient = {
  name: string
  category?: string
  churnScore?: number
  topConcern?: string | null
  action?: string
  opportunityValue?: number
  aumAtRiskValue?: number
  openTickets?: number
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const market: Market = isMarket(body.market) ? body.market : DEFAULT_MARKET
    const marketCfg = MARKET_CONFIG[market]
    const focusLabel: string = typeof body.focusLabel === "string" ? body.focusLabel : "Balanced"
    const focusDirective = buildFocusDirective({ ...(body.focus ?? {}), label: focusLabel } as FocusInput)
    const clients: InClient[] = Array.isArray(body.clients) ? body.clients.slice(0, 8) : []

    if (clients.length === 0) return Response.json({ error: "No clients provided" }, { status: 400 })
    if (!isClaudeConfigured()) return Response.json({ error: "Missing CLAUDE_API_KEY" }, { status: 500 })

    const fmt = (n?: number) =>
      typeof n === "number" && n > 0
        ? `${marketCfg.currency} ${n.toLocaleString("en", { maximumFractionDigits: 0 })}`
        : null

    const lines = clients.map((c, i) => {
      const bits = [
        `${i + 1}. ${c.name}${c.category ? ` (${c.category})` : ""}`,
        c.churnScore && c.churnScore >= 40 ? `churn ${c.churnScore}/100` : null,
        c.topConcern ? `concern: ${c.topConcern}` : null,
        c.action ? `suggested action: ${c.action}` : null,
        c.openTickets ? `${c.openTickets} open request(s)` : null,
        fmt(c.aumAtRiskValue) ? `AUM at risk ${fmt(c.aumAtRiskValue)}` : null,
        fmt(c.opportunityValue) ? `opportunity ${fmt(c.opportunityValue)}` : null,
      ].filter(Boolean)
      return bits.join(" · ")
    })

    const system = `${buildMarketContext(market)}

${focusDirective}

You are a chief-of-staff AI building a Relationship Manager's plan for TODAY. You are given their priority clients ALREADY RANKED (most important first). Produce one plan entry per client, in the SAME order, that the RM can act on immediately.

Rules:
- Keep the order exactly as given; echo each client's name exactly.
- Choose the channel that fits the situation: a 'call' for flight-risk or sensitive cases, 'whatsapp'/'email' for opportunities and check-ins, 'in_person' only for the highest-value relationships.
- Stagger bestTime sensibly through a working day (start ~9:00 AM); put urgent retention calls early.
- Talking points must be specific to the client's concern/opportunity and reference a money figure where useful. Never invent facts beyond what's provided.
- Keep talking points crisp (max ~15 words each).`

    const prompt = `This week's focus: ${focusLabel}.
Priority clients for today (ranked):
${lines.join("\n")}

Build my plan for today.`

    const { object } = await generateObjectWithFallback(
      { schema: PlanSchema, system, prompt, temperature: 0.5 },
      "[RM Day Plan]",
    )

    return Response.json(object, { headers: { "Cache-Control": "no-store" } })
  } catch (error: any) {
    console.error("[RM Day Plan] Error:", error)
    return Response.json({ error: error?.message || "Internal Server Error" }, { status: 500 })
  }
}
