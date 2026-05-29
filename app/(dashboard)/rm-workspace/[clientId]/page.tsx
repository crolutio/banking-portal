"use client"

import { useEffect, useMemo, useState, useRef } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useChat } from "ai/react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useRole } from "@/lib/role-context"
import { useMarket, useFormatCurrency } from "@/lib/market-context"
import { MARKET_CONFIG } from "@/lib/markets"
import { createClient } from "@/lib/supabase/client"
import { ClientSupportSection } from "@/components/rm/client-support-section"
import { ClientBriefingPanel } from "@/components/rm/client-briefing-panel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Bot,
  CreditCard,
  Landmark,
  Loader2,
  MessageSquare,
  Shield,
  Sparkles,
  Wallet,
  ReceiptText,
} from "lucide-react"

async function fetchByCustomerColumn<T>(table: string, clientId: string): Promise<T[]> {
  const supabase = createClient()
  const { data: byCustomer, error: customerErr } = await supabase
    .from(table)
    .select("*")
    .eq("customer_id", clientId)

  if (!customerErr && byCustomer && byCustomer.length > 0) {
    return byCustomer as T[]
  }

  const { data: byUser } = await supabase.from(table).select("*").eq("user_id", clientId)
  return (byUser ?? []) as T[]
}

type Profile = {
  id: string
  full_name: string
  email: string
  avatar_url: string | null
  segment: string
  kyc_status: string
  phone: string | null
  created_at: string
}

