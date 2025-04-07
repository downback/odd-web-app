// app/page.tsx

"use client"

import React, { useEffect, useState } from "react"
import Loader from "../components/ui/Loader"
import ProcessSection from "./(content)/landing/_components/ProcessSection"
import DrawingSection from "./(content)/landing/_components/DrawingSection"
import VideoSection from "./(content)/landing/_components/VideoSection"

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
      <DrawingSection />
      <div className="w-full">
        <ProcessSection />
      </div>
      <div className="w-full">
        <VideoSection />
      </div>
    </div>
  )
}

export default HomePage

//TODO
//[x] mobile menu not working
//[x] implementing "No headache" animation
//[ ] Process section text component improvement
//[ ] Process animation morphing improvement
//[ ] Process section -> Consulting page transition
//[ ] implementing Lading page video and projects section
//[ ] Footer mobile design
//[ ] projects section 2 versions

//[ ] mail address connect & functions

//[x] Header 없어지는 것 대신, height 줄어드는 효과로 변경/ mobile에서도 똑같이 적용

//중요!
//비디오재생 더 길게 되게
//배경 색감 편집
//비디오 색상 조정, 크롭 , 로고
//
