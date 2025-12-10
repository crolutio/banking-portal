"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Sparkles } from "lucide-react"
import { useFloatingChat } from "@/components/ai/floating-chat-context"
import { AI_AGENT_THEMES } from "@/components/ai/ai-banker-chat-interface"
import { AI_AGENT_PERSONAS, type AIAgentId } from "@/lib/ai/agents"

interface AskAIBankerWidgetProps {
  questions: string[]
  title?: string
  description?: string
  agentId?: AIAgentId
}

export function AskAIBankerWidget({
  questions,
  title,
  description,
  agentId = "banker"
}: AskAIBankerWidgetProps) {
  const theme = AI_AGENT_THEMES[agentId] ?? AI_AGENT_THEMES.banker
  const persona = AI_AGENT_PERSONAS[agentId] ?? AI_AGENT_PERSONAS.banker
  const displayTitle = title || `Ask ${persona.title}`
  const displayDescription = description || persona.shortDescription
  const { openChatWithMessage } = useFloatingChat()

  const handleQuestionClick = (question: string) => {
    openChatWithMessage(question, agentId)
  }

  return (
    <Card
      className="border rounded-2xl"
      style={{
        backgroundImage: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
        borderColor: theme.accentMuted
      }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <theme.icon className="h-5 w-5" style={{ color: theme.accent }} />
            <CardTitle className="text-lg">{displayTitle}</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={() => openChatWithMessage("", agentId)}>
            <MessageSquare className="h-5 w-5" style={{ color: theme.accent }} />
          </Button>
        </div>
        <CardDescription>{displayDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {questions.map((question) => (
            <Button
              key={question}
              variant="secondary"
              size="sm"
              className="text-xs h-auto py-2 px-3 whitespace-normal text-left justify-start w-full"
              style={{
                borderColor: theme.accent,
                color: theme.accent
              }}
              onClick={() => handleQuestionClick(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function AskAIButton({ 
  initialQuestion, 
  children,
  className,
  agentId = "banker"
}: { 
  initialQuestion?: string
  children?: React.ReactNode 
  className?: string
  agentId?: AIAgentId
}) {
  const theme = AI_AGENT_THEMES[agentId] ?? AI_AGENT_THEMES.banker
  const { openChatWithMessage } = useFloatingChat()

  const handleClick = () => {
    openChatWithMessage(initialQuestion || "", agentId)
  }

  if (children) {
    return <div onClick={handleClick}>{children}</div>
  }

  return (
    <Button variant="ghost" size="icon" className={className} onClick={handleClick}>
      <Sparkles className="h-4 w-4" style={{ color: theme.accent }} />
    </Button>
  )
}
