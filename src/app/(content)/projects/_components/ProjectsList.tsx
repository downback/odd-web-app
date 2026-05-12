"use client"

import React, { useContext, useState, useEffect, useRef } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"
import ProjectItem from "./ProjectItem"
import { getSupabaseClient } from "../../../../services/supabase-client"

import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

const ProjectsList: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const projects = translations.projectsPage.projectsList
  const projectListLength = projects.length
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [imgUrlsList, setImgUrlsList] = useState<string[][]>([])

  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const fetchAllImages = async () => {
      const allImages: string[][] = await Promise.all(
        projects.map(async (_project, index) => {
          const folderPath = `project${projectListLength - index}`
          try {
            const supabase = getSupabaseClient()
            const { data, error } = await supabase.storage
              .from("projects")
              .list(folderPath, {
                limit: 100,
                sortBy: { column: "name", order: "asc" },
              })

            if (error) throw error

            const urls = (data || [])
              .filter((item) => item.name && !item.name.startsWith("."))
              .map((item) => {
                const { data: publicUrlData } = supabase.storage
                  .from("projects")
                  .getPublicUrl(`${folderPath}/${item.name}`)

                return publicUrlData.publicUrl
              })

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
  }, [projects, projectListLength])


  const handleToggle = (index: number) => {
    const isSameItem = openIndex === index

    if (isSameItem) {
      // Close if same item clicked again
      setOpenIndex(null)
      return
    }

    // Step 1: Close currently open
    setOpenIndex(null)

    // Step 2: Wait for collapse animation, then scroll
    setTimeout(() => {
      const targetElement = projectRefs.current[index]
      if (targetElement) {
        const positionTopOffset = 175
        const listHeight = 80
        const scrollPosition = positionTopOffset + listHeight * index

        gsap.to(window, {
          scrollTo: {
            y: scrollPosition,
          },
          duration: 0.9,
          ease: "power3.out",
        })
      }

      // Step 3: Overlap scroll and opening for smoother transition
      setTimeout(() => {
        setOpenIndex(index)
      }, 600) // Start opening before scroll fully completes
    }, 500) // Start scroll slightly before collapse completes
  }

  return (
    <div className="w-full h-fit my-24">
      <div
        lang="en"
        className="text-sm font-light pb-2 border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)]  px-6"
      >
        PROJECTS
      </div>
      <div className="flex flex-col relative">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => {
              projectRefs.current[index] = el
            }}
          >
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectsList
