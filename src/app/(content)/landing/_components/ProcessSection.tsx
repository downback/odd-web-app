"use client"

import React from "react"
import ProcessAnimation from "./ProcessAnimation"
import { useScrollTrigger } from "@/context/ScrollTriggerContext"

const ProcessSection: React.FC = () => {
  const { sectionTriggerRef } = useScrollTrigger()
  // useEffect(() => {
  //   if (!sectionTriggerRef.current) return
  //   // Optional: log or apply styles
  //   console.log("Trigger section mounted", sectionTriggerRef.current)
  // }, [])

  return (
    <div ref={sectionTriggerRef} className="w-full h-auto">
      <h1 className="text-center">
        you got an idea to start your business?
      </h1>
      <ProcessAnimation />
      <h1 className="text-center h-24">WELCOME</h1>
    </div>
  )
}

export default ProcessSection
