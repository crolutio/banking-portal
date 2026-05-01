"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { HelpCircle, Copy, Send, Sparkles } from "lucide-react"
import { useFloatingChat } from "@/components/ai/floating-chat-context"
import type { AIAgentId } from "@/lib/ai/agents"

interface DemoTip {
  title: string
  tips: Array<{
    prompt: string
    agentId?: AIAgentId
    description?: string
  }>
}

const demoTips: Record<string, DemoTip> = {
  "/home": {
    title: "Home",
    tips: [
      {
        prompt: "Review suspicious transactions",
        agentId: "banker",
        description: "Nobu London verification flow"
      },
      {
        prompt: "Review this transaction: Nobu London for 6200 on 2026-01-15",
        agentId: "banker",
        description: "Asks 'Was this you?' Reply yes/no to trigger follow-up actions"
      }
    ]
  },
  "/loans": {
    title: "Loans",
    tips: [
      { 
        prompt: "I want to take a loan for my Japan trip",
        agentId: "spending_analyst",
        description: "Checks savings before suggesting a loan"
      },
      {
        prompt: "I want to apply for a 50000 AED loan",
        agentId: "loan_advisor",
        description: "Pre-approval assessment with loan approval card"
      },
      {
        prompt: "Simulate the payment schedule for a loan of AED 50,000 at 5.99% APR over 24 months",
        agentId: "loan_advisor",
        description: "Amortization table with principal and interest"
      }
    ]
  },
  "/cards": {
    title: "Cards",
    tips: [
      { 
        prompt: "I think my virtual card is compromised",
        agentId: "banker",
        description: "Cancel, reissue, and secure subscriptions"
      },
      {
        prompt: "I didn't authorize the Apple US Store transaction; please dispute it",
        agentId: "banker",
        description: "Starts dispute case and shows confirmation card"
      },
      {
        prompt: "I'm traveling to London next week",
        agentId: "banker",
        description: "Travel card, fees, and currency advice"
      }
    ]
  },
  "/accounts": {
    title: "Accounts",
    tips: [
      { 
        prompt: "Auto-boost my Japan trip goal without changing my lifestyle",
        agentId: "savings_coach",
        description: "Subscriptions + round-ups + payday sweep"
      },
      {
        prompt: "Analyze my spending and find savings opportunities",
        agentId: "spending_analyst",
        description: "Savings optimization card and recommendations"
      },
      {
        prompt: "How can I avoid an overdraft this month?",
        agentId: "banker",
        description: "Overdraft prevention action demo"
      }
    ]
  },
  "/investments": {
    title: "Investments",
    tips: [
      { 
        prompt: "Explain the market-shock protection you activated",
        agentId: "investmentor",
        description: "Auto risk shift, hedge, and scheduled unwind"
      }
    ]
  },
  "/savings-goals": {
    title: "Savings goals",
    tips: [
      { 
        prompt: "Auto-boost my Japan trip goal without changing my lifestyle",
        agentId: "savings_coach",
        description: "Subscriptions + round-ups + payday sweep"
      }
    ]
  },
  "/rewards": {
    title: "Rewards",
    tips: [
      { 
        prompt: "I'm traveling—maximize my points for this trip",
        agentId: "banker",
        description: "Best card, default switch, and redemption"
      }
    ]
  }
}

export function DemoHelpTooltip() {
  const pathname = usePathname()
  const [copied, setCopied] = useState<string | null>(null)
  const { openChatWithMessage } = useFloatingChat()

  const currentTips = demoTips[pathname] || {
    title: "This page",
    tips: [
      { prompt: "Review suspicious transactions", description: "Nobu London verification flow" }
    ]
  }

  const handleCopy = (prompt: string) => {
    navigator.clipboard.writeText(prompt)
    setCopied(prompt)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleSend = (prompt: string, agentId?: AIAgentId) => {
    openChatWithMessage(prompt, agentId || "banker")
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <HelpCircle className="h-4 w-4" />
            <span className="hidden md:inline text-xs">Quick prompts</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96" align="start">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-primary" />
                {currentTips.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                Pick a prompt to open chat with text filled in for you
              </p>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {currentTips.tips.map((tip, index) => (
                <div 
                  key={index}
                  className="p-3 border rounded-lg hover:bg-muted/50 transition-colors space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium break-words">
                        "{tip.prompt}"
                      </p>
                      {tip.description && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {tip.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 h-8 text-xs"
                      onClick={() => handleCopy(tip.prompt)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      {copied === tip.prompt ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1 h-8 text-xs"
                      onClick={() => handleSend(tip.prompt, tip.agentId)}
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Try it
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground text-left">
                Use Try it to open chat with the prompt ready to send
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>

    </>
  )
}

