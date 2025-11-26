"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard } from "@/components/ui/stat-card"
import { CitationBadge, ConfidenceIndicator } from "@/components/ai/citation-badge"
import { useRole } from "@/lib/role-context"
import { formatCurrency } from "@/lib/format"
import { users, accounts, loans, cards } from "@/lib/mock-data"
import {
  Users,
  Calendar,
  Search,
  Phone,
  Mail,
  Bot,
  ChevronRight,
  Clock,
  Target,
  Star,
  Shield,
  CreditCard,
  Wallet,
  Building,
  MessageSquare,
  Video,
} from "lucide-react"

// Mock client interactions
const clientInteractions = [
  {
    id: "int_1",
    clientId: "user_retail_1",
    type: "call",
    summary: "Discussed credit limit increase request",
    date: "2024-12-18",
    duration: "15 min",
  },
  {
    id: "int_2",
    clientId: "user_retail_1",
    type: "email",
    summary: "Sent investment portfolio review summary",
    date: "2024-12-15",
  },
  {
    id: "int_3",
    clientId: "user_retail_2",
    type: "meeting",
    summary: "Quarterly review and wealth planning discussion",
    date: "2024-12-10",
    duration: "45 min",
  },
  {
    id: "int_4",
    clientId: "user_sme_1",
    type: "call",
    summary: "Credit line utilization and expansion options",
    date: "2024-12-08",
    duration: "20 min",
  },
]

// Mock next best actions
const nextBestActions = [
  {
    id: "nba_1",
    clientId: "user_retail_1",
    clientName: "Sarah Johnson",
    action: "Offer Premium Credit Card upgrade",
    reason: "High spending pattern and excellent payment history qualifies for premium tier",
    priority: "high",
    product: "Premium Visa Infinite",
    potentialValue: 15000,
  },
  {
    id: "nba_2",
    clientId: "user_retail_2",
    clientName: "Michael Chen",
    action: "Schedule portfolio rebalancing review",
    reason: "Tech holdings exceed 50% allocation, recommend diversification",
    priority: "medium",
    product: "Investment Advisory",
    potentialValue: 25000,
  },
  {
    id: "nba_3",
    clientId: "user_sme_1",
    clientName: "TechStart Solutions",
    action: "Propose credit line increase",
    reason: "Business growth of 40% YoY suggests need for additional working capital",
    priority: "high",
    product: "SME Credit Line",
    potentialValue: 200000,
  },
  {
    id: "nba_4",
    clientId: "user_retail_1",
    clientName: "Sarah Johnson",
    action: "Discuss mortgage pre-approval",
    reason: "Recent savings pattern and stable income suggest home purchase interest",
    priority: "low",
    product: "Home Loan",
    potentialValue: 500000,
  },
]

// Mock upcoming meetings
const upcomingMeetings = [
  {
    id: "meet_1",
    clientId: "user_retail_2",
    clientName: "Michael Chen",
    type: "video",
    date: "2024-12-20",
    time: "10:00 AM",
    topic: "Annual Review & 2025 Planning",
  },
  {
    id: "meet_2",
    clientId: "user_sme_1",
    clientName: "TechStart Solutions",
    type: "in_person",
    date: "2024-12-22",
    time: "2:00 PM",
    topic: "Credit Facility Review",
  },
]

