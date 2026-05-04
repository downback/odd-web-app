import { createClient } from "@supabase/supabase-js"

type Database = {
  public: {
    Tables: {
      updates: {
        Row: {
          id: string
          title: string
          date: string
          description: string
          image_url: string
          image_path: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          date: string
          description: string
          image_url: string
          image_path?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          date?: string
          description?: string
          image_url?: string
          image_path?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      is_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
    }
  }
}

type SupabaseClient = ReturnType<typeof createClient<Database>>

let supabaseClient: SupabaseClient | null = null

export const getSupabaseClient = () => {
  if (supabaseClient) return supabaseClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local"
    )
  }

  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey)

  return supabaseClient
}
