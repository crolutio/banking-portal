"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useFloatingChat } from "@/components/ai/floating-chat-context"
import { LoanApprovalCard, OptimizationResultCard } from "@/components/ai/special-cards"
import { AI_AGENT_PERSONAS, type AIAgentId } from "@/lib/ai/agents"
import { useRole } from "@/lib/role-context"
import {
  Send,
  User,
  Loader2,
  X,
  Minimize2,
  Maximize2,
  Minimize,
  MessageSquare
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis, PieChart, Pie, Cell } from "recharts"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d']

const ChartRenderer = ({ data }: { data: any }) => {
  if (!data || !data.data || data.data.length === 0) return null

  if (data.type === 'bar') {
    return (
      <div className="w-full h-[200px] mt-2 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <RechartsTooltip />
            <Bar dataKey="value" fill="#000000" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  if (data.type === 'pie') {
    return (
      <div className="w-full h-[200px] mt-2 mb-4 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return null
}

const FormattedText = ({ text }: { text: string }) => {
  const parts = text.split(/(\*\*.*?\*\*|\n)/g)
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-bold text-foreground">{part.slice(2, -2)}</strong>
        }
        if (part === "\n") {
          return <br key={i} />
        }
        return part
      })}
    </span>
  )
}

const MessageContent = ({ content }: { content: string }) => {
  const parts = content.split(/(```(?:chart|loan-approval|optimization)[\s\S]*?```)/g)

  return (
    <div className="text-sm space-y-2">
      {parts.map((part, i) => {
        if (part.startsWith("```chart")) {
          try {
            const jsonStr = part.replace(/^```chart\s*/, "").replace(/```$/, "")
            const chartData = JSON.parse(jsonStr)
            return <ChartRenderer key={i} data={chartData} />
          } catch (e) {
            return null
          }
        }
        
        if (part.startsWith("```loan-approval")) {
          try {
            const jsonStr = part.replace(/^```loan-approval\s*/, "").replace(/```$/, "")
            const loanData = JSON.parse(jsonStr)
            return <LoanApprovalCard key={i} data={loanData} />
          } catch (e) {
            return null
          }
        }
        
        if (part.startsWith("```optimization")) {
          try {
            const jsonStr = part.replace(/^```optimization\s*/, "").replace(/```$/, "")
            const optimizationData = JSON.parse(jsonStr)
            return <OptimizationResultCard key={i} data={optimizationData} />
          } catch (e) {
            return null
          }
        }
        
        return <FormattedText key={i} text={part} />
      })}
    </div>
  )
}

const suggestedPrompts = [
  "I want to take a loan for my Japan trip",
  "Request a new loan for 50,000 AED",
  "Analyze my spending and find savings opportunities",
  "I'm traveling to London next week",
  "How much did I spend on restaurants this month?",
  "Can I afford a 3,000 AED monthly payment?",
]

