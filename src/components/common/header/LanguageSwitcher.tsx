// src/components/common/LanguageSwitcher.tsx
"use client"

import React, { useContext } from "react"
import { LanguageContext } from "../../../context/LanguageContext"

const LanguageSwitcher: React.FC = () => {
  const { locale, setLanguage } = useContext(LanguageContext)

  const activeClasses = "transition-colors duration-200 font-bold"
  const inactiveClasses = "hover:text-gray-800 transition-colors duration-200"

  return (
    <div className="flex items-center gap-2 justify-end cursor-pointer">
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

// const LanguageSwitcher: React.FC = () => {
//   const { toggleLanguage, translations } = useContext(LanguageContext)

//   return (
//     <button
//       onClick={toggleLanguage}
//       className="px-4 py-2 border text-white border-gray-300 rounded hover:bg-gray-100 transition-colors duration-200"
//     >
//       <div className="px-4 py-2 border text-white">
//         {translations.changeLanguage}
//       </div>
//     </button>
//   )
// }

export default LanguageSwitcher
