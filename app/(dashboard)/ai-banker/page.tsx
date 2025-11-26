"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import { CitationBadge, DataUsedBadges, ConfidenceIndicator } from "@/components/ai/citation-badge"
import { useRole } from "@/lib/role-context"
import { formatCurrency } from "@/lib/format"
import { accounts, transactions, policies } from "@/lib/mock-data"
import type { AIResponse, AIAction } from "@/lib/types"
import {
  Send,
  Bot,
  User,
  Pin,
  PinOff,
  Trash2,
  Plus,
  Wallet,
  Receipt,
  FileText,
  BookOpen,
  Database,
  ArrowRightLeft,
  AlertTriangle,
  CreditCard,
  FileCheck,
  UserPlus,
  Sparkles,
  MessageSquare,
  AlertCircle,
  Check,
  Loader2,
} from "lucide-react"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  response?: AIResponse
}

interface Chat {
  id: string
  title: string
  messages: ChatMessage[]
  pinned: boolean
  createdAt: Date
}

type ScopeOption = {
  id: string
  label: string
  icon: React.ElementType
}

const scopeOptions: ScopeOption[] = [
  { id: "accounts", label: "My Accounts", icon: Wallet },
  { id: "transactions", label: "Transactions", icon: Receipt },
  { id: "fees", label: "Fees & Policies", icon: FileText },
  { id: "products", label: "Product Terms", icon: BookOpen },
  { id: "all", label: "All Allowed Sources", icon: Database },
]

const suggestedPrompts = [
  "How much did I spend on restaurants this month?",
  "Why was I charged this fee?",
  "Can I afford a 3,000 AED monthly payment?",
  "Explain my credit card benefits",
  "What's my current account balance?",
  "Show me my recurring payments",
]

// Mock AI response generator
function generateAIResponse(query: string, scopes: string[]): AIResponse {
  const lowerQuery = query.toLowerCase()

  // Balance inquiry
  if (lowerQuery.includes("balance") || lowerQuery.includes("how much do i have")) {
    const userAccounts = accounts.filter((a) => a.userId === "user_retail_1")
    const totalBalance = userAccounts.reduce((sum, acc) => sum + acc.balance, 0)

    return {
      id: `resp_${Date.now()}`,
      message: `Based on your account information, here's your current balance summary:\n\n**Total Balance: ${formatCurrency(totalBalance, "AED")}**\n\n• Primary Current Account: ${formatCurrency(userAccounts[0]?.balance || 0, "AED")}\n• Savings Account: ${formatCurrency(userAccounts[1]?.balance || 0, "AED")}\n• USD Wallet: ${formatCurrency(userAccounts[2]?.balance || 0, "USD")}\n\nYour available balance may differ slightly due to pending transactions or holds.`,
      citations: [
        {
          id: "cit_1",
          source: "Account Ledger",
          type: "account_ledger",
          excerpt: "Real-time balance data as of today",
        },
        {
          id: "cit_2",
          source: "Transaction History",
          type: "transaction_history",
          excerpt: "Pending transactions calculated",
        },
      ],
      dataUsed: ["Accounts", "Transactions", "Balances"],
      confidence: "high",
      actions: [{ id: "act_1", type: "create_transfer", label: "Make a Transfer", data: {} }],
    }
  }

  // Restaurant spending
  if (lowerQuery.includes("restaurant") || lowerQuery.includes("dining") || lowerQuery.includes("food")) {
    const restaurantTxns = transactions.filter(
      (t) => t.accountId === "acc_1" && t.category === "restaurants" && t.type === "debit",
    )
    const total = restaurantTxns.reduce((sum, t) => sum + t.amount, 0)

    return {
      id: `resp_${Date.now()}`,
      message: `I've analyzed your restaurant and dining expenses for the current month:\n\n**Total Restaurant Spending: ${formatCurrency(total, "AED")}**\n\n**Breakdown by merchant:**\n${restaurantTxns
        .slice(0, 5)
        .map((t) => `• ${t.merchant}: ${formatCurrency(t.amount, "AED")} (${t.date})`)
        .join(
          "\n",
        )}\n\nThis represents approximately ${((total / 45750) * 100).toFixed(1)}% of your monthly spending. Compared to last month, your dining expenses have ${Math.random() > 0.5 ? "increased by 12%" : "decreased by 8%"}.`,
      citations: [
        {
          id: "cit_1",
          source: "Transaction History",
          type: "transaction_history",
          excerpt: "Categorized merchant transactions",
        },
        {
          id: "cit_2",
          source: "Spending Analytics",
          type: "account_ledger",
          excerpt: "Monthly spending comparison",
        },
      ],
      dataUsed: ["Transactions", "Merchant Categories", "Spending Patterns"],
      confidence: "high",
    }
  }

  // Fee inquiry
  if (lowerQuery.includes("fee") || lowerQuery.includes("charge") || lowerQuery.includes("why was i")) {
    const feePolicy = policies.find((p) => p.category === "fees")

    return {
      id: `resp_${Date.now()}`,
      message: `I found a recent fee on your account. Here's the explanation:\n\n**Transaction: Monthly Maintenance Fee**\n**Amount: AED 25**\n**Date: December 15, 2024**\n\n**Why this fee was charged:**\nAccording to our Account Fees policy (v${feePolicy?.version}), a monthly maintenance fee of AED 25 applies to current accounts. This fee is waived when you maintain a minimum balance of AED 5,000.\n\n**Your options:**\n• Maintain AED 5,000 minimum balance to waive future fees\n• Upgrade to Premium account (no maintenance fees)\n• Request a one-time fee reversal (subject to approval)\n\nWould you like me to help you with any of these options?`,
      citations: [
        {
          id: "cit_1",
          source: "Fees Policy v2.1",
          type: "policy",
          excerpt: "Monthly maintenance fee: AED 25 (waived with minimum balance of AED 5,000)",
        },
        {
          id: "cit_2",
          source: "Transaction Record",
          type: "transaction_history",
          excerpt: "Fee debit dated December 15, 2024",
        },
      ],
      dataUsed: ["Transactions", "Fee Policy", "Account Terms"],
      confidence: "high",
      actions: [{ id: "act_1", type: "dispute_charge", label: "Dispute This Fee", data: { amount: 25, type: "fee" } }],
    }
  }

  // Affordability check
  if (lowerQuery.includes("afford") || lowerQuery.includes("monthly payment") || lowerQuery.includes("can i")) {
    return {
      id: `resp_${Date.now()}`,
      message: `I've analyzed your finances to assess affordability for a **AED 3,000 monthly payment**:\n\n**Income Analysis:**\n• Average monthly income: AED 25,000\n• Current fixed expenses: AED 8,500\n• Variable spending (avg): AED 6,200\n• Existing loan payments: AED 1,521\n\n**Assessment:**\n✅ **You can likely afford this payment**\n\nAfter the new payment, you would have approximately AED 5,779 remaining each month, which represents a healthy buffer.\n\n**However, please note:**\n• Your debt-to-income ratio would increase to 38%\n• This is within our lending guidelines (max 50%)\n• Consider your emergency fund and savings goals\n\n⚠️ *This is an indicative assessment. A formal loan application requires complete documentation and approval.*`,
      citations: [
        {
          id: "cit_1",
          source: "Lending Policy v2.5",
          type: "policy",
          excerpt: "Maximum debt-to-income ratio: 50%",
        },
        {
          id: "cit_2",
          source: "Transaction Analysis",
          type: "transaction_history",
          excerpt: "Income and expense patterns from last 6 months",
        },
        {
          id: "cit_3",
          source: "Existing Loan Records",
          type: "account_ledger",
          excerpt: "Current loan obligations",
        },
      ],
      dataUsed: ["Transactions", "Loan Records", "Lending Policy", "Income Analysis"],
      confidence: "medium",
      actions: [{ id: "act_1", type: "start_loan_application", label: "Start Loan Application", data: {} }],
    }
  }

  // Credit card benefits
  if (lowerQuery.includes("credit card") || lowerQuery.includes("card benefits") || lowerQuery.includes("rewards")) {
    return {
      id: `resp_${Date.now()}`,
      message: `Here are the benefits of your **Premium Mastercard** (ending 8901):\n\n**Rewards Program:**\n• Earn 1 point per AED 5 spent\n• Current points balance: 12,450 points\n• Points value: ~AED 124.50\n\n**Travel Benefits:**\n• 4 complimentary airport lounge visits per year (2 remaining)\n• Travel insurance up to AED 500,000\n• No foreign transaction fees\n\n**Lifestyle Benefits:**\n• Concierge service 24/7\n• Dining discounts at 200+ restaurants\n• Valet parking at select locations\n\n**Card Details:**\n• Credit limit: AED 50,000\n• Current utilization: 25% (AED 12,450)\n• Annual fee: AED 500 (waived first year)\n\nYour next annual fee is due in June 2025.`,
      citations: [
        {
          id: "cit_1",
          source: "Premium Card Terms v3.0",
          type: "product_terms",
          excerpt: "Reward points: 1 point per AED 5 spent. Airport lounge access: 4 visits/year",
        },
        {
          id: "cit_2",
          source: "Card Account",
          type: "account_ledger",
          excerpt: "Current balance and utilization data",
        },
      ],
      dataUsed: ["Card Terms", "Account Data", "Rewards Balance"],
      confidence: "high",
      actions: [{ id: "act_1", type: "freeze_card", label: "Manage Card", data: {} }],
    }
  }

  // Recurring payments
  if (
    lowerQuery.includes("recurring") ||
    lowerQuery.includes("subscription") ||
    lowerQuery.includes("regular payment")
  ) {
    return {
      id: `resp_${Date.now()}`,
      message: `I've identified the following recurring payments on your accounts:\n\n**Monthly Subscriptions:**\n• Netflix: AED 55 (25th of each month)\n• Spotify: AED 22 (15th of each month)\n• Apple Music: AED 20 (3rd of each month)\n\n**Utilities:**\n• DEWA: ~AED 450 (variable, around 28th)\n• Etisalat: AED 399 (1st of each month)\n\n**Loan Payments:**\n• Personal Loan: AED 1,521.25 (15th of each month)\n\n**Total Monthly Recurring: ~AED 2,467.25**\n\nI noticed your Spotify subscription increased by AED 5 last month. Would you like me to alert you about future price changes?`,
      citations: [
        {
          id: "cit_1",
          source: "Transaction History",
          type: "transaction_history",
          excerpt: "Recurring transaction patterns detected",
        },
        {
          id: "cit_2",
          source: "Loan Records",
          type: "account_ledger",
          excerpt: "Scheduled loan payments",
        },
      ],
      dataUsed: ["Transactions", "Loan Records", "Payment Schedule"],
      confidence: "high",
    }
  }

  // Default response for unrecognized queries
  return {
    id: `resp_${Date.now()}`,
    message: `I understand you're asking about: "${query}"\n\nI've searched through your allowed data sources but couldn't find a specific answer to your question. Here's what I can help you with:\n\n• **Account balances and transactions** - Check your current balance, recent spending, or transaction history\n• **Fees and charges** - Explain any fees or help dispute charges\n• **Card management** - Benefits, limits, freeze/unfreeze cards\n• **Loans and affordability** - Check eligibility, understand terms\n• **Payments and transfers** - Help set up transfers or recurring payments\n\nCould you please rephrase your question or select one of the topics above?`,
    citations: [],
    dataUsed: scopes.includes("all") ? ["Accounts", "Transactions", "Policies", "Products"] : scopes,
    confidence: "low",
    requiresEscalation: true,
  }
}

export default function AIBankerPage() {
  const { role } = useRole()
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "chat_1",
      title: "New Conversation",
      messages: [],
      pinned: false,
      createdAt: new Date(),
    },
  ])
  const [activeChat, setActiveChat] = useState("chat_1")
  const [input, setInput] = useState("")
  const [selectedScopes, setSelectedScopes] = useState<string[]>(["all"])
  const [isTyping, setIsTyping] = useState(false)
  const [actionSheet, setActionSheet] = useState<AIAction | null>(null)
  const [escalateDialog, setEscalateDialog] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentChat = chats.find((c) => c.id === activeChat)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentChat?.messages])

  const handleSend = async () => {
    if (!input.trim() || !currentChat) return

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    // Update chat with user message
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === activeChat) {
          const isFirstMessage = chat.messages.length === 0
          return {
            ...chat,
            title: isFirstMessage ? input.trim().slice(0, 30) + "..." : chat.title,
            messages: [...chat.messages, userMessage],
          }
        }
        return chat
      }),
    )

    setInput("")
    setIsTyping(true)

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const aiResponse = generateAIResponse(input.trim(), selectedScopes)
    const assistantMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: "assistant",
      content: aiResponse.message,
      timestamp: new Date(),
      response: aiResponse,
    }

    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === activeChat) {
          return {
            ...chat,
            messages: [...chat.messages, assistantMessage],
          }
        }
        return chat
      }),
    )

    setIsTyping(false)
  }

  const handleNewChat = () => {
    const newChat: Chat = {
      id: `chat_${Date.now()}`,
      title: "New Conversation",
      messages: [],
      pinned: false,
      createdAt: new Date(),
    }
    setChats((prev) => [...prev, newChat])
    setActiveChat(newChat.id)
  }

  const handlePinChat = (chatId: string) => {
    setChats((prev) => prev.map((chat) => (chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat)))
  }

  const handleDeleteChat = (chatId: string) => {
    if (chats.length === 1) {
      // Don't delete the last chat, just clear it
      setChats([
        {
          id: "chat_1",
          title: "New Conversation",
          messages: [],
          pinned: false,
          createdAt: new Date(),
        },
      ])
      setActiveChat("chat_1")
      return
    }

    setChats((prev) => prev.filter((chat) => chat.id !== chatId))
    if (activeChat === chatId) {
      const remainingChats = chats.filter((chat) => chat.id !== chatId)
      setActiveChat(remainingChats[0]?.id || "")
    }
  }

  const toggleScope = (scopeId: string) => {
    if (scopeId === "all") {
      setSelectedScopes(["all"])
    } else {
      setSelectedScopes((prev) => {
        const withoutAll = prev.filter((s) => s !== "all")
        if (withoutAll.includes(scopeId)) {
          const newScopes = withoutAll.filter((s) => s !== scopeId)
          return newScopes.length === 0 ? ["all"] : newScopes
        }
        return [...withoutAll, scopeId]
      })
    }
  }

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt)
  }

  const sortedChats = [...chats].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return b.createdAt.getTime() - a.createdAt.getTime()
  })

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4 p-4">
      {/* Left Panel - Chat History */}
      <Card className="w-72 flex-shrink-0 flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Chats
            </CardTitle>
            <Button size="sm" variant="ghost" onClick={handleNewChat}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full px-4 pb-4">
            <div className="space-y-2">
              {sortedChats.map((chat) => (
                <div
                  key={chat.id}
                  className={cn(
                    "group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors",
                    activeChat === chat.id ? "bg-primary/10 text-primary" : "hover:bg-muted",
                  )}
                  onClick={() => setActiveChat(chat.id)}
                >
                  {chat.pinned && <Pin className="h-3 w-3 text-primary flex-shrink-0" />}
                  <span className="flex-1 truncate text-sm">{chat.title}</span>
                  <div className="hidden group-hover:flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePinChat(chat.id)
                      }}
                    >
                      {chat.pinned ? <PinOff className="h-3 w-3" /> : <Pin className="h-3 w-3" />}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 text-destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteChat(chat.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Right Panel - Chat Window */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg">AI Banker</CardTitle>
                <p className="text-xs text-muted-foreground">Your personal banking assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                {role === "retail_customer" || role === "sme_customer" ? "Customer Mode" : "Staff Mode"}
              </Badge>
            </div>
          </div>
        </CardHeader>

        {/* Scope Selector */}
        <div className="px-4 py-3 border-b bg-muted/30">
          <p className="text-xs text-muted-foreground mb-2">Search scope:</p>
          <div className="flex flex-wrap gap-2">
            {scopeOptions.map((scope) => {
              const Icon = scope.icon
              const isSelected = selectedScopes.includes(scope.id)
              return (
                <Badge
                  key={scope.id}
                  variant={isSelected ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-colors py-1.5 px-3",
                    isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                  onClick={() => toggleScope(scope.id)}
                >
                  <Icon className="h-3 w-3 mr-1.5" />
                  {scope.label}
                </Badge>
              )
            })}
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 px-4">
          <div className="py-4 space-y-6">
            {currentChat?.messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">How can I help you today?</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-md">
                  I can help you check balances, explain fees, make transfers, and more. All my answers include
                  citations so you know where the information comes from.
                </p>
                <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                  {suggestedPrompts.map((prompt, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10 py-2 px-3 text-sm"
                      onClick={() => handleSuggestedPrompt(prompt)}
                    >
                      {prompt}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              currentChat?.messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  {message.role === "assistant" && (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}

                  <div className={cn("max-w-[80%] space-y-3", message.role === "user" ? "items-end" : "items-start")}>
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3",
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>

                    {/* AI Response Metadata */}
                    {message.response && (
                      <div className="space-y-3 px-1">
                        {/* Citations */}
                        {message.response.citations.length > 0 && (
                          <div className="space-y-1.5">
                            <p className="text-xs font-medium text-muted-foreground">Sources:</p>
                            <div className="flex flex-wrap gap-1.5">
                              {message.response.citations.map((citation) => (
                                <CitationBadge key={citation.id} citation={citation} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Data Used */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs text-muted-foreground">Data used:</span>
                          <DataUsedBadges dataUsed={message.response.dataUsed} />
                        </div>

                        {/* Confidence & Escalation */}
                        <div className="flex items-center gap-4">
                          <ConfidenceIndicator confidence={message.response.confidence} />
                          {message.response.requiresEscalation && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs h-7 text-orange-600 hover:text-orange-700"
                              onClick={() => setEscalateDialog(true)}
                            >
                              <UserPlus className="h-3 w-3 mr-1" />
                              Escalate to Human
                            </Button>
                          )}
                        </div>

                        {/* Action Cards */}
                        {message.response.actions && message.response.actions.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {message.response.actions.map((action) => (
                              <Sheet key={action.id}>
                                <SheetTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 bg-transparent"
                                    onClick={() => setActionSheet(action)}
                                  >
                                    {action.type === "create_transfer" && <ArrowRightLeft className="h-3.5 w-3.5" />}
                                    {action.type === "dispute_charge" && <AlertTriangle className="h-3.5 w-3.5" />}
                                    {action.type === "freeze_card" && <CreditCard className="h-3.5 w-3.5" />}
                                    {action.type === "start_loan_application" && <FileCheck className="h-3.5 w-3.5" />}
                                    {action.label}
                                  </Button>
                                </SheetTrigger>
                                <SheetContent>
                                  <SheetHeader>
                                    <SheetTitle>{action.label}</SheetTitle>
                                    <SheetDescription>
                                      Review and confirm this action. All actions require your explicit confirmation.
                                    </SheetDescription>
                                  </SheetHeader>
                                  <div className="py-6">
                                    <ActionForm action={action} />
                                  </div>
                                  <SheetFooter>
                                    <SheetClose asChild>
                                      <Button variant="outline">Cancel</Button>
                                    </SheetClose>
                                    <SheetClose asChild>
                                      <Button>
                                        <Check className="h-4 w-4 mr-2" />
                                        Confirm Action
                                      </Button>
                                    </SheetClose>
                                  </SheetFooter>
                                </SheetContent>
                              </Sheet>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {message.role === "user" && (
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t bg-background">
          <div className="flex gap-3">
            <Input
              placeholder="Ask me anything about your accounts, transactions, or banking..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
              {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            AI responses include citations and may require verification. Sensitive data is masked by default.
          </p>
        </div>
      </Card>

      {/* Escalation Dialog */}
      <AlertDialog open={escalateDialog} onOpenChange={setEscalateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Escalate to Human Support
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your question will be forwarded to a human support agent who will respond within 2 business hours. They
              will have access to this conversation context to assist you better.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Escalate Now</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// Action Form Component for the Sheet
function ActionForm({ action }: { action: AIAction }) {
  switch (action.type) {
    case "create_transfer":
      return (
        <div className="space-y-4">
          <div className="rounded-lg border p-4 bg-muted/30">
            <p className="text-sm text-muted-foreground mb-4">
              Transfer details will be pre-filled based on your conversation. Please review before confirming.
            </p>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">From Account</label>
                <p className="text-sm">Primary Current Account (****7890)</p>
              </div>
              <Separator />
              <div>
                <label className="text-xs font-medium text-muted-foreground">To Account</label>
                <Input placeholder="Enter beneficiary or account" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Amount</label>
                <Input placeholder="Enter amount" type="number" />
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>This transfer requires your confirmation and may be subject to security checks.</span>
          </div>
        </div>
      )

    case "dispute_charge":
      return (
        <div className="space-y-4">
          <div className="rounded-lg border p-4 bg-muted/30">
            <p className="text-sm text-muted-foreground mb-4">
              Based on our conversation, I've pre-filled the dispute details below.
            </p>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Transaction</label>
                <p className="text-sm">Monthly Maintenance Fee - AED 25</p>
              </div>
              <Separator />
              <div>
                <label className="text-xs font-medium text-muted-foreground">Dispute Reason</label>
                <Input
                  placeholder="Reason for dispute"
                  defaultValue="Fee should be waived - minimum balance maintained"
                />
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <FileText className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>Per Dispute Policy v1.3: Investigation will be completed within 45 days.</span>
          </div>
        </div>
      )

    case "freeze_card":
      return (
        <div className="space-y-4">
          <div className="rounded-lg border p-4 bg-muted/30">
            <p className="text-sm text-muted-foreground mb-4">Select an action for your card:</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Card</label>
                <p className="text-sm">Premium Mastercard (****8901)</p>
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Freeze Card
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Change Limits
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Replace Card
                </Button>
              </div>
            </div>
          </div>
        </div>
      )

    case "start_loan_application":
      return (
        <div className="space-y-4">
          <div className="rounded-lg border p-4 bg-muted/30">
            <p className="text-sm text-muted-foreground mb-4">
              Start your loan application. We'll pre-fill information from your profile.
            </p>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Loan Type</label>
                <p className="text-sm">Personal Loan</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Pre-Qualified Amount</label>
                <p className="text-sm">Up to AED 150,000</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Indicative Rate</label>
                <p className="text-sm">From 5.99% APR</p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>Final terms subject to full application and credit assessment. This is not a guaranteed offer.</span>
          </div>
        </div>
      )

    default:
      return <p>Action form not available</p>
  }
}
