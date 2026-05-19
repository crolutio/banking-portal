import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { SupabaseClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.NEXT_PUBLIC_BANKING_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_BANKING_SUPABASE_PUBLISHABLE_DEFAULT_KEY

let cachedClient: SupabaseClient | null = null

export function createClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing NEXT_PUBLIC_BANKING_SUPABASE_URL or NEXT_PUBLIC_BANKING_SUPABASE_PUBLISHABLE_DEFAULT_KEY")
  }
  if (cachedClient) return cachedClient
  cachedClient = createSupabaseClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    }
  )
  return cachedClient
}
