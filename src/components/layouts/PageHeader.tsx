"use client"

import React, { useContext } from "react"
import { LanguageContext } from "../../context/LanguageContext"

interface PageHeaderProps {
  title: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const { translations } = useContext(LanguageContext)
  return (
    <div className="w-full flex justify-center h-60 items-center border-b-2 border-stone-300">
      {/* <h1>{translations.greeting}</h1> */}
      <div className="flex justify-center items-center  w-full h-full border-b-2 border-stone-50">
        <h1 className="text-7xl">{title}</h1>
      </div>
    </div>
  )
}

export default PageHeader
