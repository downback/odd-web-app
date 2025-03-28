"use client"

import React from "react"
import ProjectsListWrapper from "./_components/ProjectsListWrapper"
import ProjectHeader from "./_components/ProjectHeader"

import { useScrollTrigger } from "@/context/ScrollTriggerContext"

const ProjectsPage: React.FC = () => {
  const { sectionTriggerRef } = useScrollTrigger()
  return (
    <div className="relative h-max">
      <ProjectHeader />
      <ProjectsListWrapper />
      <div ref={sectionTriggerRef}>hi</div>
    </div>
  )
}

export default ProjectsPage
