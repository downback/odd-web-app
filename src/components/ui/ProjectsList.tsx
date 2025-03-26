"use client"

import React, { useContext } from "react"
import { LanguageContext } from "../../context/LanguageContext"
import ProjectItem from "./ProjectItem"

const ProjectsList: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  return (
    <div className="w-full h-fit my-24">
      <h1 className="text-2xl">{translations.projectTitle}</h1>
      <ProjectItem title="Sword Master noodle" />
      <ProjectItem title="odd cafe" />
      <ProjectItem title="리아빵" />
      <ProjectItem title="고고기" />
    </div>
  )
}

export default ProjectsList
