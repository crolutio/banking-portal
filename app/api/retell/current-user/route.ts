import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Helper to safely get a string value (handles null, undefined, empty)
function getString(value: unknown): string {
  if (value === null || value === undefined || value === "") return ""
  return String(value)
}

export async function POST(request: NextRequest) {
  try {
    // Log incoming request for debugging
    const headersProfileId = request.headers.get("x-profile-id")
    const headersCustomerId = request.headers.get("x-customer-id")
    const headersUserId = request.headers.get("x-user-id")

    let body: Record<string, unknown> = {}
    try {
      const text = await request.text()
      console.log("[Retell API] Raw request body:", text)
      if (text) {
        body = JSON.parse(text)
      }
    } catch (parseError) {
      console.log("[Retell API] Body parse error:", parseError)
      // empty body is fine
    }

    console.log("[Retell API] Parsed body:", JSON.stringify(body))
    console.log("[Retell API] Headers - profile_id:", headersProfileId, "customer_id:", headersCustomerId, "user_id:", headersUserId)

    // Extract values, handling null explicitly
    const customerId = getString(body.customer_id) || getString(headersCustomerId)
    const profileId =
      getString(body.profile_id) ||
      getString(body.user_id) ||
      getString(body.userId) ||
      getString(headersProfileId) ||
      getString(headersUserId)

    console.log("[Retell API] Resolved - customerId:", customerId, "profileId:", profileId)

    // If we have a customer_id directly, return it
    if (customerId) {
      const response = {
        profile_id: profileId || null,
        customer_id: customerId,
        source: "provided",
      }
      console.log("[Retell API] Returning provided customer_id:", response)
      return NextResponse.json(response)
    }

    // Need profileId to look up customer_id
    if (!profileId) {
      console.log("[Retell API] ERROR: No profileId or customerId found")
      return NextResponse.json(
        {
          error: "profile_id or customer_id is required",
          received_body: body,
          received_headers: { headersProfileId, headersCustomerId, headersUserId },
        },
        { status: 400 }
      )
    }

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.log("[Retell API] ERROR: Supabase not configured")
      return NextResponse.json(
        { error: "Supabase configuration missing" },
        { status: 500 }
      )
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    console.log("[Retell API] Looking up profile:", profileId)
    
    const { data, error } = await supabase
      .from("profiles")
      .select("id, customer_id, full_name, email")
      .eq("id", profileId)
      .maybeSingle()

    if (error) {
      console.error("[Retell API] Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to resolve profile", details: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      console.log("[Retell API] Profile not found for:", profileId)
      return NextResponse.json(
        { error: "Profile not found", profile_id: profileId },
        { status: 404 }
      )
    }

    const response = {
      profile_id: data.id,
      customer_id: data.customer_id,
      full_name: data.full_name,
      email: data.email,
      source: "profile_lookup",
    }
    console.log("[Retell API] SUCCESS:", response)
    return NextResponse.json(response)
  } catch (error) {
    console.error("[Retell API] Unexpected error:", error)
    return NextResponse.json(
      { error: "Failed to resolve current user", details: String(error) },
      { status: 500 }
    )
  }
}
