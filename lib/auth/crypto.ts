import { createHmac, timingSafeEqual } from "node:crypto"

import type { SessionPayload } from "@/lib/auth/types"

export const SESSION_COOKIE_NAME = "quillora_session"
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7
const SESSION_MAX_AGE_MS = SESSION_MAX_AGE_SECONDS * 1000
const DEVELOPMENT_SESSION_SECRET = "quillora-dev-session-secret-change-me"

function getSessionSecret() {
  const secret = process.env.AUTH_SESSION_SECRET

  if (secret) {
    return secret
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SESSION_SECRET is required in production.")
  }

  return DEVELOPMENT_SESSION_SECRET
}

function signValue(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url")
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  if (leftBuffer.length !== rightBuffer.length) {
    return false
  }

  return timingSafeEqual(leftBuffer, rightBuffer)
}

export function createSessionToken(userId: string) {
  const payload: SessionPayload = {
    userId,
    exp: Date.now() + SESSION_MAX_AGE_MS,
  }

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const signature = signValue(encodedPayload)

  return `${encodedPayload}.${signature}`
}

export function verifySessionToken(token?: string | null) {
  if (!token) {
    return null
  }

  const [encodedPayload, signature] = token.split(".")

  if (!encodedPayload || !signature) {
    return null
  }

  const expectedSignature = signValue(encodedPayload)

  if (!safeEqual(signature, expectedSignature)) {
    return null
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as SessionPayload

    if (typeof payload.userId !== "string" || typeof payload.exp !== "number") {
      return null
    }

    if (payload.exp <= Date.now()) {
      return null
    }

    return payload
  } catch {
    return null
  }
}
