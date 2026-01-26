import { useState, useEffect, useRef, useCallback } from "react"
import { RetellWebClient } from "retell-client-js-sdk"

export interface TranscriptMessage {
  role: "agent" | "user"
  content: string
  timestamp: number
}

export interface UseRetellVoiceOptions {
  /**
   * Optional custom agent ID (overrides env variable)
   */
  agentId?: string
  /**
   * Optional metadata to attach to the call
   */
  metadata?: Record<string, unknown>
  /**
   * Dynamic variables to inject into the agent prompt
   */
  dynamicVariables?: Record<string, string>
  /**
   * Callback when a message is received (user or agent)
   */
  onMessage?: (message: TranscriptMessage) => void
  /**
   * Callback when the call starts
   */
  onCallStart?: (callId: string) => void
  /**
   * Callback when the call ends
   */
  onCallEnd?: (transcript: TranscriptMessage[]) => void
  /**
   * Callback on error
   */
  onError?: (error: Error) => void
}

export interface UseRetellVoiceReturn {
  /**
   * Whether a call is currently active
   */
  isConnected: boolean
  /**
   * Whether the call is being established
   */
  isConnecting: boolean
  /**
   * Whether the agent is currently speaking
   */
  isSpeaking: boolean
  /**
   * Full transcript of the current call
   */
  transcript: TranscriptMessage[]
  /**
   * Current error, if any
   */
  error: string | null
  /**
   * Current call ID
   */
  callId: string | null
  /**
   * Start a voice call
   */
  startCall: () => Promise<void>
  /**
   * End the current call
   */
  endCall: () => void
  /**
   * Toggle call state (start if not connected, end if connected)
   */
  toggleCall: () => void
}

/**
 * Hook to manage Retell AI voice calls with real-time transcription
 */
export function useRetellVoice(options: UseRetellVoiceOptions = {}): UseRetellVoiceReturn {
  const {
    agentId,
    metadata,
    dynamicVariables,
    onMessage,
    onCallStart,
    onCallEnd,
    onError,
  } = options

  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [callId, setCallId] = useState<string | null>(null)

  const retellClientRef = useRef<RetellWebClient | null>(null)
  const lastProcessedIndexRef = useRef<number>(0)

  // Initialize Retell client on mount
  useEffect(() => {
    retellClientRef.current = new RetellWebClient()
    const client = retellClientRef.current

    client.on("call_started", () => {
      console.log("[Retell Hook] Call started")
      setIsConnected(true)
      setIsConnecting(false)
      setError(null)
      setTranscript([])
      lastProcessedIndexRef.current = 0
    })

    client.on("call_ended", () => {
      console.log("[Retell Hook] Call ended")
      const finalTranscript = [...transcript]
      setIsConnected(false)
      setIsConnecting(false)
      setIsSpeaking(false)
      onCallEnd?.(finalTranscript)
    })

    client.on("agent_start_talking", () => {
      setIsSpeaking(true)
    })

    client.on("agent_stop_talking", () => {
      setIsSpeaking(false)
    })

    client.on("update", (update: { transcript?: Array<{ role: string; content: string }> }) => {
      if (update.transcript && update.transcript.length > 0) {
        const newMessages: TranscriptMessage[] = update.transcript.map((msg) => ({
          role: msg.role as "agent" | "user",
          content: msg.content,
          timestamp: Date.now(),
        }))

        setTranscript(newMessages)

        // Notify about new messages only
        if (newMessages.length > lastProcessedIndexRef.current) {
          for (let i = lastProcessedIndexRef.current; i < newMessages.length; i++) {
            onMessage?.(newMessages[i])
          }
          lastProcessedIndexRef.current = newMessages.length
        }
      }
    })

    client.on("error", (err: Error) => {
      console.error("[Retell Hook] Error:", err)
      const errorMessage = err.message || "An error occurred"
      setError(errorMessage)
      setIsConnecting(false)
      setIsConnected(false)
      onError?.(err)
    })

    return () => {
      try {
        retellClientRef.current?.stopCall()
      } catch {
        // Ignore cleanup errors
      }
    }
  }, [onCallEnd, onMessage, onError, transcript])

  const startCall = useCallback(async () => {
    if (!retellClientRef.current || isConnecting || isConnected) return

    setIsConnecting(true)
    setError(null)

    try {
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

      const { accessToken, callId: newCallId } = await response.json()
      
      console.log("[Retell Hook] Starting call:", newCallId)
      setCallId(newCallId)

      await retellClientRef.current.startCall({
        accessToken,
        sampleRate: 24000,
      })

      onCallStart?.(newCallId)
    } catch (err) {
      console.error("[Retell Hook] Failed to start:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to start call"
      setError(errorMessage)
      setIsConnecting(false)
      onError?.(err instanceof Error ? err : new Error(errorMessage))
    }
  }, [agentId, metadata, dynamicVariables, isConnecting, isConnected, onCallStart, onError])

  const endCall = useCallback(() => {
    retellClientRef.current?.stopCall()
    setCallId(null)
  }, [])

  const toggleCall = useCallback(() => {
    if (isConnected) {
      endCall()
    } else {
      startCall()
    }
  }, [isConnected, startCall, endCall])

  return {
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,
    error,
    callId,
    startCall,
    endCall,
    toggleCall,
  }
}
