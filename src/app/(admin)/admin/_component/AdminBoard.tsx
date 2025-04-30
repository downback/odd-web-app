"use client"

import { useEffect, useState } from "react"
import { db, storage } from "../../../../services/firebase-config"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { ref, deleteObject } from "firebase/storage"

interface UpdateItem {
  id: string
  title: string
  description: string
  date: string
  imageUrl: string
}

const AdminBoard: React.FC = () => {
  const [updates, setUpdates] = useState<UpdateItem[]>([])

  const fetchUpdates = async () => {
    const snapshot = await getDocs(collection(db, "updates"))
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as UpdateItem[]
    setUpdates(data)
  }

  useEffect(() => {
    fetchUpdates()
  }, [])

  const handleDelete = async (id: string, imageUrl: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this?")
    if (!confirmDelete) return

    try {
      const path = decodeURIComponent(imageUrl.split("/o/")[1].split("?")[0])
      const imageRef = ref(storage, path)
      await deleteObject(imageRef)
      await deleteDoc(doc(db, "updates", id))
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
              onClick={() => handleDelete(item.id, item.imageUrl)}
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
