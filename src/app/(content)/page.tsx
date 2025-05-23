// app/page.tsx

"use client"

import React, { useEffect, useState } from "react"
import Loader from "../../components/ui/Loader"
import ProcessSection from "./landing/_components/ProcessSection"
import DrawingSection from "./landing/_components/DrawingSection"
import VideoSection from "./landing/_components/VideoSection"

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 seconds loading

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) return <Loader />

  return (
    <div className="flex flex-col">
      <div className="w-full h-[70vh] md:h-[80vh]">
        <DrawingSection />
      </div>
      <div className="w-full -translate-y-6">
        <ProcessSection />
      </div>
      <div className="w-full mb-20">
        <VideoSection />
      </div>
    </div>
  )
}

export default HomePage
