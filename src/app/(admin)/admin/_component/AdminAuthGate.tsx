"use client"

import { ReactNode, useEffect, useState } from "react"
import { getSupabaseClient } from "../../../../services/supabase-client"

interface AdminAuthGateProps {
  children: ReactNode
}

const AdminAuthGate: React.FC<AdminAuthGateProps> = ({ children }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const supabase = getSupabaseClient()

    const checkAdminAccess = async (currentUserEmail: string | null) => {
      if (!currentUserEmail) {
        setUserEmail(null)
        setIsAdmin(false)
        return
      }

      const { data, error } = await supabase.rpc("is_admin")

      if (error) {
        console.error("Failed to check admin access:", error)
        setIsAdmin(false)
      } else {
        setIsAdmin(Boolean(data))
      }

      setUserEmail(currentUserEmail)
    }

    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error("Failed to load admin session:", error)
      }

      await checkAdminAccess(data.session?.user.email || null)
      setLoading(false)
    }

    loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAdminAccess(session?.user.email || null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setErrorMessage("")

    const supabase = getSupabaseClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorMessage(error.message)
    }

    setSubmitting(false)
  }

  const handleSignOut = async () => {
    const supabase = getSupabaseClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      setErrorMessage(error.message)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <p className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-500 shadow-sm">
          Checking admin session...
        </p>
      </div>
    )
  }

  if (!userEmail) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <form
          onSubmit={handleSignIn}
          className="w-full max-w-sm space-y-5 rounded-lg border border-stone-200 bg-white p-6 shadow-sm"
        >
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
              Odd Office
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">
              Admin login
            </h1>
            <p className="mt-1 text-sm text-stone-500">
              Sign in with your Supabase admin account.
            </p>
          </div>

          <div>
            <label
              htmlFor="admin-email"
              className="mb-2 block text-sm font-semibold text-stone-700"
            >
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none transition focus:border-stone-950 focus:bg-white focus:ring-4 focus:ring-stone-200"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-2 block text-sm font-semibold text-stone-700"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none transition focus:border-stone-950 focus:bg-white focus:ring-4 focus:ring-stone-200"
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600" role="alert">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-stone-950 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-400"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-sm space-y-4 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Access blocked
            </h1>
            <p className="mt-1 text-sm text-stone-500">
              You are signed in, but this account is not registered as an
              admin.
            </p>
          </div>

          <div className="overflow-hidden text-ellipsis rounded-md border border-stone-200 bg-stone-50 p-3 text-sm text-stone-600">
            {userEmail}
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600" role="alert">
              {errorMessage}
            </p>
          )}

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full rounded-md border border-stone-950 py-2.5 text-sm font-semibold transition hover:bg-stone-950 hover:text-white"
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {children}
      <div className="border-t border-stone-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <p className="overflow-hidden text-ellipsis text-sm text-stone-500">
            Signed in as <span className="font-semibold">{userEmail}</span>
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="shrink-0 rounded-md border border-stone-950 px-3 py-1.5 text-sm font-semibold transition hover:bg-stone-950 hover:text-white"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminAuthGate
