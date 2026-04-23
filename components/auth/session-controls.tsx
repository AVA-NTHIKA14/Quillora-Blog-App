"use client"

import { useEffect, useState } from "react"

import { signOutAction } from "@/app/actions/auth"

type SessionUser = {
  name: string
  email: string
}

function getInitials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "QR"
  )
}

function getHandle(email: string) {
  const value = email.split("@")[0] ?? "reader"
  const sanitized = value.toLowerCase().replace(/[^a-z0-9]+/g, "")

  return `@${sanitized || "reader"}`
}

export function SessionControls() {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadSession = async () => {
      try {
        const response = await fetch("/api/session", {
          cache: "no-store",
        })

        if (!response.ok) {
          if (isMounted) {
            setUser(null)
          }
          return
        }

        const data = (await response.json()) as {
          authenticated: boolean
          user?: SessionUser
        }

        if (isMounted) {
          setUser(data.authenticated ? data.user ?? null : null)
        }
      } catch {
        if (isMounted) {
          setUser(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void loadSession()

    return () => {
      isMounted = false
    }
  }, [])

  const displayName = user ? getHandle(user.email) : loading ? "Checking session" : "@reader"
  const initials = user ? getInitials(user.name) : "QR"
  const secondaryLabel = loading ? "Loading" : user?.email ?? "Signed in"

  return (
    <div className="sessionControls">
      <div className="userChip" title={secondaryLabel}>
        <span className="avatar" aria-hidden="true">
          {initials}
        </span>
        <span className="userText">
          <span className="userLabel">{loading ? "Secure session" : "Signed in"}</span>
          <span className="userHandle">{displayName}</span>
        </span>
      </div>

      <form action={signOutAction} className="signOutForm">
        <button className="signoutBtn" type="submit">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign Out
        </button>
      </form>

      <style jsx>{`
        .sessionControls {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          margin-left: auto;
          flex-wrap: wrap;
        }

        .userChip {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          min-height: 44px;
          padding: 0.45rem 0.85rem;
          border-radius: 12px;
          border: 1.5px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.04);
          color: #f3ede6;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .avatar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 999px;
          background: linear-gradient(135deg, #c04bff 0%, #8b1ee8 100%);
          color: #ffffff;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          flex-shrink: 0;
        }

        .userText {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .userLabel {
          font-size: 0.67rem;
          line-height: 1;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(232, 228, 220, 0.68);
          margin-bottom: 0.2rem;
        }

        .userHandle {
          font-size: 0.9rem;
          line-height: 1.1;
          font-weight: 600;
          color: #f8f4ee;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 15rem;
        }

        .signOutForm {
          display: flex;
        }

        .signoutBtn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          min-height: 44px;
          padding: 0.55rem 1rem;
          border: 1.5px solid rgba(192, 75, 255, 0.7);
          border-radius: 12px;
          background: linear-gradient(135deg, #b437ff 0%, #8d1fe9 100%);
          color: #ffffff;
          font-size: 0.88rem;
          font-weight: 600;
          box-shadow: 0 10px 20px rgba(111, 20, 170, 0.24);
          transition:
            transform 0.16s ease,
            box-shadow 0.16s ease,
            filter 0.16s ease;
        }

        .signoutBtn:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 24px rgba(111, 20, 170, 0.3);
          filter: brightness(1.04);
        }

        .signoutBtn:focus-visible {
          outline: 2px solid rgba(255, 255, 255, 0.8);
          outline-offset: 2px;
        }

        @media (max-width: 760px) {
          .sessionControls {
            width: 100%;
            margin-left: 0;
            justify-content: space-between;
          }

          .userChip {
            flex: 1 1 15rem;
          }

          .signOutForm {
            flex-shrink: 0;
          }
        }
      `}</style>
    </div>
  )
}
