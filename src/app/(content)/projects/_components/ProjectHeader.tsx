"use client"

import React, { useContext } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"
import PageHeader from "@/components/layouts/PageHeader"

const ProjectHeader: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  return (
    <>
      <PageHeader
        titleTop={translations.projectTitleTop}
        titleBottom={translations.projectTitleBottom}
      />
    </>
  )
}

export default ProjectHeader
