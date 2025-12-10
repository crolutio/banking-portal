"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { AIAgentId } from "@/lib/ai/agents"

type ChatState = "closed" | "minimized" | "normal" | "fullscreen"

interface FloatingChatContextType {
  isOpen: boolean
  chatState: ChatState
  initialMessage: string | null
  agentId: AIAgentId
  
  openChat: () => void
  closeChat: () => void
  minimizeChat: () => void
  normalizeChat: () => void
  fullscreenChat: () => void
  toggleFullscreen: () => void
  
  openChatWithMessage: (message: string, agent?: AIAgentId) => void
  setAgent: (agent: AIAgentId) => void
}

const FloatingChatContext = createContext<FloatingChatContextType | null>(null)

export function FloatingChatProvider({ children }: { children: ReactNode }) {
  const [chatState, setChatState] = useState<ChatState>("minimized")
  const [initialMessage, setInitialMessage] = useState<string | null>(null)
  const [agentId, setAgentId] = useState<AIAgentId>("banker")

  const openChat = useCallback(() => {
    setChatState("normal")
  }, [])

  const closeChat = useCallback(() => {
    setChatState("minimized")
  }, [])

  const minimizeChat = useCallback(() => {
    setChatState("minimized")
  }, [])

  const normalizeChat = useCallback(() => {
    setChatState("normal")
  }, [])

  const fullscreenChat = useCallback(() => {
    setChatState("fullscreen")
  }, [])

  const toggleFullscreen = useCallback(() => {
    setChatState((prev) => (prev === "fullscreen" ? "normal" : "fullscreen"))
  }, [])

  const openChatWithMessage = useCallback((message: string, agent: AIAgentId = "banker") => {
    setInitialMessage(message)
    setAgentId(agent)
    setChatState("normal")
  }, [])

  const setAgent = useCallback((agent: AIAgentId) => {
    setAgentId(agent)
  }, [])

  const value: FloatingChatContextType = {
    isOpen: chatState !== "closed",
    chatState,
    initialMessage,
    agentId,
    openChat,
    closeChat,
    minimizeChat,
    normalizeChat,
    fullscreenChat,
    toggleFullscreen,
    openChatWithMessage,
    setAgent,
  }

  return (
    <FloatingChatContext.Provider value={value}>
      {children}
    </FloatingChatContext.Provider>
  )
}

export function useFloatingChat() {
  const context = useContext(FloatingChatContext)
  if (!context) {
    throw new Error("useFloatingChat must be used within FloatingChatProvider")
  }
  return context
}

