import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/crypto"

export function proxy(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value
  const session = verifySessionToken(token)

  if (session) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL("/login", request.url))
}

export const config = {
  matcher: [
    "/feed/:path*",
    "/dashboard/:path*",
    "/discussion/:path*",
    "/profile/:path*",
    "/read/:path*",
    "/write/:path*",
  ],
}
