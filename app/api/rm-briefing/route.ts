import { isClaudeConfigured } from "@/lib/ai/claude"
import { DEFAULT_MARKET, isMarket, type Market } from "@/lib/markets"
import { generateBriefingForClient } from "@/lib/rm/briefing-generator"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    // Parse body defensively — aborted/cancelled client requests can arrive
    // with an empty body and `req.json()` would throw a noisy SyntaxError.
    let body: { clientId?: unknown; market?: unknown } = {}
    try {
      body = await req.json()
    } catch {
      return Response.json({ error: "Empty or invalid request body" }, { status: 400 })
    }
    const { clientId } = body

    if (!clientId || typeof clientId !== "string") {
      return Response.json({ error: "Missing or invalid clientId" }, { status: 400 })
    }

    // Default to UAE if the client didn't send a market — keeps legacy callers working.
    const market: Market = isMarket(body.market) ? body.market : DEFAULT_MARKET

    if (!isClaudeConfigured()) {
      return Response.json({ error: "Missing CLAUDE_API_KEY" }, { status: 500 })
    }

    try {
      const briefing = await generateBriefingForClient(clientId, market)
      return Response.json(briefing, { status: 200 })
    } catch (aiErr: any) {
      // Profile-not-found surfaces here too; the original copy used 404 for
      // that case so we preserve it.
      const message = String(aiErr?.message ?? aiErr)
      if (message.toLowerCase().includes("client not found")) {
        return Response.json({ error: message }, { status: 404 })
      }
      console.error("[RM Briefing] generation failed:", aiErr)
      return Response.json({ error: message || "AI generation failed" }, { status: 502 })
    }
  } catch (error: any) {
    console.error("[RM Briefing] Error:", error)
    return Response.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 },
    )
  }
}
