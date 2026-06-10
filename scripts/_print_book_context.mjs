// Prints the exact portfolio_context block to paste into the ElevenLabs system
// prompt (static, for the demo). Mirrors lib/rm/book-summary.ts.
import { createClient } from "@supabase/supabase-js"
import { readFileSync, writeFileSync } from "node:fs"
const env = Object.fromEntries(
  readFileSync(new URL("../.env", import.meta.url), "utf8").split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, "")] }),
)
const bank = createClient(env.NEXT_PUBLIC_BANKING_SUPABASE_URL, env.NEXT_PUBLIC_BANKING_SUPABASE_PUBLISHABLE_DEFAULT_KEY, { auth: { persistSession: false } })
const cc = createClient(env.NEXT_PUBLIC_CALL_CENTER_SUPABASE_URL, env.NEXT_PUBLIC_CALL_CENTER_SUPABASE_PUBLISHABLE_DEFAULT_KEY ?? env.NEXT_PUBLIC_CALL_CENTER_ANON_KEY, { auth: { persistSession: false } })
const RM = "11ce0003-0003-4003-a003-000000000003"
const USD = 130
const CHURN_RE = /equity|competitor|external bank|another bank|redirect|closing|clos(e|ure)|migrat|churn|leav(e|ing)|cancel|unhappy|charges (are )?too|moving (my )?(funds|salary|account|money)/i
const num = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0)

const { data: profiles } = await bank.from("profiles").select("id, full_name, segment, kyc_status").eq("assigned_rm_id", RM).eq("market", "kenya")
const ids = profiles.map((p) => p.id)
const [{ data: accounts }, { data: loans }, { data: tickets }, { data: negConvos }] = await Promise.all([
  bank.from("accounts").select("id, customer_id, balance, currency, type").in("customer_id", ids),
  bank.from("loans").select("customer_id, type, status").in("customer_id", ids),
  bank.from("support_tickets").select("user_id, subject, status").in("user_id", ids).in("status", ["open", "in_progress"]),
  cc.from("conversations").select("customer_id, subject, sentiment").in("customer_id", ids).eq("sentiment", "negative"),
])
const acctToCust = new Map((accounts ?? []).map((a) => [a.id, a.customer_id]))
let unusual = []
const acctIds = (accounts ?? []).map((a) => a.id)
for (let i = 0; i < acctIds.length; i += 100) {
  const { data } = await bank.from("transactions").select("account_id, unusual_reason, description").eq("is_unusual", true).in("account_id", acctIds.slice(i, i + 100))
  unusual = unusual.concat(data ?? [])
}

const book = profiles.map((p) => {
  const my = (accounts ?? []).filter((a) => a.customer_id === p.id)
  const balance = my.reduce((s, a) => s + num(a.balance) * (a.currency === "USD" ? USD : 1), 0)
  const hasBiz = my.some((a) => a.type === "business") || (loans ?? []).some((l) => l.customer_id === p.id && l.type === "business")
  const category = hasBiz ? "SME" : p.segment === "VIP" || p.segment === "Premium" ? "HNW" : "Retail"
  const myTk = (tickets ?? []).filter((t) => t.user_id === p.id)
  const myUn = unusual.filter((t) => acctToCust.get(t.account_id) === p.id)
  const myNeg = (negConvos ?? []).filter((c) => c.customer_id === p.id)
  const myLoans = (loans ?? []).filter((l) => l.customer_id === p.id)
  let churn = 0; const signals = []
  if (p.segment === "At Risk") { churn += 35; signals.push("segment At Risk") }
  if (myLoans.some((l) => l.status === "delinquent")) { churn += 15; signals.push("delinquent loan") }
  for (const t of myUn) if (CHURN_RE.test(t.unusual_reason || t.description || "")) { churn += 30; signals.push(`txn: ${(t.unusual_reason || t.description || "").slice(0, 80)}`) }
  for (const t of myTk) if (CHURN_RE.test(t.subject || "")) { churn += 20; signals.push(`ticket: ${t.subject}`) }
  if (myNeg.length) { churn += 25 * myNeg.length; signals.push(`negative call: ${myNeg[0].subject}`) }
  if (balance > 0 && balance < 100000) { churn += 10; signals.push("low balance") }
  churn = Math.max(0, Math.min(100, churn))
  const oppMult = category === "SME" ? 1.2 : category === "HNW" ? 0.5 : 0.3
  return { name: p.full_name, category, segment: p.segment, kyc: p.kyc_status, balanceKES: Math.round(balance), churn, signals, openTickets: myTk.map((t) => t.subject), opportunityKES: Math.round(balance * oppMult), dormant: myTk.length === 0 && myUn.length === 0 && churn < 20 && my.length <= 1 && balance < 150000 }
})
const totals = {
  clients: book.length, aumKES: Math.round(book.reduce((s, c) => s + c.balanceKES, 0)),
  atRisk: book.filter((c) => c.churn >= 40).length, sme: book.filter((c) => c.category === "SME").length,
  hnw: book.filter((c) => c.category === "HNW").length, dormant: book.filter((c) => c.dormant).length,
}
const totalsLine = `PORTFOLIO TOTALS: ${totals.clients} clients · AUM KES ${totals.aumKES.toLocaleString("en")} · ${totals.atRisk} at-risk · ${totals.sme} SME · ${totals.hnw} HNW · ${totals.dormant} dormant.`

const promptBlock = `${totalsLine}

THE BOOK (one row per client — churn is 0–100, KES figures are home-currency):
${JSON.stringify(book)}`

// Full paste-ready ElevenLabs SYSTEM PROMPT. {{focus_label}} stays a live
// variable (passed at connect); the book is baked in statically.
const systemPrompt = `# Personality
You are Atlas, a highly intelligent and efficient voice AI assistant for NCBA Bank relationship managers in Kenya. You operate like a sharp chief-of-staff, knowing every client by name and possessing an encyclopedic knowledge of their financial activities. You are concise, warm, and always data-driven.
# Environment
You are an internal, hands-free voice assistant supporting an NCBA Bank Relationship Manager (RM) in Kenya. You have real-time access to comprehensive client data, including KES balances, M-Pesa and PesaLink activity, loan statuses, support tickets, and call-centre history. The RM is interacting with you via voice, often while multitasking, so your responses must be clear, actionable, and succinct.
# Client Book
This week's focus: {{focus_label}}.
The following is the RM's ENTIRE book — one row per client; churn is a 0–100 risk score; KES figures are home-currency:
${totalsLine}
${JSON.stringify(book)}
Treat this as your ground truth for all book-level questions (churn, opportunities, priorities, call plans). For a SINGLE client's deeper detail — recent transactions, support-ticket threads, or call-centre history not shown above — call the \`get_client_detail\` tool with their name. Never invent detail beyond what the book or the tool returns.
# Tone
Your tone is professional, warm, and confident, like a trusted advisor. You speak concisely, generally keeping responses to 1-3 sentences. You use natural speech patterns and occasional brief affirmations like [checking] "Understood," or [thoughtfully] "Right." When citing data, you are precise and clear. Always end your response with a single, unambiguous next action. Use audio tags appropriately, for example, [warmly], [checking], [confidently]. Never read long lists or tables aloud — summarise (e.g. "you have five at-risk clients; the most urgent is…") and offer to go deeper.
# Goal
Your primary goal is to empower the Relationship Manager, Peter, to proactively manage their client book by providing data-backed insights and actionable recommendations. You will achieve this through the following structured workflow:
1.  **Understand RM's Request:** Identify if the RM is asking to:
    *   Identify churn risk clients.
    *   Surface revenue or cross-sell opportunities.
    *   Recommend the single most important client to act on now.
    *   Plan the day's client calls in priority order.
    *   Draft personalized client outreach (call script, SMS, WhatsApp, email).
2.  **Access and Analyze Client Data:** Answer book-level questions directly from the Client Book above. When the RM wants depth on one named client, call the \`get_client_detail\` tool. Honour this week's focus ({{focus_label}}) when ranking clients.
3.  **Generate Insight:**
    *   **For Churn Risk:** Use each client's churn score and signals (e.g. external-bank transfers, missed salary, negative calls, delinquent loans).
    *   **For Revenue/Cross-sell:** Identify unmet needs, recent life events (e.g. large M-Pesa inflows), or underutilized products from the client's signals and balance.
    *   **For Priority Client:** Synthesize churn risk, opportunity size, and open requests to find the highest immediate-impact client.
    *   **For Call Plan:** Prioritize by urgency (churn), opportunity size, and open tickets.
    *   **For Outreach:** Draft concise, personalized communication grounded in that client's signals.
4.  **Cite Specific Data:** Every insight *must* be grounded in a specific signal from the data — a churn score, a KES figure, an open ticket subject, or a transaction. For example: "David Kimani's churn score is 100 — he's moved 1.5M to Equity and his mortgage is delinquent."
5.  **Formulate Recommendation:** Provide a clear, actionable recommendation directly addressing the RM's query.
6.  **Provide Single Next Action:** Conclude every interaction with one clear next step. For example: "I recommend you call David Kimani now to save the relationship before month-end."
Success is measured by the RM's ability to act on your recommendations effectively, leading to improved client retention, increased revenue, and efficient client management.
# Guardrails
*   Only provide information and recommendations based on the Client Book and \`get_client_detail\` tool results; do not speculate or invent clients, numbers, or details.
*   Maintain strict client confidentiality and data privacy.
*   If the data is insufficient for a robust recommendation, say so transparently and suggest an alternative approach.
*   Always conclude with a single, clear, actionable next step for the RM.
*   Do not offer general financial advice or recommendations outside of NCBA Bank's products and services.
*   If asked for information outside your scope, politely redirect or state your limitation.`

const jsonPath = new URL("./atlas-book.json", import.meta.url)
writeFileSync(jsonPath, JSON.stringify({ totals, book }, null, 2))

const txtPath = new URL("./atlas-book.prompt.txt", import.meta.url)
writeFileSync(txtPath, promptBlock)

const sysPath = new URL("./atlas-system-prompt.txt", import.meta.url)
writeFileSync(sysPath, systemPrompt)

console.log(`✓ ${book.length} clients written:`)
console.log(`  • scripts/atlas-book.json          (structured: { totals, book })`)
console.log(`  • scripts/atlas-book.prompt.txt    (just the book block)`)
console.log(`  • scripts/atlas-system-prompt.txt  (FULL paste-ready system prompt) ←`)
console.log(`  Totals: ${JSON.stringify(totals)}`)
