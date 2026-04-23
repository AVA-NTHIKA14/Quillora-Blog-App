import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const SESSION_COOKIE_NAME = "quillora_session"
const DEVELOPMENT_SESSION_SECRET = "quillora-dev-session-secret-change-me"

function getSessionSecret() {
  const secret = process.env.AUTH_SESSION_SECRET
  if (secret) return secret
  return DEVELOPMENT_SESSION_SECRET
}

async function verifySessionTokenEdge(token: string | undefined | null): Promise<boolean> {
  if (!token) return false

  const parts = token.split(".")
  if (parts.length !== 2) return false

  const [encodedPayload, signature] = parts
  if (!encodedPayload || !signature) return false

  try {
    // Re-create the HMAC signature using Web Crypto
    const secret = getSessionSecret()
    const encoder = new TextEncoder()
    const keyData = encoder.encode(secret)
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign", "verify"]
    )

    const payloadData = encoder.encode(encodedPayload)
    const signatureBuffer = Uint8Array.from(
      atob(signature.replace(/-/g, "+").replace(/_/g, "/")),
      (c) => c.charCodeAt(0)
    )

    const isValid = await crypto.subtle.verify("HMAC", key, signatureBuffer, payloadData)
    if (!isValid) return false

    // Decode and validate payload
    const payloadJson = atob(encodedPayload.replace(/-/g, "+").replace(/_/g, "/"))
    const payload = JSON.parse(payloadJson) as { userId?: string; exp?: number }

    if (typeof payload.userId !== "string" || typeof payload.exp !== "number") {
      return false
    }

    if (payload.exp <= Date.now()) return false

    return true
  } catch {
    return false
  }
}

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value
  const isValid = await verifySessionTokenEdge(token)

  if (isValid) {
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
