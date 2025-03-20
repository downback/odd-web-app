import React from "react"
import ProjectHeader from "./_components/ProjectHeader"
import ProjectsListWrapper from "./_components/ProjectsListWrapper"

const ProjectsPage: React.FC = () => {
  return (
    <div className="container">
      <ProjectHeader />
      <ProjectsListWrapper />
    </div>
  )
}

export default ProjectsPage
