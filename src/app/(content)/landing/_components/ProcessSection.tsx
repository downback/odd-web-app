"use client"

import React, { useEffect } from "react"
import ProcessAnimation from "./ProcessAnimation"
import { useScrollTrigger } from "@/context/ScrollTriggerContext"

const ProcessSection: React.FC = () => {
  const { sectionTriggerRef } = useScrollTrigger()
  useEffect(() => {
    if (!sectionTriggerRef.current) return
    // Optional: log or apply styles
    console.log("Trigger section mounted", sectionTriggerRef.current)
  }, [])

  return (
    <div
      ref={sectionTriggerRef}
      className="w-full h-min my-12 flex flex-col justify-center items-center"
    >
      <ProcessAnimation />
    </div>
  )
}

export default ProcessSection
