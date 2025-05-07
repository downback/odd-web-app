// src/components/common/LanguageSwitcher.tsx
"use client"

import React, { useContext } from "react"
import { LanguageContext } from "../../../context/LanguageContext"

const LanguageSwitcher: React.FC = () => {
  const { locale, setLanguage } = useContext(LanguageContext)

  const activeClasses = "transition-colors duration-200 font-bold"
  const inactiveClasses = "hover:text-gray-800 transition-colors duration-200"

  return (
    <div
      lang="en"
      className="flex items-center gap-2 justify-end cursor-pointer"
    >
      <div
        onClick={() => setLanguage("en")}
        className={locale === "en" ? activeClasses : inactiveClasses}
      >
        EN
      </div>
      <span>/</span>
      <div
        onClick={() => setLanguage("ko")}
        className={locale === "ko" ? activeClasses : inactiveClasses}
      >
        KO
      </div>
    </div>
  )
}

export default LanguageSwitcher
