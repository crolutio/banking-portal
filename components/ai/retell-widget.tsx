"use client"

import React, { useEffect, useState, useCallback, useRef } from "react"
import { RetellWebClient } from "retell-client-js-sdk"

interface TranscriptMessage {
  role: "agent" | "user"
  content: string
}

interface RetellWidgetProps {
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
   * Callback when transcript updates (for external integration)
   */
  onTranscriptUpdate?: (messages: TranscriptMessage[]) => void
  /**
   * Callback when call ends
   */
  onCallEnd?: (transcript: TranscriptMessage[]) => void
}

const RetellWidget: React.FC<RetellWidgetProps> = ({
  agentId,
  metadata,
  dynamicVariables,
  onTranscriptUpdate,
  onCallEnd,
}) => {
  const [isConnected, setIsConnected] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([])
  const [error, setError] = useState<string | null>(null)
  
  const retellClientRef = useRef<RetellWebClient | null>(null)
  const transcriptEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when transcript updates
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [transcript])

  // Initialize Retell client
  useEffect(() => {
    retellClientRef.current = new RetellWebClient()
    const client = retellClientRef.current

    client.on("call_started", () => {
      console.log("[Retell Widget] Call started")
      setIsConnected(true)
      setIsStarting(false)
      setError(null)
      setTranscript([])
    })

    client.on("call_ended", () => {
      console.log("[Retell Widget] Call ended")
      setIsConnected(false)
      setIsStarting(false)
      setIsSpeaking(false)
      // Pass final transcript to callback
      onCallEnd?.(transcript)
    })

    client.on("agent_start_talking", () => {
      setIsSpeaking(true)
    })

    client.on("agent_stop_talking", () => {
      setIsSpeaking(false)
    })

    client.on("update", (update: { transcript?: Array<{ role: string; content: string }> }) => {
      if (update.transcript) {
        const messages = update.transcript.map((msg) => ({
          role: msg.role as "agent" | "user",
          content: msg.content,
        }))
        setTranscript(messages)
        onTranscriptUpdate?.(messages)
      }
    })

    client.on("error", (err: Error) => {
      console.error("[Retell Widget] Error:", err)
      setError(err.message || "An error occurred")
      setIsStarting(false)
      setIsConnected(false)
    })

    return () => {
      try {
        retellClientRef.current?.stopCall()
      } catch {
        // Ignore cleanup errors
      }
    }
  }, [onCallEnd, onTranscriptUpdate, transcript])

  const startCall = useCallback(async () => {
    if (!retellClientRef.current || isStarting || isConnected) return

    setIsStarting(true)
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

      const { accessToken, callId } = await response.json()
      console.log("[Retell Widget] Starting call:", callId)

      await retellClientRef.current.startCall({
        accessToken,
        sampleRate: 24000,
      })
    } catch (err) {
      console.error("[Retell Widget] Failed to start:", err)
      setError(err instanceof Error ? err.message : "Failed to start call")
      setIsStarting(false)
    }
  }, [agentId, metadata, dynamicVariables, isStarting, isConnected])

  const endCall = useCallback(() => {
    retellClientRef.current?.stopCall()
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 1000,
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {!isConnected ? (
        <button
          onClick={startCall}
          disabled={isStarting}
          style={{
            background: isStarting ? "#9CA3AF" : "#6366F1",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            padding: "12px 20px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: isStarting ? "wait" : "pointer",
            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            opacity: isStarting ? 0.8 : 1,
          }}
          onMouseOver={(e) => {
            if (!isStarting) {
              e.currentTarget.style.transform = "translateY(-1px)"
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(99, 102, 241, 0.4)"
            }
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)"
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(99, 102, 241, 0.3)"
          }}
        >
          {isStarting ? (
            <>
              <span
                style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid #fff",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                  animation: "retell-spin 0.8s linear infinite",
                }}
              />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <span>🎤</span>
              <span>Talk to Assistant</span>
            </>
          )}
        </button>
      ) : (
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "16px",
            width: "340px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            border: "1px solid #e1e5e9",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: isSpeaking ? "#EF4444" : "#22C55E",
                  animation: isSpeaking ? "retell-pulse 1s infinite" : "none",
                }}
              />
              <span style={{ fontWeight: 600, color: "#111827", fontSize: "14px" }}>
                {isSpeaking ? "Agent Speaking..." : "Listening..."}
              </span>
            </div>
            <button
              onClick={endCall}
              style={{
                background: "#EF4444",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "6px 12px",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: 500,
                transition: "background 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#DC2626")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#EF4444")}
            >
              End Call
            </button>
          </div>

          {/* Error display */}
          {error && (
            <div
              style={{
                background: "#FEE2E2",
                color: "#DC2626",
                padding: "8px 12px",
                borderRadius: "6px",
                fontSize: "13px",
                marginBottom: "12px",
              }}
            >
              {error}
            </div>
          )}

          {/* Transcript */}
          <div
            style={{
              maxHeight: "240px",
              overflowY: "auto",
              padding: "12px",
              background: "#f9fafb",
              borderRadius: "8px",
            }}
          >
            {transcript.length === 0 ? (
              <p style={{ color: "#6b7280", fontSize: "13px", margin: 0, textAlign: "center" }}>
                Speak to start the conversation...
              </p>
            ) : (
              transcript.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "8px",
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "85%",
                      padding: "8px 12px",
                      borderRadius: msg.role === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                      background: msg.role === "user" ? "#6366F1" : "#E5E7EB",
                      color: msg.role === "user" ? "#fff" : "#111827",
                      fontSize: "13px",
                      lineHeight: "1.4",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            <div ref={transcriptEndRef} />
          </div>

          {/* Voice indicator */}
          <div
            style={{
              marginTop: "12px",
              display: "flex",
              justifyContent: "center",
              gap: "4px",
            }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width: "4px",
                  height: isSpeaking ? "16px" : "8px",
                  background: isSpeaking ? "#6366F1" : "#D1D5DB",
                  borderRadius: "2px",
                  transition: "height 0.15s ease",
                  animation: isSpeaking ? `retell-wave 0.5s ease-in-out infinite ${i * 0.1}s` : "none",
                }}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes retell-pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes retell-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes retell-wave {
          0%, 100% { height: 8px; }
          50% { height: 20px; }
        }
      `}</style>
    </div>
  )
}

export default RetellWidget
