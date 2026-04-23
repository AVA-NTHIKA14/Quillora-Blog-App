"use server"

import { redirect } from "next/navigation"

import { createSession, destroySession } from "@/lib/auth/session"
import type { AuthFormState } from "@/lib/auth/types"
import { createUser, findUserByEmail, verifyPassword } from "@/lib/auth/users"

function readText(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePassword(password: string) {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("Use at least 8 characters.")
  }

  if (!/[a-zA-Z]/.test(password)) {
    errors.push("Include at least one letter.")
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Include at least one number.")
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    errors.push("Include at least one special character.")
  }

  return errors
}

export async function signInAction(
  _: AuthFormState | undefined,
  formData: FormData
): Promise<AuthFormState | never> {
  const email = readText(formData, "email").toLowerCase()
  const password = readText(formData, "password")
  const errors: NonNullable<AuthFormState["errors"]> = {}

  if (!email) {
    errors.email = ["Email is required."]
  } else if (!validateEmail(email)) {
    errors.email = ["Enter a valid email address."]
  }

  if (!password) {
    errors.password = ["Password is required."]
  }

  if (Object.keys(errors).length > 0) {
    return {
      fields: { email },
      errors,
      message: "Enter your email and password to continue.",
    }
  }

  const user = await findUserByEmail(email)

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return {
      fields: { email },
      message: "Invalid email or password.",
    }
  }

  await createSession(user.id)
  redirect("/feed")
}

export async function signUpAction(
  _: AuthFormState | undefined,
  formData: FormData
): Promise<AuthFormState | never> {
  const name = readText(formData, "name")
  const email = readText(formData, "email").toLowerCase()
  const password = readText(formData, "password")
  const confirmPassword = readText(formData, "confirmPassword")
  const errors: NonNullable<AuthFormState["errors"]> = {}

  if (!name) {
    errors.name = ["Name is required."]
  } else if (name.length < 2) {
    errors.name = ["Use at least 2 characters."]
  }

  if (!email) {
    errors.email = ["Email is required."]
  } else if (!validateEmail(email)) {
    errors.email = ["Enter a valid email address."]
  }

  const passwordErrors = validatePassword(password)
  if (!password) {
    errors.password = ["Password is required."]
  } else if (passwordErrors.length > 0) {
    errors.password = passwordErrors
  }

  if (!confirmPassword) {
    errors.confirmPassword = ["Confirm your password."]
  } else if (password !== confirmPassword) {
    errors.confirmPassword = ["Passwords do not match."]
  }

  if (Object.keys(errors).length > 0) {
    return {
      fields: { name, email },
      errors,
      message: "Fix the highlighted fields and try again.",
    }
  }

  const existingUser = await findUserByEmail(email)

  if (existingUser) {
    return {
      fields: { name, email },
      message: "An account with that email already exists.",
    }
  }

  const user = await createUser({ name, email, password })

  if (!user) {
    return {
      fields: { name, email },
      message: "We could not create your account. Please try again.",
    }
  }

  await createSession(user.id)
  redirect("/feed")
}

export async function signOutAction() {
  await destroySession()
  redirect("/login")
}
