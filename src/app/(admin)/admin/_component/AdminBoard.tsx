"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "../../../../services/supabase-client"

interface UpdateItem {
  id: string
  title: string
  description: string
  date: string
  imageUrl: string
  imagePath?: string | null
}

const AdminBoard: React.FC = () => {
  const [updates, setUpdates] = useState<UpdateItem[]>([])

  const fetchUpdates = async () => {
    const supabase = getSupabaseClient()
    const { data: updatesData, error } = await supabase
      .from("updates")
      .select("id,title,description,date,image_url,image_path")
      .order("date", { ascending: false })

    if (error) {
      console.error("Failed to fetch updates:", error)
      return
    }

    const data: UpdateItem[] = (updatesData || []).map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      date: item.date,
      imageUrl: item.image_url,
      imagePath: item.image_path,
    }))

    setUpdates(data)
  }

  useEffect(() => {
    fetchUpdates()
  }, [])

  const handleDelete = async (id: string, imagePath?: string | null) => {
    const confirmDelete = confirm("Are you sure you want to delete this?")
    if (!confirmDelete) return

    try {
      const supabase = getSupabaseClient()

      if (imagePath) {
        const { error: storageError } = await supabase.storage
          .from("updates")
          .remove([imagePath])

        if (storageError) throw storageError
      }

      const { error: deleteError } = await supabase
        .from("updates")
        .delete()
        .eq("id", id)

      if (deleteError) throw deleteError

      alert("Deleted successfully")
      fetchUpdates()
    } catch (error) {
      console.error("Delete failed:", error)
      alert("Failed to delete item")
    }
  }

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Uploaded Items</h2>
      {updates
        .slice()
        .reverse()
        .map((item) => (
          <div
            key={item.id}
            className="border p-3 rounded mb-3 bg-gray-50 flex flex-col gap-2"
          >
            <div className="font-semibold">{item.title}</div>
            <div className="text-sm text-gray-500">{item.date}</div>
            <button
              onClick={() => handleDelete(item.id, item.imagePath)}
              className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700 w-fit"
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  )
}

export default AdminBoard
