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
        <div className="px-8 my-12 w-1/4">Jong-hwan Kim</div>
        <div className="px-8 my-12 flex-1 flex flex-col">
          <div className="text-2xl">
            디자인에 대한 다양한 경험을 바탕으로, 평면적 영역에서 공간적
            영역으로, 나아가 공감각적 디자인으로 확장해 왔습니다. 이를 통해
            깊이를 갖는 디자인이란 무엇인지 탐구하며, 끊임없이 새로운 시도를
            이어가고 있습니다.
          </div>
          <div>
            nterior Designer, Consultant, Carpenter, Cook, Restaurant Management
            Email: 1309project@gmail.com
          </div>
          <div>나는 김목수 입니다 / I’m a Carpenter Kim</div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="px-8 my-12 w-1/4"> {aboutUsTranslation.titleTop}</div>
        <div className="px-8 my-12 flex-1 flex flex-col">
          <div className="text-2xl">{aboutUsTranslation.titleBottom}</div>
          <div>{aboutUsTranslation.titleBottom}</div>
          <div>{aboutUsTranslation.titleBottom}</div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsContent
