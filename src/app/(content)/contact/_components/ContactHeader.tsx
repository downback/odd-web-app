"use client"

import React, { useContext } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"
import PageHeader from "@/components/layouts/PageHeader"

const ContactHeader: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const contactTranslation = translations.contactPage

  return (
    <>
      <PageHeader
        titleTop={contactTranslation.titleTop}
        titleBottom={contactTranslation.titleBottom}
      />
    </>
  )
}

export default ContactHeader
