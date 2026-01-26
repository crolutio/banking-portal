import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Retell webhook event types
interface RetellWebhookEvent {
  event: "call_started" | "call_ended" | "call_analyzed"
  call: {
    call_id: string
    agent_id: string
    call_status: string
    start_timestamp?: number
    end_timestamp?: number
    transcript?: string
    transcript_object?: Array<{
      role: "agent" | "user"
      content: string
      words?: Array<{
        word: string
        start: number
        end: number
      }>
    }>
    call_analysis?: {
      call_summary?: string
      user_sentiment?: "positive" | "negative" | "neutral"
      call_successful?: boolean
      custom_analysis_data?: Record<string, unknown>
    }
    metadata?: Record<string, unknown>
    retell_llm_dynamic_variables?: Record<string, string>
  }
}

export async function POST(request: NextRequest) {
  try {
    const event = (await request.json()) as RetellWebhookEvent
    
    console.log("[Retell Webhook] Received event:", event.event, {
      callId: event.call.call_id,
      agentId: event.call.agent_id,
      status: event.call.call_status,
    })

    // Handle different event types
    switch (event.event) {
      case "call_started":
        console.log("[Retell Webhook] Call started:", event.call.call_id)
        // You could log call start to database here
        break

      case "call_ended":
        console.log("[Retell Webhook] Call ended:", event.call.call_id)
        await handleCallEnded(event)
        break

      case "call_analyzed":
        console.log("[Retell Webhook] Call analyzed:", event.call.call_id)
        await handleCallAnalyzed(event)
        break

      default:
        console.log("[Retell Webhook] Unknown event type:", event.event)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Retell Webhook] Error processing webhook:", error)
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    )
  }
}

async function handleCallEnded(event: RetellWebhookEvent) {
  const { call } = event
  
  // Extract metadata (contains conversationId, customerId from our integration)
  const metadata = call.metadata || {}
  const conversationId = metadata.conversationId as string | undefined
  const customerId = metadata.customerId || metadata.userId as string | undefined
  
  // Format transcript for storage
  const transcriptText = call.transcript_object
    ?.map((msg) => `${msg.role === "user" ? "Customer" : "AI"}: ${msg.content}`)
    .join("\n") || call.transcript || ""

  console.log("[Retell Webhook] Processing call ended:", {
    callId: call.call_id,
    conversationId,
    customerId,
    transcriptLength: transcriptText.length,
    duration: call.end_timestamp && call.start_timestamp 
      ? Math.round((call.end_timestamp - call.start_timestamp) / 1000) + "s"
      : "unknown",
  })

  // If we have a conversation ID, save the transcript as a message
  if (conversationId && transcriptText) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_CALL_CENTER_SUPABASE_URL!,
        process.env.CALL_CENTER_SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_CALL_CENTER_SUPABASE_ANON_KEY!
      )

      // Add a system message with the voice call transcript
      await supabase.from("messages").insert({
        conversation_id: conversationId,
        content: `📞 Voice Call Transcript:\n\n${transcriptText}`,
        sender_type: "system",
        metadata: {
          type: "voice_transcript",
          call_id: call.call_id,
          duration: call.end_timestamp && call.start_timestamp 
            ? Math.round((call.end_timestamp - call.start_timestamp) / 1000)
            : null,
        },
      })

      console.log("[Retell Webhook] Saved transcript to conversation:", conversationId)
    } catch (dbError) {
      console.error("[Retell Webhook] Failed to save transcript:", dbError)
    }
  }
}

async function handleCallAnalyzed(event: RetellWebhookEvent) {
  const { call } = event
  const analysis = call.call_analysis

  if (!analysis) {
    console.log("[Retell Webhook] No analysis data in event")
    return
  }

  console.log("[Retell Webhook] Call analysis:", {
    callId: call.call_id,
    summary: analysis.call_summary?.substring(0, 100) + "...",
    sentiment: analysis.user_sentiment,
    successful: analysis.call_successful,
  })

  // Extract metadata
  const metadata = call.metadata || {}
  const conversationId = metadata.conversationId as string | undefined

  // If we have a conversation ID, update it with analysis
  if (conversationId && analysis.call_summary) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_CALL_CENTER_SUPABASE_URL!,
        process.env.CALL_CENTER_SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_CALL_CENTER_SUPABASE_ANON_KEY!
      )

      // Add analysis as a system note
      await supabase.from("messages").insert({
        conversation_id: conversationId,
        content: `📊 Voice Call Analysis:\n\nSummary: ${analysis.call_summary}\nSentiment: ${analysis.user_sentiment || "N/A"}\nResolved: ${analysis.call_successful ? "Yes" : "No"}`,
        sender_type: "system",
        metadata: {
          type: "voice_analysis",
          call_id: call.call_id,
          sentiment: analysis.user_sentiment,
          successful: analysis.call_successful,
        },
      })

      console.log("[Retell Webhook] Saved analysis to conversation:", conversationId)
    } catch (dbError) {
      console.error("[Retell Webhook] Failed to save analysis:", dbError)
    }
  }
}

// Retell may send a GET request to verify the webhook URL
export async function GET() {
  return NextResponse.json({ 
    status: "ok",
    message: "Retell webhook endpoint is active" 
  })
}
