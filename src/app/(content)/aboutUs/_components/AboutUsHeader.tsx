"use client"

import React, { useContext } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"

const AboutUsHeader: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const aboutUsTranslation = translations.aboutUsPage

  return (
    <>
      <div className=" w-full pb-20 border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)]">
        <div lang="en" className="w-full flex flex-col items-center ">
          <div className="w-5/6 text-4xl xl:text-5xl">
            {aboutUsTranslation.titleTop}
          </div>
          <div className="w-5/6 text-3xl xl:text-4xl">
            {aboutUsTranslation.titleBootom}
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutUsHeader
