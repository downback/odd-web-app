"use client"

import React from "react"
import ProjectHeader from "./_components/ProjectHeader"
import ProjectsList from "@/app/(content)/projects/_components/ProjectsList"

const ProjectsPage: React.FC = () => {
  return (
    <div className="relative h-max">
      <ProjectHeader />
      <ProjectsList />
    </div>
  )
}

export default ProjectsPage