export function FloatingChatBubble() {
  const pathname = usePathname()
  const { currentUser } = useRole()
  const { chatState, agentId, initialMessage, closeChat, minimizeChat, normalizeChat, toggleFullscreen } = useFloatingChat()
  const persona = AI_AGENT_PERSONAS[agentId] ?? AI_AGENT_PERSONAS.banker
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const hasSentInitialRef = useRef(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: "/api/chat",
    body: {
      userId: currentUser?.id,
      agentId,
      currentPage: pathname, // Send current page context
    },
  })

  // Auto-send initial message if provided
  useEffect(() => {
    if (initialMessage && !hasSentInitialRef.current && messages.length === 0) {
      hasSentInitialRef.current = true
      append({
        role: 'user',
        content: initialMessage
      })
    }
  }, [initialMessage, append, messages.length])

  // Reset initial message ref when minimized
  useEffect(() => {
    if (chatState === "minimized") {
      hasSentInitialRef.current = false
    }
  }, [chatState])

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    })
  }

  // Auto-scroll on new messages
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Also scroll when chat state changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToBottom()
    }, 100)
    return () => clearTimeout(timeoutId)
  }, [chatState])

  const handleSuggestedPrompt = (prompt: string) => {
    handleInputChange({ target: { value: prompt } } as any)
  }

  // Minimized state - small floating bubble in corner
  if (chatState === "minimized") {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Button
          size="lg"
          className="h-16 w-16 rounded-full shadow-2xl bg-primary hover:bg-primary/90 transition-all duration-500 hover:scale-110 hover:shadow-primary/50"
          onClick={normalizeChat}
        >
          <MessageSquare className="h-8 w-8 text-white" strokeWidth={2.5} />
        </Button>
        {messages.length > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold border-2 border-white shadow-lg animate-in zoom-in duration-500"
          >
            {messages.filter(m => m.role === 'assistant').length}
          </Badge>
        )}
      </div>
    )
  }

  // Normal state - wider chat on right side
  const isFullscreen = chatState === "fullscreen"
  const chatHeight = isFullscreen ? "h-[95vh]" : "h-[600px]"
  const chatWidth = isFullscreen ? "w-[95vw]" : "w-[480px]"
  const chatPosition = isFullscreen ? "top-[2.5vh] left-[2.5vw]" : "bottom-0 right-6"
  const chatRounded = isFullscreen ? "rounded-2xl" : "rounded-t-2xl"
  
  // Smooth transitions for size and position changes
  const transitionClass = "transition-all duration-300 ease-in-out"
  
  // Animation classes based on state
  const animationClass = isFullscreen 
    ? "animate-in fade-in slide-in-from-right-full duration-300" 
    : "animate-in slide-in-from-bottom-4 fade-in duration-300"

  return (
    <div 
      className={cn(
        "fixed shadow-2xl bg-background border flex flex-col z-50",
        chatHeight,
        chatWidth,
        chatPosition,
        chatRounded,
        transitionClass,
        animationClass
      )}
    >
      {/* Header */}
      <div 
        className={cn("flex items-center justify-between px-4 py-3 border-b bg-primary/5", chatRounded && "rounded-t-2xl")}
      >
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center shadow-sm bg-primary"
          >
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">{persona.title}</h3>
            <p className="text-xs text-muted-foreground">{persona.shortDescription}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={minimizeChat}
            title="Minimize"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={closeChat}
            title="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4 min-h-0">
        <div className="py-4 space-y-6">
          {!messages || messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
              <div
                className="h-16 w-16 rounded-full flex items-center justify-center mb-4 shadow-sm bg-primary"
              >
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">How can I help you today?</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md px-4">
                I can help you check balances, explain fees, make transfers, and more. All my answers include
                citations so you know where the information comes from.
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-lg px-4">
                {suggestedPrompts.slice(0, 4).map((prompt, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer py-2 px-3 text-xs border-primary text-primary hover:bg-primary/10 transition-colors"
                    onClick={() => handleSuggestedPrompt(prompt)}
                  >
                    {prompt}
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}
              >
                {message.role === "assistant" && (
                  <div
                    className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm bg-primary"
                  >
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                )}

                <div className={cn("max-w-[85%] space-y-3", message.role === "user" ? "items-end" : "items-start")}>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3",
                      message.role === "user" ? "bg-primary text-white" : "bg-muted",
                    )}
                  >
                    <MessageContent content={message.content} />
                  </div>
                </div>

                {message.role === "user" && (
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex gap-3">
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm bg-primary"
              >
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
              <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t bg-background">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(e)
          }}
          className="flex gap-3"
        >
          <Input
            placeholder="Type your message..."
            value={input || ""}
            onChange={handleInputChange}
            className="flex-1"
          />
          <Button type="submit" disabled={!input?.trim() || isLoading} className="bg-primary hover:bg-primary/90">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          AI responses are contextual to your current page
        </p>
      </div>
    </div>
  )
}

