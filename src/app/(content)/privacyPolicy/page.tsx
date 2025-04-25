import React, { useContext } from "react"
import { LanguageContext } from "../../../context/LanguageContext"

const PrivacyPolicyPage: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const privacyPolicyPageTranslation = translations.privacyPolicyPage
  return (
    <div className="w-full h-dvh">{privacyPolicyPageTranslation.title}</div>
  )
}

export default PrivacyPolicyPage
