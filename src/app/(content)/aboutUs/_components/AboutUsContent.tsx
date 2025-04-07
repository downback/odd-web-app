"use client"

import React, { useContext } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"
import PageHeader from "@/components/ui/PageHeader"

const AboutUsContent: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const aboutUsTranslation = translations.aboutUsPage

  return (
    <div className="px-8 my-12 flex flex-col">
      <div className="flex flex-row">
        <div className="px-8 my-12 w-1/4">
          {aboutUsTranslation.usList[1].name}
        </div>
        <div className="px-8 my-12 flex-1 flex flex-col">
          <div className="text-2xl">
            {aboutUsTranslation.usList[1].descMain}
          </div>
          <div>{aboutUsTranslation.usList[1].descSub}</div>
          <div className="mt-6">click to see details of bio</div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="px-8 my-12 w-1/4"> {aboutUsTranslation.usList[0].name}</div>
        <div className="px-8 my-12 flex-1 flex flex-col">
          <div className="text-2xl">{aboutUsTranslation.usList[0].descMain}</div>
          <div>{aboutUsTranslation.usList[0].descSub}</div>
          <div className="mt-6">click to see details of bio</div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsContent
