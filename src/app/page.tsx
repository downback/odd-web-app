"use client"

import React, { useRef, RefObject } from "react"
import ProcessSection from "./(content)/landing/_components/ProcessSection"
import DrawingSection from "./(content)/landing/_components/DrawingSection"
import VideoSection from "./(content)/landing/_components/VideoSection"
import ProjectsSection from "./(content)/landing/_components/ProjectsSection"
import Header from "@/components/common/header/Header"

const HomePage: React.FC = () => {
  const sectionTriggerRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className="">
      <Header triggerRef={sectionTriggerRef} />
      <DrawingSection />
      <ProcessSection sectionTriggerRef={sectionTriggerRef} />
      <VideoSection />
      <ProjectsSection />
    </div>
  )
}

export default HomePage

//TODO
//[ ] mobile menu not working
//[ ] implementing "No headache" animation
//[ ] Process section text component improvement
//[ ] Process animation morphing improvement
//[ ] Process section -> Consulting page transition
//[ ] implementing Lading page video and projects section
//[ ] Footer mobile design
//[ ] projects section 2 versions

//[ ] mail address connect & functions

//[ ] Header 없어지는 것 대신, height 줄어드는 효과로 변경/ mobile에서도 똑같이 적용
