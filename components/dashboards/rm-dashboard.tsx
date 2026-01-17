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
import { Users, TrendingUp, AlertCircle, Calendar, ArrowRight, Star, Clock, Target, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@/lib/types"

export function RMDashboard() {
  const { currentUser, currentBankingUserId } = useRole()
  const [clients, setClients] = useState<any[]>([])
  const [clientsLoading, setClientsLoading] = useState(true)
  const [nbaList, setNbaList] = useState<any[]>([]) // Using mock NBA for now as table doesn't exist

  useEffect(() => {
    async function fetchData() {
      if (!currentBankingUserId) return

      setClientsLoading(true)
      const supabase = createClient()

      // Fetch Clients assigned to this RM
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .eq("assigned_rm_id", currentBankingUserId)

      if (profilesError) {
        console.error("Error fetching clients:", profilesError)
        setClientsLoading(false)
        return
      }

      // Fetch Accounts for all these clients to calculate AUM
      const clientIds = (profiles || []).map((p: any) => p.id)
      const { data: accounts, error: accountsError } = await supabase
        .from("accounts")
        .select("user_id, balance, currency")
        .in("user_id", clientIds)

      if (accountsError) console.error("Error fetching client accounts:", accountsError)

      // Map clients with their calculated balance
      const mappedClients = (profiles || []).map((p: any) => {
        const clientAccounts = accounts?.filter((a: any) => a.user_id === p.id) || []
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
          totalBalance
        }
      })

      setClients(mappedClients)
      
      // Mock NBAs for now (fetching from 'crm_interactions' or similar would be better if table existed)
      const mockNBAs = mappedClients.slice(0, 4).map((client: any, i: number) => ({
        id: `nba-${i}`,
        clientId: client.id,
        clientName: client.name,
        action: i % 2 === 0 ? "Portfolio Review" : "Upsell Premium Card",
        reason: i % 2 === 0 ? "Quarterly check-in due" : "High spending detected",
        priority: i === 0 ? "high" : "medium"
      }))
      setNbaList(mockNBAs)

      setClientsLoading(false)
    }

    fetchData()
  }, [currentUser])

  const portfolioValue = useMemo(() => {
    return clients.reduce((total, client) => total + client.totalBalance, 0)
  }, [clients])

  const vipClients = useMemo(() => clients.filter((c) => c.segment === "VIP"), [clients])
  const atRiskClients = useMemo(() => clients.filter((c) => c.segment === "At Risk"), [clients])
  
  const upcomingRenewals = 3 // mock

  if (clientsLoading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
  }

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
                // Mock last interaction date for now
                const lastInteractionDate = new Date(Date.now() - Math.random() * 1000000000).toISOString()

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
                            .map((n: string) => n[0])
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
                          Last contact: {formatRelativeTime(lastInteractionDate)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrency(client.totalBalance)}</p>
                      <p className="text-xs text-muted-foreground">Total Balance</p>
                    </div>
                  </div>
                )
              })}
              {clients.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  No clients assigned yet.
                </div>
              )}
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
                {nbaList.map((nba) => {
                  return (
                    <div key={nba.id} className="p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">{nba.clientName}</span>
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
                {nbaList.length === 0 && (
                    <div className="text-center py-2 text-sm text-muted-foreground">No pending actions</div>
                )}
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
