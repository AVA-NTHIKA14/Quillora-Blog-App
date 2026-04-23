"use client"

import Link from "next/link"
import { useActionState, useState } from "react"

import { signInAction, signUpAction } from "@/app/actions/auth"

type Tab = "signin" | "signup"

function ErrorList({ errors }: { errors?: string[] }) {
  if (!errors || errors.length === 0) {
    return null
  }

  return (
    <ul className="field-errors" aria-live="polite">
      {errors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  )
}

export function AuthForm() {
  const [activeTab, setActiveTab] = useState<Tab>("signin")
  const [showSignInPassword, setShowSignInPassword] = useState(false)
  const [showSignUpPassword, setShowSignUpPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [signInState, signInFormAction, signInPending] = useActionState(
    signInAction,
    undefined
  )
  const [signUpState, signUpFormAction, signUpPending] = useActionState(
    signUpAction,
    undefined
  )

  const state = activeTab === "signin" ? signInState : signUpState
  const pending = activeTab === "signin" ? signInPending : signUpPending

  return (
    <div className="login-root">
      <div className="left-panel">
        <div className="circle circle-top" />
        <div className="circle circle-bottom" />

        <header className="logo-row">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          <span className="logo-text">Quillora</span>
        </header>

        <div className="hero-content">
          <p className="tagline">Protected writing space.</p>
          <h1 className="headline">
            Real sign in for a reading and writing home that finally remembers you.
          </h1>
          

          <blockquote className="testimonial">
            <p className="testimonial-quote">
              &ldquo;Readable, calm, and finally secure enough to feel like a real
              product.&rdquo;
            </p>
            <footer className="testimonial-author">- Sarah Chen, design researcher</footer>
          </blockquote>
        </div>

        <span className="dot dot-mid" />
        <span className="dot dot-low" />

        <footer className="left-footer"><p>© 2026 All rights reserved. Designed and developed by Avanthika K S.</p></footer>
      </div>

      <div className="right-panel">
        <div className="form-card">
          <p className="welcome">
            {activeTab === "signin" ? "Welcome back" : "Create your account"}
          </p>
          <h2 className="form-title">
            {activeTab === "signin" ? "Sign in to your Space" : "Join the orbit"}
          </h2>

          <div className="tab-switcher" role="tablist" aria-label="Authentication mode">
            <button
              type="button"
              className={`tab-btn ${activeTab === "signin" ? "active" : ""}`}
              onClick={() => setActiveTab("signin")}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === "signup" ? "active" : ""}`}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </button>
          </div>

          {activeTab === "signin" ? (
            <form action={signInFormAction} className="form-fields">
              {state?.message ? <p className="form-message">{state.message}</p> : null}

              <div className="field-group">
                <label className="field-label" htmlFor="signin-email">
                  Email
                </label>
                <input
                  id="signin-email"
                  name="email"
                  type="email"
                  className="field-input"
                  defaultValue={signInState?.fields?.email ?? ""}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
                <ErrorList errors={signInState?.errors?.email} />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="signin-password">
                  Password
                </label>
                <div className="password-wrapper">
                  <input
                    id="signin-password"
                    name="password"
                    type={showSignInPassword ? "text" : "password"}
                    className="field-input password-input"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowSignInPassword((value) => !value)}
                    aria-label="Toggle password visibility"
                  >
                    {showSignInPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <ErrorList errors={signInState?.errors?.password} />
              </div>

              <button className="cta-btn" type="submit" disabled={pending}>
                {pending ? "Signing in..." : "Enter Quillora"}
              </button>
            </form>
          ) : (
            <form action={signUpFormAction} className="form-fields">
              {state?.message ? <p className="form-message">{state.message}</p> : null}

              <div className="field-group">
                <label className="field-label" htmlFor="signup-name">
                  Name
                </label>
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  className="field-input"
                  defaultValue={signUpState?.fields?.name ?? ""}
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                />
                <ErrorList errors={signUpState?.errors?.name} />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="signup-email">
                  Email
                </label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  className="field-input"
                  defaultValue={signUpState?.fields?.email ?? ""}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
                <ErrorList errors={signUpState?.errors?.email} />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="signup-password">
                  Password
                </label>
                <div className="password-wrapper">
                  <input
                    id="signup-password"
                    name="password"
                    type={showSignUpPassword ? "text" : "password"}
                    className="field-input password-input"
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowSignUpPassword((value) => !value)}
                    aria-label="Toggle password visibility"
                  >
                    {showSignUpPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <ErrorList errors={signUpState?.errors?.password} />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="signup-confirm-password">
                  Confirm Password
                </label>
                <div className="password-wrapper">
                  <input
                    id="signup-confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="field-input password-input"
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    aria-label="Toggle password visibility"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <ErrorList errors={signUpState?.errors?.confirmPassword} />
              </div>

              <button className="cta-btn" type="submit" disabled={pending}>
                {pending ? "Creating account..." : "Create Account"}
              </button>
            </form>
          )}

          

          <p className="signup-hint">
            {activeTab === "signin" ? "Need an account? " : "Already have an account? "}
            <button
              type="button"
              className="signup-link"
              onClick={() =>
                setActiveTab((current) => (current === "signin" ? "signup" : "signin"))
              }
            >
              {activeTab === "signin" ? "Create one" : "Sign in instead"}
            </button>
          </p>

        
        </div>
      </div>

      <style jsx>{`
        .login-root {
          display: flex;
          min-height: 100vh;
          font-family: Georgia, serif;
        }

        .left-panel {
          position: relative;
          width: 50%;
          background: #0d0d1a;
          color: #e8e4dc;
          display: flex;
          flex-direction: column;
          padding: 2rem 2.5rem;
          overflow: hidden;
        }

        .circle {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(138, 80, 220, 0.35);
          pointer-events: none;
        }
        .circle-top {
          width: 340px;
          height: 340px;
          top: -80px;
          right: -60px;
        }
        .circle-bottom {
          width: 300px;
          height: 300px;
          bottom: -80px;
          right: -40px;
        }

        .logo-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-style: italic;
          font-size: 1rem;
          color: #c8c4bc;
          margin-bottom: auto;
        }

        .hero-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 3rem 0 2rem;
        }

        .tagline {
          font-style: italic;
          font-size: 0.9rem;
          color: #8a8680;
          margin: 0 0 1rem;
        }

        .headline {
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-style: italic;
          font-weight: 400;
          line-height: 1.2;
          color: #f0ece4;
          margin: 0 0 1.5rem;
        }

        .body-copy {
          font-size: 0.92rem;
          line-height: 1.7;
          color: #9a9590;
          max-width: 440px;
          margin: 0 0 2rem;
        }

        .testimonial {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 1.25rem 1.5rem;
          margin: 0;
          max-width: 440px;
        }

        .testimonial-quote {
          font-style: italic;
          font-size: 0.95rem;
          color: #d8d4cc;
          margin: 0 0 0.6rem;
        }

        .testimonial-author {
          font-size: 0.82rem;
          color: #6a6660;
          font-style: normal;
        }

        .dot {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #4a4660;
        }
        .dot-mid {
          left: 2.5rem;
          top: 46%;
        }
        .dot-low {
          left: 30%;
          bottom: 15%;
        }

        .left-footer {
          font-size: 0.78rem;
          color: #4a4660;
          padding-top: 1rem;
        }

        .right-panel {
          width: 50%;
          background: #f5f4f2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .form-card {
          width: 100%;
          max-width: 460px;
        }

        .welcome {
          font-style: italic;
          font-size: 0.9rem;
          color: #9a9590;
          margin: 0 0 0.4rem;
        }

        .form-title {
          font-size: 1.6rem;
          font-style: italic;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 1.8rem;
        }

        .tab-switcher {
          display: flex;
          border: 1.5px solid #d0cdc8;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 1.4rem;
        }

        .tab-btn {
          flex: 1;
          padding: 0.7rem 0;
          border: none;
          background: transparent;
          font-size: 0.92rem;
          font-family: inherit;
          font-weight: 500;
          color: #6a6660;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .tab-btn.active {
          background: #1a1a2e;
          color: #fff;
        }

        .form-fields {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-message {
          border: 1px solid rgba(155, 34, 232, 0.2);
          background: rgba(155, 34, 232, 0.08);
          color: #5b1c86;
          border-radius: 8px;
          padding: 0.8rem 0.9rem;
          font-size: 0.86rem;
          line-height: 1.5;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .field-label {
          font-size: 0.88rem;
          font-weight: 600;
          color: #1a1a2e;
          font-family: inherit;
        }

        .field-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1.5px solid #d0cdc8;
          border-radius: 8px;
          background: #fff;
          font-size: 0.92rem;
          font-family: inherit;
          color: #3a3630;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }

        .field-input:focus {
          border-color: #8a22cc;
        }

        .password-wrapper {
          position: relative;
        }

        .password-input {
          padding-right: 4.8rem;
        }

        .eye-btn {
          position: absolute;
          right: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #7b7680;
          padding: 0;
          font-size: 0.82rem;
        }

        .field-errors {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          color: #a02b2b;
          font-size: 0.8rem;
          padding-left: 1rem;
        }

        .cta-btn {
          width: 100%;
          padding: 0.85rem;
          background: #9b22e8;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          margin-top: 0.1rem;
        }

        .cta-btn:hover:not(:disabled) {
          background: #8010d0;
        }

        .cta-btn:active:not(:disabled) {
          transform: scale(0.99);
        }

        .cta-btn:disabled {
          cursor: wait;
          opacity: 0.72;
        }

        .security-note {
          margin-top: 1rem;
          padding: 0.85rem 0.95rem;
          border: 1px solid #dedad5;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.7);
          color: #5a5650;
          font-size: 0.82rem;
          line-height: 1.55;
        }

        .signup-hint {
          margin-top: 1.2rem;
          font-size: 0.88rem;
          color: #9a9590;
        }

        .signup-link {
          color: #9b22e8;
          text-decoration: none;
          font-weight: 500;
          background: none;
          border: none;
          padding: 0;
          font: inherit;
        }

        .signup-link:hover {
          text-decoration: underline;
        }

        .home-link-row {
          margin-top: 0.9rem;
        }

        .home-link {
          color: #6a6660;
          font-size: 0.84rem;
        }

        .home-link:hover {
          color: #9b22e8;
        }

        @media (max-width: 768px) {
          .login-root {
            flex-direction: column;
          }

          .left-panel,
          .right-panel {
            width: 100%;
          }

          .left-panel {
            padding: 2rem 1.5rem;
            min-height: 48vh;
          }

          .right-panel {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}
