"use client"

import React, { useContext } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"
import ProjectsList from "@/components/ui/ProjectsList"

const HomePage: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  return (
    <div className="container w-full h-fit">
      {/* <h1>{translations.greeting}</h1> */}
      <ProjectsList />
    </div>
  )
}

export default HomePage
