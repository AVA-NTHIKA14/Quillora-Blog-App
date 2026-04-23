import { cookies } from "next/headers"

import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  verifySessionToken,
} from "@/lib/auth/crypto"
import { findUserById, sanitizeUser } from "@/lib/auth/users"

function getCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  }
}

export async function createSession(userId: string) {
  const cookieStore = await cookies()

  cookieStore.set(
    SESSION_COOKIE_NAME,
    createSessionToken(userId),
    getCookieOptions(SESSION_MAX_AGE_SECONDS)
  )
}

export async function destroySession() {
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE_NAME, "", getCookieOptions(0))
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

  return verifySessionToken(token)
}

export async function getCurrentUser() {
  const session = await getSession()

  if (!session) {
    return null
  }

  const user = await findUserById(session.userId)

  if (!user) {
    return null
  }

  return sanitizeUser(user)
}
