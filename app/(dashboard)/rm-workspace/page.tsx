"use client"

import { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import { useRole } from "@/lib/role-context"
import { formatCurrency, formatRelativeTime } from "@/lib/format"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Star,
  Target,
  Loader2,
  Shield,
  ShieldAlert,
  Clock,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

type ClientData = {
  id: string
  name: string
  email: string
  avatar: string | null
  segment: string
  totalBalance: number
}

type RiskAlert = {
  id: string
  user_id: string
  type: string
  severity: string
  title: string
  description: string
  status: string
}

type SupportTicket = {
  id: string
  user_id: string
  subject: string
  status: string
  priority: string
}

type NBA = {
  id: string
  clientId: string
  clientName: string
  action: string
  reason: string
  priority: "high" | "medium" | "low"
}

export default function RMWorkspacePage() {
  const { currentRole, currentBankingUserId } = useRole()
  const [clients, setClients] = useState<ClientData[]>([])
  const [alerts, setAlerts] = useState<RiskAlert[]>([])
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (!currentBankingUserId) return
      setLoading(true)
      const supabase = createClient()

      console.log("[RM Dashboard] Fetching clients for RM:", currentBankingUserId)
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .eq("assigned_rm_id", currentBankingUserId)

      console.log("[RM Dashboard] Profiles result:", profiles?.length, "clients found", profilesError ? `Error: ${profilesError.message}` : "")
      if (profiles) {
        profiles.forEach((p: any) => console.log("[RM Dashboard] Client:", p.id, p.full_name))
      }

      if (!profiles || profiles.length === 0) {
        setClients([])
        setLoading(false)
        return
      }

      const clientIds = profiles.map((p: any) => p.id)

      const [accountsRes, alertsRes, ticketsRes] = await Promise.all([
        supabase.from("accounts").select("customer_id, balance, currency").in("customer_id", clientIds),
        supabase.from("risk_alerts").select("*").in("user_id", clientIds).neq("status", "resolved"),
        supabase.from("support_tickets").select("*").in("user_id", clientIds).in("status", ["open", "in_progress"]),
      ])

      const accounts = accountsRes.data || []
      setAlerts(alertsRes.data || [])
      setTickets(ticketsRes.data || [])

      const mapped: ClientData[] = profiles.map((p: any) => {
        const clientAccounts = accounts.filter((a: any) => a.customer_id === p.id)
        const totalBalance = clientAccounts.reduce((sum: number, acc: any) => {
          const rate = acc.currency === "USD" ? 3.67 : 1
          return sum + Number(acc.balance) * rate
        }, 0)
        return {
          id: p.id,
          name: p.full_name,
          email: p.email,
          avatar: p.avatar_url,
          segment: p.segment || "Standard",
          totalBalance,
        }
      })

      setClients(mapped)
      setLoading(false)
    }
    fetchData()
  }, [currentBankingUserId])

  const portfolioValue = useMemo(() => clients.reduce((t, c) => t + c.totalBalance, 0), [clients])
  const atRiskClients = useMemo(() => clients.filter((c) => c.segment === "At Risk"), [clients])

  const nbaList = useMemo<NBA[]>(() => {
    const actions: NBA[] = []
    for (const alert of alerts) {
      const client = clients.find((c) => c.id === alert.user_id)
      if (!client) continue
      actions.push({
        id: `alert-${alert.id}`,
        clientId: client.id,
        clientName: client.name,
        action: alert.severity === "critical" ? `Urgent: ${alert.title}` : alert.title,
        reason: alert.description || `${alert.severity} ${alert.type} alert`,
        priority: alert.severity === "critical" ? "high" : alert.severity === "high" ? "high" : "medium",
      })
    }
    for (const ticket of tickets) {
      const client = clients.find((c) => c.id === ticket.user_id)
      if (!client) continue
      actions.push({
        id: `ticket-${ticket.id}`,
        clientId: client.id,
        clientName: client.name,
        action: `Follow up: ${ticket.subject}`,
        reason: `${ticket.priority} priority ticket — ${ticket.status}`,
        priority: ticket.priority === "high" || ticket.priority === "urgent" ? "high" : "medium",
      })
    }
    const rank = { high: 0, medium: 1, low: 2 }
    return actions.sort((a, b) => rank[a.priority] - rank[b.priority])
  }, [alerts, tickets, clients])

  if (currentRole !== "relationship_manager") {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
            <p className="text-muted-foreground">
              The RM Workspace is only available to Relationship Manager users.
            </p>
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

  return (
    <div className="space-y-6">
      <PageHeader title="RM Workspace" description="Your clients, portfolio, and next actions at a glance" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Portfolio Clients" value={clients.length} icon={Users} />
        <StatCard title="Total AUM" value={formatCurrency(portfolioValue)} icon={TrendingUp} />
        <StatCard title="At-Risk Clients" value={atRiskClients.length} icon={AlertCircle} />
        <StatCard title="Pending Actions" value={nbaList.length} icon={Target} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">My Clients</CardTitle>
              <CardDescription>Assigned client portfolio</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {clients.map((client) => (
                <Link
                  key={client.id}
                  href={`/rm-workspace/${client.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                      <AvatarFallback className="bg-primary/20 text-primary text-xs">
                        {client.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{client.name}</p>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] ${
                            client.segment === "VIP" || client.segment === "Premium"
                              ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                              : client.segment === "At Risk"
                                ? "bg-red-500/20 text-red-600 dark:text-red-400"
                                : "bg-muted"
                          }`}
                        >
                          {client.segment}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{client.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrency(client.totalBalance)}</p>
                      <p className="text-xs text-muted-foreground">Total Balance</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
              {clients.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No clients assigned to your portfolio.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <CardTitle className="text-lg">Next Best Actions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nbaList.slice(0, 6).map((nba) => (
                  <Link
                    key={nba.id}
                    href={`/rm-workspace/${nba.clientId}`}
                    className="block p-3 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{nba.clientName}</span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${
                          nba.priority === "high"
                            ? "border-red-500/50 text-red-600 dark:text-red-400"
                            : "border-yellow-500/50 text-yellow-600 dark:text-yellow-400"
                        }`}
                      >
                        {nba.priority}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{nba.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{nba.reason}</p>
                  </Link>
                ))}
                {nbaList.length === 0 && (
                  <div className="text-center py-4 text-sm text-muted-foreground">No pending actions</div>
                )}
              </div>
            </CardContent>
          </Card>

          {alerts.length > 0 && (
            <Card className="border-yellow-500/30 bg-yellow-500/5">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  <CardTitle className="text-sm text-yellow-600 dark:text-yellow-400">Portfolio Alerts</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {alerts.slice(0, 4).map((alert) => {
                    const client = clients.find((c) => c.id === alert.user_id)
                    return (
                      <div key={alert.id} className="flex items-start gap-2 text-sm">
                        <Badge
                          variant="outline"
                          className={`text-[9px] mt-0.5 shrink-0 ${
                            alert.severity === "critical"
                              ? "border-red-500/50 text-red-600 dark:text-red-400"
                              : "border-yellow-500/50 text-yellow-600 dark:text-yellow-400"
                          }`}
                        >
                          {alert.severity}
                        </Badge>
                        <div className="min-w-0">
                          <p className="text-sm truncate">{alert.title}</p>
                          <p className="text-xs text-muted-foreground">{client?.name}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm">Today&apos;s Schedule</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {clients.slice(0, 2).map((client, i) => (
                  <div key={client.id} className="flex items-center gap-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-primary" : "bg-muted-foreground"}`} />
                    <span>{i === 0 ? "10:00 AM" : "2:00 PM"} — Portfolio review with {client.name}</span>
                  </div>
                ))}
                {clients.length === 0 && (
                  <p className="text-sm text-muted-foreground">No appointments today</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
