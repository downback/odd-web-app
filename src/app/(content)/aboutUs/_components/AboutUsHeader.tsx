"use client"

import React, { useContext } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"
import PageHeader from "@/components/layouts/PageHeader"

const AboutUsHeader: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  return (
    <div>
      <PageHeader title="ABOUT US" />
      <div className="h-96"></div>
    </div>
  )
}

export default AboutUsHeader
