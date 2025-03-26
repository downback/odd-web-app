import React from "react"
import ProjectsListWrapper from "./_components/ProjectsListWrapper"
import PageHeader from "@/components/layouts/PageHeader"
import ProjectHeader from "./_components/ProjectHeader"
import Header from "@/components/common/header/Header"

const ProjectsPage: React.FC = () => {
  return (
    <div className="">
      <ProjectHeader />
      <ProjectsListWrapper />
    </div>
  )
}

export default ProjectsPage
