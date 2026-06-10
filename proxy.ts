import { updateSession } from "@/lib/supabase/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // RM-only build: only the Relationship Manager workspace is exposed. Redirect
  // any other page route (root, customer / risk / admin dashboards) to
  // /rm-workspace. Leave API routes and Next internals untouched so the AI/voice
  // endpoints and Supabase session refresh keep working.
  if (
    !pathname.startsWith("/rm-workspace") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next")
  ) {
    const url = request.nextUrl.clone()
    url.pathname = "/rm-workspace"
    url.search = ""
    return NextResponse.redirect(url)
  }

  return await updateSession(request)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
