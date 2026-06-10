import { streamText } from "ai"
import { claudeFast, isClaudeConfigured } from "@/lib/ai/claude"
import { createDirectClient } from "@/lib/supabase/direct-client"
import { DEFAULT_MARKET, MARKET_CONFIG, isMarket, type Market } from "@/lib/markets"
import { buildMarketContext } from "@/lib/ai/market-context"
import { buildFocusDirective, type FocusInput } from "@/lib/ai/focus-directive"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Channel = "email" | "sms" | "whatsapp"
type Tone = "warm" | "direct" | "formal"

const CHANNEL_RULES: Record<Channel, string> = {
  email: `Format as a complete business email:
  - First line: "Subject: <concise subject>"
  - Blank line
  - Greeting (e.g., "Dear <FirstName>,")
  - 2–4 short paragraphs
  - Sign-off ("Warm regards," or similar) followed by the RM's first name placeholder "[Your name]"
  Length: 100–180 words.`,
  sms: `Format as a single SMS message:
  - No subject line, no greeting block
  - Plain text only, no markdown
  - Maximum ~200 characters (target ~160)
  - Include one call-to-action (reply, call back, click a link).`,
  whatsapp: `Format as a single WhatsApp chat message:
  - Casual conversational tone, like a banker who knows the client
  - 30–80 words
  - 1–2 short paragraphs separated by a single blank line
  - Light use of emoji is OK if it matches the tone (max 1 emoji)
  - End with a clear next step.`,
}

const TONE_RULES: Record<Tone, string> = {
  warm: "Warm and personal. Open with a personal acknowledgement (recent trip, milestone, or signal from their data). Empathetic, never salesy.",
  direct: "Direct and action-led. Skip pleasantries. State the opportunity, the value, and the next step in clear, short sentences.",
  formal: "Formal and professional. Use complete sentences, banking vocabulary, and respectful salutations. No contractions, no emoji.",
}

function safeNumber(v: any): number {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { clientId, opportunity, channel, tone } = body as {
      clientId?: string
      opportunity?: string
      channel?: Channel
      tone?: Tone
      market?: string
    }

    if (!clientId || typeof clientId !== "string") {
      return Response.json({ error: "Missing or invalid clientId" }, { status: 400 })
    }
    if (!opportunity || typeof opportunity !== "string") {
      return Response.json({ error: "Missing or invalid opportunity" }, { status: 400 })
    }
    const ch: Channel = channel === "sms" || channel === "whatsapp" ? channel : "email"
    const tn: Tone = tone === "direct" || tone === "formal" ? tone : "warm"
    const market: Market = isMarket(body.market) ? body.market : DEFAULT_MARKET
    const marketCfg = MARKET_CONFIG[market]
    const focusDirective = buildFocusDirective(body.focus as FocusInput | undefined)

    if (!isClaudeConfigured()) {
      return Response.json({ error: "Missing CLAUDE_API_KEY" }, { status: 500 })
    }

    const supabase = createDirectClient()
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", clientId)
      .single()
    if (profileErr || !profile) {
      return Response.json({ error: `Client not found: ${clientId}` }, { status: 404 })
    }

    const [{ data: accounts }, { data: loans }, { data: cards }] = await Promise.all([
      supabase.from("accounts").select("name, type, balance, currency").eq("customer_id", clientId),
      supabase
        .from("loans")
        .select("type, principal_amount, remaining_balance, interest_rate, status")
        .eq("customer_id", clientId),
      supabase
        .from("cards")
        .select("type, status, credit_limit, spent_amount")
        .eq("customer_id", clientId),
    ])

    const usdRate = marketCfg.usdToHomeRate
    const totalBalance = (accounts ?? []).reduce((s: number, a: any) => {
      const rate = a.currency === "USD" ? usdRate : 1
      return s + safeNumber(a.balance) * rate
    }, 0)

    const firstName = profile.full_name?.split(" ")?.[0] ?? "there"

    const systemPrompt = `${buildMarketContext(market)}
${focusDirective ? `\n${focusDirective}\n` : ""}
You are an AI assistant helping a Relationship Manager (RM) at AIdeology Bank draft a personalised outreach message to one of their clients.

You are drafting a ${ch.toUpperCase()} message with a ${tn.toUpperCase()} tone.

CHANNEL RULES:
${CHANNEL_RULES[ch]}

TONE RULES:
${TONE_RULES[tn]}

GENERAL RULES:
- Reference the specific opportunity provided. Tie it to something concrete you can see in the client's data (a recent travel signal, a card, a balance, an existing product).
- Where it fits naturally, angle the message to this week's RM focus (above) — but the specific opportunity is the priority; never force the focus if it doesn't fit this client.
- Never invent numbers, dates, or facts not in the data. If you need to reference a date, use a vague placeholder like "next week" or "soon".
- Do NOT include placeholder bracketed fields like [Phone] or [Branch] — write a finished, sendable message.
- Output ONLY the message body. No preamble like "Here is the draft:" or post-script commentary.

Today's date: ${new Date().toISOString().split("T")[0]}`

    const userPrompt = `CLIENT CONTEXT:
- Name: ${profile.full_name}
- First name (use this in greetings): ${firstName}
- Segment: ${profile.segment ?? "—"}
- Total balance: ${marketCfg.currency} ${totalBalance.toLocaleString("en", { maximumFractionDigits: 0 })}
- Active accounts: ${(accounts ?? []).length}
- Active loans: ${(loans ?? []).filter((l: any) => l.status === "active").length}
- Active cards: ${(cards ?? []).filter((c: any) => c.status === "active").length}

ACCOUNTS SUMMARY:
${JSON.stringify(accounts ?? [])}

LOANS SUMMARY:
${JSON.stringify(loans ?? [])}

CARDS SUMMARY:
${JSON.stringify(cards ?? [])}

OPPORTUNITY TO COMMUNICATE (this is the WHY for the outreach):
${opportunity}

Draft the ${ch} message now.`

    const result = await streamText({
      // Haiku 4.5 — outreach drafts stream noticeably faster; tone-shifted
      // prose is squarely in Haiku's wheelhouse. See lib/ai/claude.ts.
      model: claudeFast(),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.6,
      maxTokens: 600,
    })

    return result.toTextStreamResponse({
      headers: {
        "Cache-Control": "no-store, no-transform",
        "X-Accel-Buffering": "no",
      },
    })
  } catch (error: any) {
    console.error("[RM Draft Outreach] Error:", error)
    return Response.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 },
    )
  }
}
