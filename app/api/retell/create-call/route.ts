import { NextResponse } from "next/server"
import Retell from "retell-sdk"

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RETELL_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Missing RETELL_API_KEY" }, { status: 500 })
    }

    const body = await request.json()
    const agentId = body?.agentId || process.env.RETELL_AGENT_ID

    if (!agentId) {
      return NextResponse.json({ error: "Missing agentId" }, { status: 400 })
    }

    const client = new Retell({ apiKey })
    const webCallResponse = await client.call.createWebCall({
      agent_id: agentId,
      metadata: body?.metadata ?? {},
      retell_llm_dynamic_variables: body?.dynamicVariables ?? {},
    })

    return NextResponse.json({
      accessToken: webCallResponse.access_token,
      callId: webCallResponse.call_id,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create Retell call"
    console.error("[Retell] create-call error:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
