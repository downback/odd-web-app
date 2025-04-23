"use client"

import React, { useState, useEffect } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "../../../services/firebase-config"
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

  useEffect(() => {
    const fetchUpdates = async () => {
      const q = query(collection(db, "updates"), orderBy("date", "desc"))
      const querySnapshot = await getDocs(q)
      const items: UpdateItem[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UpdateItem[]

      console.log("Fetched updates:", items) // ✅ Add this line
      setUpdates(items)
      setSelectedUpdate(items[0])
    }

    fetchUpdates()
  }, [])

  return (
    <div className="w-full h-auto flex flex-col min-h-screen">
      <UpdatesHeader />
      <div className="w-full mt-20">
        <UpdateDetail update={selectedUpdate} />
      </div>
      <div className="w-full mb-40">
        <UpdateList
          updates={updates}
          onSelect={(item) => setSelectedUpdate(item)}
          selectedId={selectedUpdate?.id}
        />
      </div>
    </div>
  )
}

export default UpdatesPage
