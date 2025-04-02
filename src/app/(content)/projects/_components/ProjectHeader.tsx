"use client"

import React, { useContext } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"
import PageHeader from "@/components/ui/PageHeader"

const ProjectHeader: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const projectsTranslation = translations.projectsPage

  return (
    <>
      <PageHeader
        titleTop={projectsTranslation.titleTop}
        titleBottom={projectsTranslation.titleBottom}
      />
    </>
  )
}

export default ProjectHeader
