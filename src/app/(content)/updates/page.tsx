"use client"

import React, { useState, useEffect } from "react"
import UpdatesHeader from "./_component/UpdatesHeader"
import UpdateList from "./_component/UpdateList"
import UpdateDetail from "./_component/UpdateDetail"

interface UpdateItem {
  id: number
  title: string
  date: string
  description: string
  imageUrl: string
}

const mockUpdates: UpdateItem[] = [
  {
    id: 1,
    title: "New Feature Launched",
    date: "2024-03-01",
    description:
      "We’ve launched a new feature that helps you manage projects faster.",
    imageUrl: "/images/TestImage.png",
  },
  {
    id: 2,
    title: "Performance Improvements",
    date: "2024-02-15",
    description: "Significant performance updates across the platform.",
    imageUrl: "/images/TestImage.png",
  },
  {
    id: 3,
    title: "Bug Fixes",
    date: "2024-01-28",
    description: "Several bugs have been squashed for a smoother experience.",
    imageUrl: "/images/TestImage.png",
  },
]

const UpdatesPage: React.FC = () => {
  const [selectedUpdate, setSelectedUpdate] = useState<UpdateItem | null>(null)

  useEffect(() => {
    // Default to first update on mount
    setSelectedUpdate(mockUpdates[0])
  }, [])

  return (
    <div className="w-full h-auto flex flex-col min-h-screen">
      <UpdatesHeader />
      <div className=" w-full mx-6">
        {selectedUpdate && <UpdateDetail update={selectedUpdate} />}
      </div>
      <div className="w-full mb-20">
        <UpdateList
          updates={mockUpdates}
          onSelect={setSelectedUpdate}
          selectedId={selectedUpdate?.id}
        />
      </div>
    </div>
  )
}

export default UpdatesPage
