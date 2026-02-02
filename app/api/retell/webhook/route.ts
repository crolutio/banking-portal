import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const eventType = payload?.event || payload?.event_type || payload?.type || "unknown"
    const callId = payload?.call_id || payload?.callId || payload?.data?.call_id || null

    console.log("[Retell Webhook] Event:", eventType, "Call:", callId)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[Retell Webhook] Invalid payload:", error)
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
