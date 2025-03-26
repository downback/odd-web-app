"use client"

import React, { RefObject } from "react"
import ProcessAnimation from "./ProcessAnimation"

interface SectionComponentProps {
  sectionTriggerRef: RefObject<HTMLDivElement | null>
}

const ProcessSection: React.FC<SectionComponentProps> = ({
  sectionTriggerRef,
}) => {
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
