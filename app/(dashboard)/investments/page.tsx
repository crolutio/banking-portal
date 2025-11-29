"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/ui/stat-card"
import { formatCurrency } from "@/lib/format"
import { AskAIBankerWidget } from "@/components/ai/ask-ai-banker-widget"
import {
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
  Landmark,
  Building2,
  Home,
  Gem,
  Briefcase,
  Wallet,
  Palmtree,
  ChevronRight,
  ArrowRight,
  Loader2,
} from "lucide-react"
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts"
import { useRole } from "@/lib/role-context"
import { createClient } from "@/lib/supabase/client"
import type { PortfolioHolding } from "@/lib/types"

const investmentCategories = [
  {
    id: "public-markets",
    name: "Public Markets",
    icon: Landmark,
    description: "Stocks, ETFs, Bonds & Mutual Funds",
    color: "bg-blue-500",
    count: 24,
  },
  {
    id: "private-markets",
    name: "Private Markets",
    icon: Building2,
    description: "PE, VC, Hedge Funds & Private Credit",
    color: "bg-purple-500",
    count: 12,
  },
  {
    id: "real-estate",
    name: "Real Estate",
    icon: Home,
    description: "Residential, Commercial & REITs",
    color: "bg-emerald-500",
    count: 8,
  },
  {
    id: "alternative-assets",
    name: "Alternative Assets",
    icon: Gem,
    description: "Gold, Crypto, Art & Collectibles",
    color: "bg-amber-500",
    count: 15,
  },
  {
    id: "business-ownership",
    name: "Business Ownership",
    icon: Briefcase,
    description: "Direct Equity & Franchises",
    color: "bg-rose-500",
    count: 6,
  },
  {
    id: "wealth-preservation",
    name: "Wealth Preservation",
    icon: Wallet,
    description: "Trusts & Holding Structures",
    color: "bg-slate-500",
    count: 5,
  },
  {
    id: "lifestyle-investments",
    name: "Lifestyle",
    icon: Palmtree,
    description: "Yachts, Jets & Luxury Assets",
    color: "bg-cyan-500",
    count: 4,
  },
]

export default function InvestmentsPage() {
  const { currentUser } = useRole()
  const [userHoldings, setUserHoldings] = useState<PortfolioHolding[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (!currentUser?.id) return

      setIsLoading(true)
      const supabase = createClient()

      const { data, error } = await supabase
        .from("portfolio_holdings")
        .select("*")
        .eq("user_id", currentUser.id)

      if (error) {
        console.error("Error fetching holdings:", error)
      } else {
        const mappedHoldings: PortfolioHolding[] = (data || []).map((h: any) => {
          const quantity = Number(h.quantity)
          const avgCost = Number(h.avg_cost)
          const currentPrice = Number(h.current_price)
          const value = quantity * currentPrice
          const costBasis = quantity * avgCost
          const gain = value - costBasis
          const gainPercent = costBasis > 0 ? (gain / costBasis) * 100 : 0

          return {
            id: h.id,
            userId: h.user_id,
            symbol: h.symbol,
            name: h.name,
            type: h.type,
            quantity,
            avgCost,
            currentPrice,
            value,
            gain,
            gainPercent
          }
        })
        setUserHoldings(mappedHoldings)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [currentUser])

  const totalValue = userHoldings.reduce((sum, h) => sum + h.value, 0)
  const totalGain = userHoldings.reduce((sum, h) => sum + h.gain, 0)
  const totalGainPercent = totalValue > 0 ? ((totalGain / (totalValue - totalGain)) * 100).toFixed(2) : "0.00"

  // Calculate allocation
  const allocation = userHoldings.reduce(
    (acc, h) => {
      acc[h.type] = (acc[h.type] || 0) + h.value
      return acc
    },
    {} as Record<string, number>,
  )

  const allocationData = Object.entries(allocation).map(([name, value]) => ({
    name: name.replace("_", " "),
    value
  }))

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#f43f5e', '#64748b', '#06b6d4'];

  const aiQuestions = [
    "How is my portfolio performing?",
    "Rebalance my portfolio",
    "Suggest new investment opportunities",
    "Analyze my risk exposure",
  ]

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investments</h1>
          <p className="text-muted-foreground mt-1">Manage your wealth across diverse asset classes</p>
        </div>
      </div>

      {/* Portfolio Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Portfolio Value"
          value={formatCurrency(totalValue, "USD")}
          icon={PieChart}
          description="Across all asset classes"
        />
        <StatCard
          title="Total Gain/Loss"
          value={formatCurrency(totalGain, "USD")}
          icon={totalGain >= 0 ? TrendingUp : TrendingDown}
          description={`${totalGainPercent}% all-time return`}
          trend={{ value: Number(totalGainPercent), direction: totalGain >= 0 ? "up" : "down" }}
        />
        <StatCard 
            title="Active Holdings" 
            value={userHoldings.length.toString()} 
            icon={BarChart3} 
            description="Across 4 asset classes" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Asset Classes Grid */}
        <div className="lg:col-span-2 space-y-8">
            <div>
                <h2 className="text-xl font-semibold mb-4">Explore Asset Classes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {investmentCategories.map((category) => (
                        <Link href={`/investments/${category.id}`} key={category.id}>
                            <Card className="h-full hover:shadow-md transition-all cursor-pointer group border-l-4" style={{ borderLeftColor: category.color.replace('bg-', 'var(--') }}>
                                <CardContent className="p-5 flex items-start gap-4">
                                    <div className={`p-3 rounded-xl ${category.color} bg-opacity-10 text-white shrink-0`}>
                                        <category.icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{category.name}</h3>
                                            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                                        <div className="mt-3 flex items-center gap-2">
                                            <Badge variant="secondary" className="text-xs font-normal">
                                                {category.count} Opportunities
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>

        {/* Sidebar: Allocation & AI */}
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Allocation</CardTitle>
                    <CardDescription>Current portfolio distribution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                                <Pie
                                    data={allocationData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {allocationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip 
                                    formatter={(value: number) => formatCurrency(value, "USD")}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                            </RechartsPieChart>
                        </ResponsiveContainer>
                    </div>
                    {Object.entries(allocation).map(([type, value], index) => {
                      const percentage = totalValue > 0 ? ((value / totalValue) * 100).toFixed(1) : "0.0"
                      return (
                        <div key={type} className="space-y-2">
                          <div className="flex justify-between text-sm items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                <span className="capitalize font-medium">{type.replace("_", " ")}</span>
                            </div>
                            <span>{percentage}%</span>
                          </div>
                          {/* <Progress value={Number(percentage)} className="h-2" /> */}
                          <p className="text-xs text-muted-foreground text-right">{formatCurrency(value, "USD")}</p>
                        </div>
                      )
                    })}
                </CardContent>
            </Card>

            <AskAIBankerWidget questions={aiQuestions} description="Get AI insights on your portfolio" />
        </div>
      </div>
    </div>
  )
}
