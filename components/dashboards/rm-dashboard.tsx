"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useRole } from "@/lib/role-context"
import { getClientsByRmId, getAccountsByUserId, getNbaByClientId, getInteractionsByClientId } from "@/lib/mock-data"
import { formatCurrency, formatRelativeTime } from "@/lib/format"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, TrendingUp, AlertCircle, Calendar, ArrowRight, Star, Clock, Target } from "lucide-react"

export function RMDashboard() {
  const { currentUser } = useRole()

  const clients = useMemo(() => getClientsByRmId(currentUser.id), [currentUser.id])

  const portfolioValue = useMemo(() => {
    return clients.reduce((total, client) => {
      const accounts = getAccountsByUserId(client.id)
      return (
        total +
        accounts.reduce((sum, acc) => {
          const rate = acc.currency === "USD" ? 3.67 : 1
          return sum + acc.balance * rate
        }, 0)
      )
    }, 0)
  }, [clients])

  const vipClients = clients.filter((c) => c.segment === "VIP")
  const atRiskClients = clients.filter((c) => c.segment === "At Risk")

  const allNBAs = useMemo(() => {
    return clients.flatMap((client) => getNbaByClientId(client.id))
  }, [clients])

  const upcomingRenewals = 3 // mock

  return (
    <div className="space-y-6">
      <PageHeader title="RM Workspace" description="Manage your client portfolio and opportunities">
        <Button asChild>
          <Link href="/rm-workspace">
            View Full Workspace
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </PageHeader>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Portfolio Clients" value={clients.length} icon={Users} />
        <StatCard
          title="Total AUM"
          value={formatCurrency(portfolioValue)}
          change={5.2}
          changeLabel="MTD"
          icon={TrendingUp}
        />
        <StatCard title="VIP Clients" value={vipClients.length} icon={Star} />
        <StatCard title="Upcoming Renewals" value={upcomingRenewals} icon={Calendar} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Portfolio */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Client Portfolio</CardTitle>
              <CardDescription>Your assigned clients</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/rm-workspace">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clients.map((client) => {
                const accounts = getAccountsByUserId(client.id)
                const totalBalance = accounts.reduce((sum, acc) => {
                  const rate = acc.currency === "USD" ? 3.67 : 1
                  return sum + acc.balance * rate
                }, 0)
                const interactions = getInteractionsByClientId(client.id)
                const lastInteraction = interactions[0]

                return (
                  <div
                    key={client.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          {client.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{client.name}</p>
                          <Badge
                            variant="secondary"
                            className={`text-[10px] ${
                              client.segment === "VIP"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : client.segment === "At Risk"
                                  ? "bg-red-500/20 text-red-500"
                                  : "bg-muted"
                            }`}
                          >
                            {client.segment}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Last contact: {lastInteraction ? formatRelativeTime(lastInteraction.date) : "Never"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrency(totalBalance)}</p>
                      <p className="text-xs text-muted-foreground">Total Balance</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Next Best Actions */}
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
                {allNBAs.slice(0, 4).map((nba) => {
                  const client = clients.find((c) => c.id === nba.clientId)
                  return (
                    <div key={nba.id} className="p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">{client?.name}</span>
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${
                            nba.priority === "high"
                              ? "border-red-500/50 text-red-500"
                              : nba.priority === "medium"
                                ? "border-yellow-500/50 text-yellow-500"
                                : "border-muted"
                          }`}
                        >
                          {nba.priority}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{nba.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">{nba.reason}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-yellow-500/5">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <CardTitle className="text-sm text-yellow-500">Attention Required</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {atRiskClients.length > 0
                  ? `${atRiskClients.length} client(s) flagged as at-risk. Review their accounts.`
                  : "No at-risk clients in your portfolio."}
              </p>
              <Button variant="link" size="sm" className="px-0 mt-2 text-primary">
                Review Now
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm">Today&apos;s Schedule</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>10:00 AM - Portfolio review with Michael Chen</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  <span>2:00 PM - Credit line discussion</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
