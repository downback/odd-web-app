"use client"

import React, { useContext, useState } from "react"
import { LanguageContext } from "../../context/LanguageContext"
import ProjectItem from "./ProjectItem"

const ProjectsList: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const projects = translations.projectsPage.projectsList
  const projectListLength = projects.length
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className="w-full h-fit my-24">
      <h1 className="text-sm font-light pb-2 border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)]  px-6">
        {translations.projectsPage.title}
      </h1>
      <div className="flex flex-col relative">
        {projects.map((project, index) => (
          <ProjectItem
            key={index}
            title={project.title}
            subTitle={project.subTitle}
            img={project.img}
            location={project.location}
            date={project.date}
            desc={project.desc}
            projectListLength={projectListLength}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectsList
