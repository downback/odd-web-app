"use client"

import React, { useContext } from "react"
import { LanguageContext } from "../../context/LanguageContext"

interface ProjectItemProps {
  title: string
}

const ProjectItem: React.FC<ProjectItemProps> = ({ title }) => {
  const { translations } = useContext(LanguageContext)
  return (
    <div className="border-b-2 border-stone-300 w-full h-12">
      {/* <h1>{translations.greeting}</h1> */}
      <div className="border-t-2 border-stone-50 w-full h-12">
        <p>{title}</p>
      </div>
    </div>
  )
}

export default ProjectItem
