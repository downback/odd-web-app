"use client"

import React, { useContext, useState, useEffect, useRef } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"
import ProjectItem from "./ProjectItem"
import { getDownloadURL, listAll, ref } from "firebase/storage"
import { storage } from "../../../../services/firebase-config"

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

  // const handleToggle = (index: number) => {
  //   const isCurrentlyOpen = openIndex === index

  //   if (!isCurrentlyOpen) {
  //     const targetElement = projectRefs.current[index]
  //     if (targetElement) {
  //       const positionTopOffset = 176
  //       const listHeight = 82
  //       const scrollPosition = positionTopOffset + listHeight * index

  //       window.scrollTo({
  //         top: scrollPosition,
  //         behavior: "smooth",
  //       })
  //     }

  //     setTimeout(() => {
  //       setOpenIndex(index)
  //     }, 500)
  //   } else {
  //     setOpenIndex(null)
  //   }
  // }

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
        const positionTopOffset = 176
        const listHeight = 82
        const scrollPosition = positionTopOffset + listHeight * index

        // window.scrollTo({
        //   top: scrollPosition,
        //   behavior: "smooth",
        // })
        gsap.to(window, {
          scrollTo: {
            y: scrollPosition,
            // autoKill: true,
          },
          duration: 0.8,
          ease: "power2.out",
        })
      }

      // Step 3: After scroll, open the new one
      setTimeout(() => {
        setOpenIndex(index)
      }, 800) // Adjust to match scroll smooth duration
    }, 600) // Adjust to match collapse animation duration
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
