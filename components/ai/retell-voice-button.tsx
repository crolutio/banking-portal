"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { RetellWebClient } from "retell-client-js-sdk"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Loader2 } from "lucide-react"

interface TranscriptMessage {
  role: "agent" | "user"
  content: string
  words?: Array<{ word: string; start: number; end: number }>
}

interface RetellVoiceButtonProps {
  /**
   * Called when a final transcript is received from the user
   */
  onFinalTranscript?: (text: string) => void
  /**
   * Called with real-time user transcript updates (partial)
   */
  onUserTranscript?: (text: string) => void
  /**
   * Called with real-time agent transcript updates
   */
  onAgentTranscript?: (text: string) => void
  /**
   * Called when the call ends
   */
  onCallEnd?: () => void
  /**
   * Called when the call starts successfully
   */
  onCallStart?: (callId: string) => void
  /**
   * Called with full transcript updates (both user and agent messages)
   */
  onTranscriptUpdate?: (messages: TranscriptMessage[]) => void
  /**
   * Optional metadata to attach to the call
   */
  metadata?: Record<string, unknown>
  /**
   * Dynamic variables to inject into the agent prompt
   */
  dynamicVariables?: Record<string, string>
  /**
   * Optional custom agent ID (overrides env variable)
   */
  agentId?: string
  /**
   * Variant for the button
   */
  variant?: "default" | "outline" | "ghost" | "secondary"
  /**
   * Size of the button
   */
  size?: "default" | "sm" | "lg" | "icon"
  /**
   * Additional className
   */
  className?: string
}

export function RetellVoiceButton({
  onFinalTranscript,
  onUserTranscript,
  onAgentTranscript,
  onCallEnd,
  onCallStart,
  onTranscriptUpdate,
  metadata,
  dynamicVariables,
  agentId,
  variant = "outline",
  size = "icon",
  className,
}: RetellVoiceButtonProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const retellClientRef = useRef<RetellWebClient | null>(null)
  const currentCallIdRef = useRef<string | null>(null)
  const transcriptRef = useRef<TranscriptMessage[]>([])

  // Initialize Retell client on mount
  useEffect(() => {
    retellClientRef.current = new RetellWebClient()
    
    const client = retellClientRef.current

    // Call lifecycle events
    client.on("call_started", () => {
      console.log("[Retell] Call started")
      setIsConnected(true)
      setIsStarting(false)
      setError(null)
      transcriptRef.current = []
    })

    client.on("call_ended", () => {
      console.log("[Retell] Call ended")
      setIsConnected(false)
      setIsStarting(false)
      setIsSpeaking(false)
      currentCallIdRef.current = null
      onCallEnd?.()
    })

    // Speaking events for UI feedback
    client.on("agent_start_talking", () => {
      console.log("[Retell] Agent started talking")
      setIsSpeaking(true)
    })

    client.on("agent_stop_talking", () => {
      console.log("[Retell] Agent stopped talking")
      setIsSpeaking(false)
    })

    // Transcript updates
    client.on("update", (update: { transcript?: TranscriptMessage[] }) => {
      if (update.transcript) {
        transcriptRef.current = update.transcript
        onTranscriptUpdate?.(update.transcript)

        // Process the latest messages
        const messages = update.transcript
        if (messages.length > 0) {
          const lastMessage = messages[messages.length - 1]
          
          if (lastMessage.role === "user") {
            onUserTranscript?.(lastMessage.content)
            // For final transcripts, we check if this is a complete utterance
            // Retell sends updates incrementally, the last user message is usually final
            onFinalTranscript?.(lastMessage.content)
          } else if (lastMessage.role === "agent") {
            onAgentTranscript?.(lastMessage.content)
          }
        }
      }
    })

    // Error handling
    client.on("error", (err: Error) => {
      console.error("[Retell] Error:", err)
      setError(err.message || "An error occurred")
      setIsStarting(false)
      setIsConnected(false)
      client.stopCall()
    })

    return () => {
      // Cleanup on unmount
      if (retellClientRef.current) {
        try {
          retellClientRef.current.stopCall()
        } catch {
          // Ignore cleanup errors
        }
      }
    }
  }, [onCallEnd, onFinalTranscript, onUserTranscript, onAgentTranscript, onTranscriptUpdate])

  // Start a new call
  const startCall = useCallback(async () => {
    if (!retellClientRef.current || isStarting || isConnected) return

    setIsStarting(true)
    setError(null)

    try {
      // Call our server endpoint to create a web call
      const response = await fetch("/api/retell/create-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId,
          metadata,
          dynamicVariables,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create call")
      }

      const { accessToken, callId } = await response.json()
      
      console.log("[Retell] Starting call with access token, callId:", callId)
      currentCallIdRef.current = callId

      // Start the call with the access token
      await retellClientRef.current.startCall({
        accessToken,
        sampleRate: 24000,
      })

      onCallStart?.(callId)
    } catch (err) {
      console.error("[Retell] Failed to start call:", err)
      setError(err instanceof Error ? err.message : "Failed to start call")
      setIsStarting(false)
    }
  }, [agentId, metadata, dynamicVariables, isStarting, isConnected, onCallStart])

  // Stop the current call
  const stopCall = useCallback(() => {
    if (retellClientRef.current) {
      retellClientRef.current.stopCall()
    }
  }, [])

  // Toggle call state
  const toggleCall = useCallback(() => {
    if (isConnected) {
      stopCall()
    } else {
      startCall()
    }
  }, [isConnected, startCall, stopCall])

  // Determine button state and icon
  const getButtonContent = () => {
    if (isStarting) {
      return <Loader2 className="h-4 w-4 animate-spin" />
    }
    if (isConnected) {
      return <MicOff className="h-4 w-4" />
    }
    return <Mic className="h-4 w-4" />
  }

  const getButtonTitle = () => {
    if (isStarting) return "Connecting to voice assistant..."
    if (isConnected) return isSpeaking ? "Agent is speaking... Click to end call" : "Listening... Click to end call"
    if (error) return `Error: ${error}. Click to retry`
    return "Start voice assistant"
  }

  return (
    <Button
      type="button"
      variant={isConnected ? "default" : variant}
      size={size}
      className={className}
      onClick={toggleCall}
      disabled={isStarting}
      title={getButtonTitle()}
    >
      {getButtonContent()}
    </Button>
  )
}
