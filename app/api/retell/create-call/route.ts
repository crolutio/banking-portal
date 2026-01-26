import { NextRequest, NextResponse } from "next/server"
import Retell from "retell-sdk"

/**
 * POST /api/retell/create-call
 * 
 * Creates a new Retell web call and returns the access token.
 * The access token is used by the client SDK to start the call.
 * 
 * Request body (optional):
 * - agentId: Override the default agent ID
 * - metadata: Custom metadata to attach to the call
 * - dynamicVariables: Variables to inject into the agent prompt
 */
export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RETELL_API_KEY
    
    if (!apiKey) {
      console.error("[Retell] Missing RETELL_API_KEY environment variable")
      return NextResponse.json(
        { error: "Retell API key not configured" },
        { status: 500 }
      )
    }

    // Parse request body for optional overrides
    let body: {
      agentId?: string
      metadata?: Record<string, unknown>
      dynamicVariables?: Record<string, string>
    } = {}
    
    try {
      body = await request.json()
    } catch {
      // Empty body is fine, we'll use defaults
    }

    const agentId = body.agentId || process.env.NEXT_PUBLIC_RETELL_AGENT_ID
    
    if (!agentId) {
      return NextResponse.json(
        { error: "Agent ID not provided and no default configured" },
        { status: 400 }
      )
    }

    // Initialize Retell client
    const client = new Retell({ apiKey })

    // Create the web call
    const webCallResponse = await client.call.createWebCall({
      agent_id: agentId,
      metadata: body.metadata,
      retell_llm_dynamic_variables: body.dynamicVariables,
    })

    console.log("[Retell] Web call created:", {
      callId: webCallResponse.call_id,
      agentId: webCallResponse.agent_id,
      status: webCallResponse.call_status,
    })

    return NextResponse.json({
      accessToken: webCallResponse.access_token,
      callId: webCallResponse.call_id,
      agentId: webCallResponse.agent_id,
      agentName: webCallResponse.agent_name,
    })
  } catch (error) {
    console.error("[Retell] Error creating web call:", error)
    
    // Handle Retell API errors
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to create web call" },
      { status: 500 }
    )
  }
}