export default function Client360Page() {
  const { clientId } = useParams<{ clientId: string }>()
  const { currentRole } = useRole()
  const { market } = useMarket()
  const fmt = useFormatCurrency()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [accounts, setAccounts] = useState<any[]>([])
  const [cards, setCards] = useState<any[]>([])
  const [loans, setLoans] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const chatScrollRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading: chatLoading, append } = useChat({
    api: "/api/rm-chat",
    body: { userId: clientId, currentPage: "/rm-workspace", market },
  })

  useEffect(() => {
    const el = chatScrollRef.current
    if (!el) return
    // Only auto-scroll the inner chat container when the user is already near the bottom,
    // so streaming tokens don't yank them back if they've scrolled up to read earlier turns.
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    if (distanceFromBottom < 120) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    async function fetchBankingData() {
      if (!clientId) return
      setLoading(true)
      const supabase = createClient()

      const { data: profileData, error: profileErr } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", clientId)
        .single()

      if (profileErr || !profileData) {
        setError("Client not found")
        setLoading(false)
        return
      }
      setProfile(profileData)

      const { data: accts } = await supabase
        .from("accounts")
        .select("*")
        .eq("customer_id", clientId)

      setAccounts(accts || [])
      const accountIds = (accts || []).map((a: any) => a.id)

      const [cardsData, loansData] = await Promise.all([
        fetchByCustomerColumn("cards", clientId),
        fetchByCustomerColumn("loans", clientId),
      ])

      setCards(cardsData)
      setLoans(loansData)

      if (accountIds.length > 0) {
        const { data: txData } = await supabase
          .from("transactions")
          .select("*")
          .in("account_id", accountIds)
          .order("date", { ascending: false })
          .limit(15)
        setTransactions(txData || [])
      }

      setLoading(false)
    }

    fetchBankingData()
  }, [clientId])

  const totalBalance = useMemo(
    () => {
      const usdRate = MARKET_CONFIG[market].usdToHomeRate
      return accounts.reduce((s, a) => s + Number(a.balance) * (a.currency === "USD" ? usdRate : 1), 0)
    },
    [accounts, market],
  )
  const totalLiabilities = useMemo(
    () => loans.reduce((s, l) => s + Number(l.remaining_balance), 0),
    [loans],
  )
  const recentCredits = useMemo(
    () => transactions.filter((t) => t.type === "credit").reduce((s, t) => s + Math.abs(Number(t.amount)), 0),
    [transactions],
  )
  const recentDebits = useMemo(
    () => transactions.filter((t) => t.type === "debit").reduce((s, t) => s + Math.abs(Number(t.amount)), 0),
    [transactions],
  )
  const topCategory = useMemo(() => {
    const cats = transactions
      .filter((t) => t.type === "debit")
      .reduce<Record<string, number>>((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(Number(t.amount))
        return acc
      }, {})
    return Object.entries(cats).sort((a, b) => b[1] - a[1])[0]?.[0] || "—"
  }, [transactions])

  const clientPrompts: Record<string, string[]> = {
    "4e140685-8f38-49ff-aae0-d6109c46873d": [
      "Give me a 60-second snapshot of Sarah — segment, lifestyle, what she cares about, and what's frustrating her right now.",
      "What do Sarah's last 90 days of transactions and travel tell you about her lifestyle, spending rhythm, and likely upcoming needs?",
      "Walk me through Sarah's support history — what's the recurring theme, and how does she feel about us right now?",
      "Compare Sarah to a typical Premium client — where are the gaps in her product mix, and what would I miss if I only looked at her balance?",
    ],
    "22222222-2222-2222-2222-222222222222": [
      "Give me a 60-second snapshot of Mohammed — what kind of client is he, what's his trajectory, and what's keeping him up at night?",
      "What do Mohammed's transactions tell you about his business operations and cash-flow patterns?",
      "Walk me through Mohammed's support history — anything left unresolved, and what's his tone with the bank lately?",
      "Looking at his 3 loans, his balances, and his business stage — what does his ideal product portfolio look like in 12 months?",
    ],
  }

  const starterPrompts = clientPrompts[clientId] ?? [
    "What should I discuss first with this customer?",
    "What is the highest-priority risk?",
    "What product should I recommend?",
  ]

  if (currentRole !== "relationship_manager") {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
            <p className="text-muted-foreground">Switch to Relationship Manager role to access this page.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="space-y-4 p-6">
        <Link href="/rm-workspace" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Client Not Found</h2>
            <p className="text-muted-foreground">The requested client could not be found.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link href="/rm-workspace" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      {/* Client Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="text-lg bg-primary/10 text-primary font-semibold">
                  {profile.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="flex items-center gap-2">
                  {profile.full_name}
                  <Badge variant="outline">{profile.segment}</Badge>
                </CardTitle>
                <CardDescription>{profile.email}</CardDescription>
                <div className="text-xs text-muted-foreground mt-1">
                  KYC: {profile.kyc_status} · Client since {new Date(profile.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <MetricTile label="Total Balance" value={fmt(totalBalance)} />
            <MetricTile label="Liabilities" value={fmt(totalLiabilities)} />
            <MetricTile label="Inflow (recent)" value={fmt(recentCredits)} />
            <MetricTile label="Outflow (recent)" value={fmt(recentDebits)} />
            <MetricTile label="Top Spend" value={topCategory} />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="briefing" className="w-full">
        <TabsList>
          <TabsTrigger value="briefing">
            <Sparkles className="h-3.5 w-3.5" />
            AI Briefing
          </TabsTrigger>
          <TabsTrigger value="copilot">
            <MessageSquare className="h-3.5 w-3.5" />
            Ask Copilot
            {messages.length > 0 && (
              <Badge variant="secondary" className="ml-1 h-4 px-1.5 text-[10px]">
                {messages.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="briefing">
          <ClientBriefingPanel clientId={clientId} clientName={profile.full_name} />
        </TabsContent>

        <TabsContent value="copilot">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Bot className="h-4 w-4 text-primary" /> Relationship Copilot
              </CardTitle>
              <CardDescription>
                Ask follow-up questions about <strong>{profile.full_name}</strong> — financials, support history, and product recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder={`Ask about ${profile.full_name}...`}
                />
                <Button type="submit" disabled={chatLoading || !input.trim()}>
                  {chatLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ask"}
                </Button>
              </form>

              <div className="flex flex-wrap gap-2">
                {starterPrompts.map((prompt) => (
                  <Button
                    key={prompt}
                    variant="outline"
                    size="sm"
                    disabled={chatLoading}
                    onClick={() => append({ role: "user", content: prompt })}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>

              {messages.length > 0 && (
                <div
                  ref={chatScrollRef}
                  className="rounded-lg border bg-background/60 p-4 space-y-4 max-h-[500px] overflow-y-auto overscroll-contain"
                >
                  {messages.map((msg) => (
                    <div key={msg.id} className={`text-sm ${msg.role === "user" ? "font-medium" : ""}`}>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground block mb-1">
                        {msg.role === "user" ? "You" : "Copilot"}
                      </span>
                      {msg.role === "user" ? (
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      ) : (
                        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-li:my-0.5 prose-headings:mt-3 prose-headings:mb-1 prose-table:text-xs prose-th:px-3 prose-th:py-1.5 prose-td:px-3 prose-td:py-1.5 prose-th:bg-muted/50 prose-table:border prose-th:border prose-td:border">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Thinking...
                    </div>
                  )}
                </div>
              )}

              {messages.length === 0 && (
                <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Ask a question to get AI-powered insights about this client.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Wallet className="h-4 w-4 text-primary" /> Accounts ({accounts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {accounts.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.type} · {a.account_number}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{fmt(Number(a.balance), a.currency || undefined)}</p>
                  <Badge variant="outline" className="text-[10px]">{a.status}</Badge>
                </div>
              </div>
            ))}
            {accounts.length === 0 && <p className="text-sm text-muted-foreground">No accounts found</p>}
          </CardContent>
        </Card>

        {/* Cards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CreditCard className="h-4 w-4 text-primary" /> Cards ({cards.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {cards.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{c.cardholder_name}</p>
                  <p className="text-xs text-muted-foreground">{c.brand} ·· {c.last_four} · {c.type}</p>
                </div>
                <div className="text-right">
                  {c.credit_limit && (
                    <p className="text-sm font-medium">
                      {fmt(Number(c.spent_amount))} / {fmt(Number(c.credit_limit))}
                    </p>
                  )}
                  <Badge variant="outline" className="text-[10px]">{c.status}</Badge>
                </div>
              </div>
            ))}
            {cards.length === 0 && <p className="text-sm text-muted-foreground">No cards found</p>}
          </CardContent>
        </Card>

        {/* Loans */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Landmark className="h-4 w-4 text-primary" /> Loans ({loans.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {loans.map((l) => (
              <div key={l.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{l.type}</p>
                  <p className="text-xs text-muted-foreground">{l.interest_rate}% · {l.term_months} months</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{fmt(Number(l.remaining_balance))}</p>
                  <p className="text-xs text-muted-foreground">of {fmt(Number(l.principal_amount))}</p>
                </div>
              </div>
            ))}
            {loans.length === 0 && <p className="text-sm text-muted-foreground">No loans found</p>}
          </CardContent>
        </Card>

        <ClientSupportSection clientId={clientId} clientName={profile.full_name} />
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ReceiptText className="h-4 w-4 text-primary" /> Recent Transactions ({transactions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {transactions.slice(0, 15).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(tx.date).toLocaleDateString()} · {tx.category}
                  </p>
                </div>
                <p className={`text-sm font-medium ${tx.type === "credit" ? "text-green-600 dark:text-green-400" : ""}`}>
                  {tx.type === "credit" ? "+" : "-"}{fmt(Math.abs(Number(tx.amount)))}
                </p>
              </div>
            ))}
            {transactions.length === 0 && <p className="text-sm text-muted-foreground">No transactions found</p>}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold mt-1">{value}</p>
    </div>
  )
}
