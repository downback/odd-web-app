"use client"

import React, { useContext } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"
import PageHeader from "@/components/ui/PageHeader"

const ConsultingHeader: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const consultingTranslation = translations.consultingPage

  return (
    <>
      <PageHeader
        titleTop={consultingTranslation.titleTop}
        titleBottom={consultingTranslation.titleBottom}
      />
    </>
  )
}

export default ConsultingHeader
