"use client"

import React, { useContext, useState, useEffect } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"
import ProjectItem from "./ProjectItem"
import { getDownloadURL, listAll, ref } from "firebase/storage"
import { storage } from "../../../../services/firebase-config"

const ProjectsList: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const projects = translations.projectsPage.projectsList
  const projectListLength = projects.length
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [imgUrlsList, setImgUrlsList] = useState<string[][]>([])

  useEffect(() => {
    const fetchAllImages = async () => {
      const allImages: string[][] = await Promise.all(
        projects.map(async (_project, index) => {
          const folderRef = ref(storage, `projects/project${index + 1}`)
          try {
            const result = await listAll(folderRef)
            const urls = await Promise.all(
              result.items.map((itemRef) => getDownloadURL(itemRef))
            )
            return urls
          } catch (error) {
            console.error(
              `Error fetching images for project${index + 1}:`,
              error
            )
            return []
          }
        })
      )
      setImgUrlsList(allImages)
    }

    fetchAllImages()
  }, [projects])

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
            imgList={imgUrlsList[index] || []}
            location={project.location}
            date={project.date}
            scopeTags={project.scopeTags}
            projectText={project.projectText}
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
