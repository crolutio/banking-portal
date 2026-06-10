import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * RM-only build: only the Relationship Manager workspace is exposed. Any page
 * route outside /rm-workspace (the customer / risk / admin dashboards, and the
 * root) is redirected to /rm-workspace. API routes, Next internals, and static
 * assets are excluded via the matcher below.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname.startsWith("/rm-workspace")) {
    return NextResponse.next()
  }
  const url = req.nextUrl.clone()
  url.pathname = "/rm-workspace"
  url.search = ""
  return NextResponse.redirect(url)
}

export const config = {
  // Run on page navigations only — skip /api, Next internals, and files with
  // an extension (static assets).
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
