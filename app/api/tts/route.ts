import { NextResponse } from "next/server"

export const runtime = "nodejs"

/**
 * TTS API endpoint for voice assist mode
 * Uses Vapi's API to generate speech, or returns text for browser TTS
 */
export async function POST(req: Request) {
  try {
    const { text, useVapi = false } = await req.json()
    
    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'text' parameter" },
        { status: 400 }
      )
    }
    
    // For now, we'll return the text and let the client handle TTS
    // Vapi doesn't have a standalone TTS API, so we use browser TTS
    // In the future, we could integrate with Vapi's voice call API or another TTS service
    
    // If useVapi is true, we could potentially use Vapi's API to make a voice call
    // But for now, we'll use browser TTS as it's simpler and works well
    
    return NextResponse.json({
      success: true,
      text: text,
      method: "browser-tts", // Indicates client should use browser TTS
    })
  } catch (error: any) {
    console.error("[TTS] Error:", error)
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}

