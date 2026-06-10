import { createDirectClient } from "@/lib/supabase/direct-client"
import { DEFAULT_MARKET, MARKET_CONFIG, isMarket, type Market } from "@/lib/markets"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Default RM for the demo (Peter Mwangi). Scopes the lookup to this RM's book
// so the tool can't fetch arbitrary clients.
const DEFAULT_RM = "11ce0003-0003-4003-a003-000000000003"

function authorised(req: Request): boolean {
  const need = process.env.ATLAS_VOICE_SECRET
  if (!need) return true
  return req.headers.get("x-atlas-secret") === need
}

/**
 * ElevenLabs server tool: `get_client_detail`.
 *
 * The voice agent calls this when it needs ONE client's deep detail (recent
 * transactions, support tickets with threads, call-centre history) beyond the
 * book summary it already has. Looks the client up by (fuzzy) name within the
 * RM's own book and returns a compact JSON the model can speak from.
 *
 * Accepts the client name via JSON body `{ name }` (POST) or `?name=` (GET) so
 * it works however you configure the tool in ElevenLabs.
 */
async function handle(req: Request, name: string | null) {
  if (!authorised(req)) return new Response("Unauthorized", { status: 401 })

  const url = new URL(req.url)
  const market: Market = isMarket(url.searchParams.get("market")) ? (url.searchParams.get("market") as Market) : DEFAULT_MARKET
  const rmId = url.searchParams.get("rmId") || DEFAULT_RM
  const cfg = MARKET_CONFIG[market]

  if (!name || !name.trim()) {
    return Response.json({ found: false, message: "Please provide a client name." })
  }

  const supabase = createDirectClient()
  const { data: matches } = await supabase
    .from("profiles")
    .select("id, full_name, segment, kyc_status, phone, created_at")
    .eq("assigned_rm_id", rmId)
    .eq("market", market)
    .ilike("full_name", `%${name.trim()}%`)
    .limit(3)

  if (!matches || matches.length === 0) {
    return Response.json({ found: false, message: `No client named "${name}" in your book.` })
  }
  if (matches.length > 1) {
    return Response.json({
      found: false,
      message: `Several clients match "${name}". Which one?`,
      options: matches.map((m: any) => m.full_name),
    })
  }

  const p: any = matches[0]
  const num = (v: any) => (Number.isFinite(Number(v)) ? Number(v) : 0)

  const [{ data: accounts }, { data: cards }, { data: loans }] = await Promise.all([
    supabase.from("accounts").select("id, name, type, currency, balance, status").eq("customer_id", p.id),
    supabase.from("cards").select("type, brand, last_four, status, credit_limit, spent_amount").eq("customer_id", p.id),
    supabase.from("loans").select("type, principal_amount, remaining_balance, interest_rate, status, next_payment_date").eq("customer_id", p.id),
  ])

  const acctIds = (accounts ?? []).map((a: any) => a.id)
  let transactions: any[] = []
  if (acctIds.length) {
    const { data } = await supabase
      .from("transactions")
      .select("date, description, amount, type, category, is_unusual, unusual_reason")
      .in("account_id", acctIds)
      .order("date", { ascending: false })
      .limit(12)
    transactions = data ?? []
  }

  const { data: tickets } = await supabase
    .from("support_tickets")
    .select("id, subject, status, priority, created_at")
    .eq("user_id", p.id)
    .order("created_at", { ascending: false })
    .limit(6)
  const ticketIds = (tickets ?? []).map((t: any) => t.id)
  let ticketMsgs: any[] = []
  if (ticketIds.length) {
    const { data } = await supabase
      .from("support_messages")
      .select("ticket_id, sender_type, content, created_at")
      .in("ticket_id", ticketIds)
      .order("created_at", { ascending: true })
    ticketMsgs = data ?? []
  }

  let calls: any[] = []
  try {
    const { createCallCenterClient } = await import("@/lib/supabase/call-center-client")
    const cc = createCallCenterClient()
    const { data: convos } = await cc
      .from("conversations")
      .select("id, subject, channel, status, sentiment, created_at")
      .eq("customer_id", p.id)
      .order("created_at", { ascending: false })
      .limit(6)
    const convIds = (convos ?? []).map((c: any) => c.id)
    let msgs: any[] = []
    if (convIds.length) {
      const { data } = await cc
        .from("messages")
        .select("conversation_id, sender_type, content, created_at")
        .in("conversation_id", convIds)
        .order("created_at", { ascending: true })
      msgs = data ?? []
    }
    calls = (convos ?? []).map((c: any) => ({
      subject: c.subject,
      channel: c.channel,
      status: c.status,
      sentiment: c.sentiment,
      messages: msgs.filter((m: any) => m.conversation_id === c.id).map((m: any) => ({ from: m.sender_type, text: m.content })),
    }))
  } catch {
    // call centre is best-effort
  }

  const totalBalance = (accounts ?? []).reduce(
    (s: number, a: any) => s + num(a.balance) * (a.currency === "USD" ? cfg.usdToHomeRate : 1),
    0,
  )

  return Response.json({
    found: true,
    client: {
      name: p.full_name,
      segment: p.segment,
      kyc: p.kyc_status,
      phone: p.phone,
      clientSince: p.created_at ? new Date(p.created_at).toISOString().slice(0, 10) : null,
      totalBalanceKES: Math.round(totalBalance),
      accounts: (accounts ?? []).map((a: any) => ({ name: a.name, type: a.type, currency: a.currency, balance: num(a.balance), status: a.status })),
      cards: (cards ?? []).map((c: any) => ({ type: c.type, brand: c.brand, last_four: c.last_four, status: c.status })),
      loans: (loans ?? []).map((l: any) => ({ type: l.type, principal: num(l.principal_amount), remaining: num(l.remaining_balance), rate: l.interest_rate, status: l.status, nextPayment: l.next_payment_date })),
      recentTransactions: transactions.map((t: any) => ({ date: t.date, description: t.description, amount: num(t.amount), type: t.type, category: t.category, unusual: t.is_unusual ? t.unusual_reason : undefined })),
      supportTickets: (tickets ?? []).map((t: any) => ({
        subject: t.subject,
        status: t.status,
        priority: t.priority,
        thread: ticketMsgs.filter((m: any) => m.ticket_id === t.id).map((m: any) => ({ from: m.sender_type, text: m.content })),
      })),
      calls,
    },
  })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any))
  const name = typeof body?.name === "string" ? body.name : typeof body?.client_name === "string" ? body.client_name : null
  return handle(req, name)
}

export async function GET(req: Request) {
  const name = new URL(req.url).searchParams.get("name")
  return handle(req, name)
}
