import { createClient } from "@supabase/supabase-js"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({ request })

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  // Get auth token from cookies
  const authToken = request.cookies.get("sb-qlzwxozqysyjfihfqotj-auth-token")?.value

  if (authToken) {
    // Set the auth header if we have a token
    await supabase.auth.getUser(authToken)
  }

  return supabaseResponse
}
