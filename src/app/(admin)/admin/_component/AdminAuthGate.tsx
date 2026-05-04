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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-stone-500">Checking admin session...</p>
      </div>
    )
  }

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <form
          onSubmit={handleSignIn}
          className="w-full max-w-sm border border-black rounded p-6 space-y-4"
        >
          <div>
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-sm text-stone-500 mt-1">
              Sign in with your Supabase admin account.
            </p>
          </div>

          <div>
            <label htmlFor="admin-email" className="block font-semibold mb-1">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              className="w-full p-2 border border-black rounded"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block font-semibold mb-1"
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
              className="w-full p-2 border border-black rounded"
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
            className="w-full bg-black text-white py-2 rounded hover:bg-stone-800 transition disabled:bg-stone-500"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm border border-black rounded p-6 space-y-4">
          <div>
            <h1 className="text-2xl font-bold">Access Blocked</h1>
            <p className="text-sm text-stone-500 mt-1">
              You are signed in, but this account is not registered as an
              admin.
            </p>
          </div>

          <div className="border border-stone-300 rounded p-3 text-sm text-stone-600 overflow-hidden text-ellipsis">
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
            className="w-full border border-black py-2 rounded hover:bg-black hover:text-white transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="max-w-2xl mx-auto px-6 pt-8 flex justify-between items-center gap-4">
        <p className="text-sm text-stone-500 overflow-hidden text-ellipsis">
          Signed in as {userEmail}
        </p>
        <button
          type="button"
          onClick={handleSignOut}
          className="border border-black px-3 py-1 rounded text-sm hover:bg-black hover:text-white transition"
        >
          Sign Out
        </button>
      </div>
      {children}
    </div>
  )
}

export default AdminAuthGate
