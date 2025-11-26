"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useRole } from "@/lib/role-context"
import { getAccountsByUserId, getTransactionsByAccountId, getCardsByUserId, getLoansByUserId } from "@/lib/mock-data"
import { formatCurrency, formatDate, getCategoryColor } from "@/lib/format"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Send,
  CreditCard,
  AlertTriangle,
  FileQuestion,
  Landmark,
  Bot,
  Calendar,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

export function CustomerDashboard() {
  const { currentUser } = useRole()

  const accounts = useMemo(() => getAccountsByUserId(currentUser.id), [currentUser.id])
  const primaryAccount = accounts[0]
  const transactions = useMemo(
    () => (primaryAccount ? getTransactionsByAccountId(primaryAccount.id).slice(0, 5) : []),
    [primaryAccount],
  )
  const cards = useMemo(() => getCardsByUserId(currentUser.id), [currentUser.id])
  const loans = useMemo(() => getLoansByUserId(currentUser.id), [currentUser.id])

  const totalBalance = accounts.reduce((sum, acc) => {
    const rate = acc.currency === "USD" ? 3.67 : 1
    return sum + acc.balance * rate
  }, 0)

  const thisMonthSpending = transactions
    .filter((t) => t.type === "debit" && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0)

  const upcomingPayments = loans.reduce((sum, l) => sum + l.monthlyPayment, 0)

  const quickActions = [
    { label: "Send Money", icon: Send, href: "/payments" },
    { label: "Freeze Card", icon: CreditCard, href: "/cards" },
    { label: "Dispute Transaction", icon: FileQuestion, href: "/support" },
    { label: "Apply for Loan", icon: Landmark, href: "/loans" },
  ]

  const aiChips = [
    "How much did I spend on restaurants this month?",
    "Why was I charged this fee?",
    "Can I afford a 3,000 AED monthly payment?",
    "Explain my credit card benefits",
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${currentUser.name.split(" ")[0]}`}
        description="Here's an overview of your finances"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Balance"
          value={formatCurrency(totalBalance)}
          change={3.2}
          changeLabel="vs last month"
          icon={Wallet}
        />
        <StatCard
          title="This Month Spending"
          value={formatCurrency(thisMonthSpending)}
          change={-8.5}
          changeLabel="vs last month"
          icon={ArrowDownRight}
        />
        <StatCard title="Upcoming Bills" value={formatCurrency(upcomingPayments)} icon={Calendar} />
        <StatCard title="Active Cards" value={cards.filter((c) => c.status === "active").length} icon={CreditCard} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Transactions</CardTitle>
              <CardDescription>Your latest activity</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/accounts">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        txn.type === "credit" ? "bg-emerald-500/20" : "bg-muted"
                      }`}
                    >
                      {txn.type === "credit" ? (
                        <ArrowDownRight className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{txn.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{formatDate(txn.date)}</span>
                        <Badge variant="secondary" className={`text-[10px] py-0 ${getCategoryColor(txn.category)}`}>
                          {txn.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-medium ${txn.type === "credit" ? "text-emerald-500" : "text-foreground"}`}
                  >
                    {txn.type === "credit" ? "+" : "-"}
                    {formatCurrency(txn.amount)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="h-auto py-3 flex flex-col items-center gap-2 bg-transparent"
                    asChild
                  >
                    <Link href={action.href}>
                      <action.icon className="h-5 w-5" />
                      <span className="text-xs">{action.label}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-yellow-500/5">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <CardTitle className="text-sm text-yellow-500">Alert</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Unusual spending detected in your account. Higher than average spending on entertainment this month.
              </p>
              <Button variant="link" size="sm" className="px-0 mt-2 text-primary">
                Review Details
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Banker Prompt */}
      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Ask AI Banker</CardTitle>
          </div>
          <CardDescription>Get instant answers about your finances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {aiChips.map((chip) => (
              <Button
                key={chip}
                variant="secondary"
                size="sm"
                className="text-xs h-auto py-2 px-3 bg-background/50 hover:bg-background"
                asChild
              >
                <Link href={`/ai-banker?q=${encodeURIComponent(chip)}`}>{chip}</Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Spending Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Spending Insights</CardTitle>
          <CardDescription>AI-powered analysis of your spending patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium">Top Category</span>
              </div>
              <p className="text-2xl font-bold">Shopping</p>
              <p className="text-xs text-muted-foreground">32% of total spending</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Savings Potential</span>
              </div>
              <p className="text-2xl font-bold">{formatCurrency(1250)}</p>
              <p className="text-xs text-muted-foreground">Based on subscription analysis</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Next Bill</span>
              </div>
              <p className="text-2xl font-bold">{formatCurrency(1521.25)}</p>
              <p className="text-xs text-muted-foreground">Loan payment on Jan 15</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
