"use client"

import React, { useState, useEffect } from "react"
import { getSupabaseClient } from "../../../services/supabase-client"
import UpdatesHeader from "./_component/UpdatesHeader"
import UpdateList from "./_component/UpdateList"
import UpdateDetail from "./_component/UpdateDetail"

export interface UpdateItem {
  id: string
  title: string
  date: string
  description: string
  imageUrl: string
}

const UpdatesPage = () => {
  const [updates, setUpdates] = useState<UpdateItem[]>([])
  const [selectedUpdate, setSelectedUpdate] = useState<UpdateItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const supabase = getSupabaseClient()
        const { data, error } = await supabase
          .from("updates")
          .select("id,title,date,description,image_url")
          .order("date", { ascending: false })

        if (error) throw error

        const items: UpdateItem[] = (data || []).map((item) => ({
          id: item.id,
          title: item.title,
          date: item.date,
          description: item.description,
          imageUrl: item.image_url,
        }))

        setUpdates(items)
        setSelectedUpdate(items[0] || null)
      } catch (error) {
        console.error("Failed to fetch updates:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUpdates()
  }, [])

  return (
    <div className="w-full h-auto flex flex-col min-h-screen">
      <UpdatesHeader />
      <div className="w-full mt-12 md:mt-16">
        <UpdateDetail isLoading={loading} update={selectedUpdate} />
      </div>
      <div className="w-full mt-12 md:mt-16 mb-40">
        <UpdateList
          updates={updates}
          isLoading={loading}
          onSelect={(item) => setSelectedUpdate(item)}
          selectedId={selectedUpdate?.id}
        />
      </div>
    </div>
  )
}

export default UpdatesPage
