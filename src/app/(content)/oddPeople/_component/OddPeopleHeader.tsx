"use client"

import React, { useContext } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"
import PageHeader from "@/components/layouts/PageHeader"

const OddPeopleHeader: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const oddPeopleTranslation = translations.oddPeoplePage

  return (
    <>
      <PageHeader
        titleTop={oddPeopleTranslation.titleTop}
        titleBottom={oddPeopleTranslation.titleBottom}
      />
    </>
  )
}

export default OddPeopleHeader
