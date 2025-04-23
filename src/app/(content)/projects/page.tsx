"use client"

import React from "react"
import ProjectsListWrapper from "./_components/ProjectsListWrapper"
import ProjectHeader from "./_components/ProjectHeader"

const ProjectsPage: React.FC = () => {
  return (
    <div className="relative h-max">
      <ProjectHeader />
      <ProjectsListWrapper />
    </div>
  )
}

export default ProjectsPage