export default function RMWorkspacePage() {
  const { role } = useRole()
  const [selectedClient, setSelectedClient] = useState<(typeof users)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [segmentFilter, setSegmentFilter] = useState<string>("all")

  // Filter clients assigned to this RM
  const rmClients = users.filter((u) => u.rmId === "user_rm_1")

  const filteredClients = rmClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSegment = segmentFilter === "all" || client.segment === segmentFilter
    return matchesSearch && matchesSegment
  })

  // Calculate portfolio metrics
  const totalAUM = accounts
    .filter((a) => rmClients.some((c) => c.id === a.userId))
    .reduce((sum, a) => sum + a.balance, 0)

  const getClientAccounts = (userId: string) => accounts.filter((a) => a.userId === userId)
  const getClientLoans = (userId: string) => loans.filter((l) => l.userId === userId)
  const getClientCards = (userId: string) => cards.filter((c) => c.userId === userId)
  const getClientInteractions = (userId: string) => clientInteractions.filter((i) => i.clientId === userId)

  // Check if user has RM role
  if (role !== "relationship_manager") {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
            <p className="text-muted-foreground">
              The RM Workspace is only available to Relationship Manager users. Please switch your role to access this
              section.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">RM Workspace</h1>
          <p className="text-muted-foreground">Manage your client portfolio and relationships</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="py-1.5">
            <Users className="h-3.5 w-3.5 mr-1.5" />
            {rmClients.length} Clients
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total AUM"
          value={formatCurrency(totalAUM, "AED")}
          icon={Wallet}
          description="Assets under management"
        />
        <StatCard
          title="Active Clients"
          value={rmClients.length.toString()}
          icon={Users}
          description="In your portfolio"
        />
        <StatCard
          title="Next Best Actions"
          value={nextBestActions.length.toString()}
          icon={Target}
          description="Pending opportunities"
          trend={{ value: 2, direction: "up" }}
        />
        <StatCard
          title="Upcoming Meetings"
          value={upcomingMeetings.length.toString()}
          icon={Calendar}
          description="This week"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Client Portfolio</CardTitle>
            <div className="flex gap-2 mt-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={segmentFilter} onValueChange={setSegmentFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="At Risk">At Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              <div className="px-4 pb-4 space-y-2">
                {filteredClients.map((client) => {
                  const clientAccounts = getClientAccounts(client.id)
                  const totalBalance = clientAccounts.reduce((sum, a) => sum + a.balance, 0)

                  return (
                    <div
                      key={client.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedClient?.id === client.id ? "bg-primary/10 border-primary" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedClient(client)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={client.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{client.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium truncate">{client.name}</p>
                            {client.segment === "VIP" && (
                              <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{formatCurrency(totalBalance, "AED")}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            client.segment === "VIP"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : client.segment === "At Risk"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                : ""
                          }
                        >
                          {client.segment}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Client 360 / Next Best Actions */}
        <div className="lg:col-span-2 space-y-6">
          {selectedClient ? (
            <Client360View
              client={selectedClient}
              accounts={getClientAccounts(selectedClient.id)}
              loans={getClientLoans(selectedClient.id)}
              cards={getClientCards(selectedClient.id)}
              interactions={getClientInteractions(selectedClient.id)}
            />
          ) : (
            <>
              {/* Next Best Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Next Best Actions
                  </CardTitle>
                  <CardDescription>AI-recommended opportunities for your clients</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {nextBestActions.map((nba) => (
                    <div key={nba.id} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{nba.clientName}</p>
                            <Badge
                              variant={
                                nba.priority === "high"
                                  ? "destructive"
                                  : nba.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {nba.priority}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-primary">{nba.action}</p>
                          <p className="text-sm text-muted-foreground mt-1">{nba.reason}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>Product: {nba.product}</span>
                            <span>Potential: {formatCurrency(nba.potentialValue, "AED")}</span>
                          </div>
                        </div>
                        <Button size="sm">
                          Take Action
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <CitationBadge
                      citation={{
                        id: "1",
                        source: "Client Analytics",
                        type: "account_ledger",
                      }}
                    />
                    <CitationBadge
                      citation={{
                        id: "2",
                        source: "Product Eligibility Rules",
                        type: "risk_rules",
                      }}
                    />
                    <CitationBadge
                      citation={{
                        id: "3",
                        source: "CRM History",
                        type: "crm_notes",
                      }}
                    />
                  </div>
                  <ConfidenceIndicator confidence="high" />
                </CardContent>
              </Card>

              {/* Upcoming Meetings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Meetings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {meeting.type === "video" ? (
                            <Video className="h-5 w-5 text-primary" />
                          ) : (
                            <Users className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{meeting.clientName}</p>
                          <p className="text-sm text-muted-foreground">{meeting.topic}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{meeting.date}</p>
                        <p className="text-xs text-muted-foreground">{meeting.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// Client 360 View Component
function Client360View({
  client,
  accounts,
  loans,
  cards,
  interactions,
}: {
  client: (typeof users)[0]
  accounts: typeof import("@/lib/mock-data").accounts
  loans: typeof import("@/lib/mock-data").loans
  cards: typeof import("@/lib/mock-data").cards
  interactions: typeof clientInteractions
}) {
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0)
  const totalLoans = loans.reduce((sum, l) => sum + l.remainingBalance, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={client.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-lg">{client.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>{client.name}</CardTitle>
                {client.segment === "VIP" && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                <Badge variant="outline">{client.segment}</Badge>
              </div>
              <CardDescription>{client.email}</CardDescription>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  KYC: {client.kycStatus}
                </Badge>
                <span className="text-xs text-muted-foreground">Client since {client.createdAt}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm">
                  <Bot className="h-4 w-4 mr-2" />
                  Meeting Brief
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>AI Meeting Brief</SheetTitle>
                  <SheetDescription>AI-generated summary for your next meeting with {client.name}</SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Client Overview</h4>
                    <p className="text-sm text-muted-foreground">
                      {client.name} is a {client.segment} segment client with total assets of{" "}
                      {formatCurrency(totalBalance, "AED")}. They have been a customer since {client.createdAt} and
                      currently hold {accounts.length} accounts, {cards.length} cards, and {loans.length} active loans.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Key Points to Discuss</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Credit card upgrade opportunity - spending pattern qualifies for Premium tier</li>
                      <li>• Loan payment ahead of schedule - acknowledge good financial behavior</li>
                      <li>• Discuss additional savings goals and investment options</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Recent Activity</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Increased savings deposits over last 3 months (+15%)</li>
                      <li>• International travel spending detected (Europe)</li>
                      <li>• No missed payments or overdrafts in past 12 months</li>
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <CitationBadge citation={{ id: "1", source: "Account Data", type: "account_ledger" }} />
                    <CitationBadge citation={{ id: "2", source: "CRM Notes", type: "crm_notes" }} />
                    <CitationBadge citation={{ id: "3", source: "Transaction History", type: "transaction_history" }} />
                  </div>
                  <ConfidenceIndicator confidence="high" />

                  <div className="flex items-start gap-2 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 text-sm">
                    <Shield className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-orange-700 dark:text-orange-300">
                      This brief is generated from allowed data sources only. Sensitive PII has been masked. Request
                      additional permissions for full document access.
                    </span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border text-center">
                <p className="text-2xl font-bold">{formatCurrency(totalBalance, "AED")}</p>
                <p className="text-sm text-muted-foreground">Total Assets</p>
              </div>
              <div className="p-4 rounded-lg border text-center">
                <p className="text-2xl font-bold">{formatCurrency(totalLoans, "AED")}</p>
                <p className="text-sm text-muted-foreground">Total Liabilities</p>
              </div>
              <div className="p-4 rounded-lg border text-center">
                <p className="text-2xl font-bold">{formatCurrency(totalBalance - totalLoans, "AED")}</p>
                <p className="text-sm text-muted-foreground">Net Worth</p>
              </div>
            </div>

            {/* Next Best Action for this client */}
            {nextBestActions
              .filter((nba) => nba.clientId === client.id)
              .slice(0, 2)
              .map((nba) => (
                <div key={nba.id} className="p-4 rounded-lg bg-primary/5 border-primary/20 border">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">Recommended Action</span>
                    <Badge variant={nba.priority === "high" ? "destructive" : "default"}>{nba.priority}</Badge>
                  </div>
                  <p className="font-medium">{nba.action}</p>
                  <p className="text-sm text-muted-foreground">{nba.reason}</p>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            {/* Accounts */}
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Accounts ({accounts.length})
              </h4>
              <div className="space-y-2">
                {accounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{account.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {account.type} • {account.currency}
                      </p>
                    </div>
                    <p className="font-medium">{formatCurrency(account.balance, account.currency)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cards */}
            {cards.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Cards ({cards.length})
                </h4>
                <div className="space-y-2">
                  {cards.map((card) => (
                    <div key={card.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium capitalize">
                          {card.type} {card.brand}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ****{card.lastFour} • Exp {card.expiryDate}
                        </p>
                      </div>
                      <Badge variant={card.status === "active" ? "default" : "secondary"}>{card.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loans */}
            {loans.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Loans ({loans.length})
                </h4>
                <div className="space-y-2">
                  {loans.map((loan) => (
                    <div key={loan.id} className="p-3 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium capitalize">{loan.type.replace("_", " ")} Loan</p>
                        <p className="font-medium">{formatCurrency(loan.remainingBalance, "AED")}</p>
                      </div>
                      <Progress value={((loan.amount - loan.remainingBalance) / loan.amount) * 100} className="h-1.5" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {(((loan.amount - loan.remainingBalance) / loan.amount) * 100).toFixed(0)}% repaid
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="interactions" className="space-y-4">
            <div className="space-y-3">
              {interactions.map((interaction) => (
                <div key={interaction.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      interaction.type === "call"
                        ? "bg-green-100 dark:bg-green-900"
                        : interaction.type === "email"
                          ? "bg-blue-100 dark:bg-blue-900"
                          : "bg-purple-100 dark:bg-purple-900"
                    }`}
                  >
                    {interaction.type === "call" ? (
                      <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : interaction.type === "email" ? (
                      <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium capitalize">{interaction.type}</p>
                      <span className="text-xs text-muted-foreground">{interaction.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{interaction.summary}</p>
                    {interaction.duration && (
                      <p className="text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {interaction.duration}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              <MessageSquare className="h-4 w-4 mr-2" />
              Add Interaction Note
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
