import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()
  const authToken = cookieStore.get("sb-qlzwxozqysyjfihfqotj-auth-token")?.value

  const client = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
      },
    },
  )

  return client
}
