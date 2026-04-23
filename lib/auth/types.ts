export type StoredUser = {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: string
}

export type PublicUser = Omit<StoredUser, "passwordHash">

export type SessionPayload = {
  userId: string
  exp: number
}

export type AuthFormState = {
  fields?: {
    name?: string
    email?: string
  }
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
  }
  message?: string
}
