"use client"

import Image from "next/image"
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
  const [loading, setLoading] = useState(true)

  const fetchUpdates = async () => {
    setLoading(true)
    const supabase = getSupabaseClient()
    const { data: updatesData, error } = await supabase
      .from("updates")
      .select("id,title,description,date,image_url,image_path")
      .order("date", { ascending: false })

    if (error) {
      console.error("Failed to fetch updates:", error)
      setLoading(false)
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
    setLoading(false)
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
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
            Manage
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">
            Uploaded items
          </h2>
        </div>
        <div className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-500">
          {updates.length} {updates.length === 1 ? "item" : "items"}
        </div>
      </div>

      {loading && (
        <div className="rounded-md border border-stone-200 bg-stone-50 p-4 text-sm text-stone-500">
          Loading updates...
        </div>
      )}

      {!loading && updates.length === 0 && (
        <div className="rounded-md border border-dashed border-stone-300 bg-stone-50 p-6 text-center">
          <p className="font-semibold text-stone-700">No updates yet</p>
          <p className="mt-1 text-sm text-stone-500">
            Uploaded posts will appear here for quick review.
          </p>
        </div>
      )}

      {!loading && updates.length > 0 && (
        <div className="space-y-3">
          {updates.map((item) => (
            <article
              key={item.id}
              className="flex gap-4 rounded-md border border-stone-200 bg-stone-50 p-3 transition hover:border-stone-300 hover:bg-white"
            >
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-stone-200">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt=""
                    width={80}
                    height={80}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-stone-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-stone-500">{item.date}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.imagePath)}
                    className="w-fit rounded-md border border-red-200 bg-white px-3 py-1.5 text-sm font-semibold text-red-700 transition hover:border-red-700 hover:bg-red-700 hover:text-white"
                  >
                    Delete
                  </button>
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-600">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default AdminBoard
