import { randomBytes, randomUUID, scrypt as scryptCallback, timingSafeEqual } from "node:crypto"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { promisify } from "node:util"

import type { PublicUser, StoredUser } from "@/lib/auth/types"

const USERS_FILE = join(process.cwd(), "data", "users.json")
const SCRYPT_KEY_LENGTH = 64
const scrypt = promisify(scryptCallback)

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

async function readUsers() {
  try {
    const raw = await readFile(USERS_FILE, "utf8")
    const parsed = JSON.parse(raw)

    return Array.isArray(parsed) ? (parsed as StoredUser[]) : []
  } catch (error) {
    const maybeFsError = error as NodeJS.ErrnoException

    if (maybeFsError.code === "ENOENT") {
      return []
    }

    throw error
  }
}

async function writeUsers(users: StoredUser[]) {
  await mkdir(dirname(USERS_FILE), { recursive: true })
  await writeFile(USERS_FILE, `${JSON.stringify(users, null, 2)}\n`, "utf8")
}

export function sanitizeUser(user: StoredUser): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  }
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex")
  const derivedKey = (await scrypt(password, salt, SCRYPT_KEY_LENGTH)) as Buffer

  return `scrypt:${salt}:${derivedKey.toString("hex")}`
}

export async function verifyPassword(password: string, storedHash: string) {
  const [algorithm, salt, storedKey] = storedHash.split(":")

  if (algorithm !== "scrypt" || !salt || !storedKey) {
    return false
  }

  const derivedKey = (await scrypt(password, salt, SCRYPT_KEY_LENGTH)) as Buffer
  const storedKeyBuffer = Buffer.from(storedKey, "hex")

  if (storedKeyBuffer.length !== derivedKey.length) {
    return false
  }

  return timingSafeEqual(storedKeyBuffer, derivedKey)
}

export async function findUserByEmail(email: string) {
  const normalizedEmail = normalizeEmail(email)
  const users = await readUsers()

  return users.find((user) => user.email === normalizedEmail) ?? null
}

export async function findUserById(userId: string) {
  const users = await readUsers()

  return users.find((user) => user.id === userId) ?? null
}

export async function createUser(input: {
  name: string
  email: string
  password: string
}) {
  const users = await readUsers()
  const normalizedEmail = normalizeEmail(input.email)

  if (users.some((user) => user.email === normalizedEmail)) {
    return null
  }

  const user: StoredUser = {
    id: randomUUID(),
    name: input.name.trim(),
    email: normalizedEmail,
    passwordHash: await hashPassword(input.password),
    createdAt: new Date().toISOString(),
  }

  users.push(user)
  await writeUsers(users)

  return user
}
