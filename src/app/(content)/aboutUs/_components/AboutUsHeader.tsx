"use client"

import React, { useContext } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"
import PageHeader from "@/components/ui/PageHeader"

const AboutUsHeader: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const aboutUsTranslation = translations.aboutUsPage

  return (
    <>
      <PageHeader
        titleTop={aboutUsTranslation.titleTop}
        titleBottom={aboutUsTranslation.titleBottom}
      />
    </>
  )
}

export default AboutUsHeader
