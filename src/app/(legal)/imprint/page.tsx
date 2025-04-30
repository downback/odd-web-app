"use client"

import React, { useContext } from "react"
import { LanguageContext } from "../../../context/LanguageContext"

const ImprintPage: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const imprint = translations.imprintPage

  return (
    <div className="flex flex-col w-fit">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-20">
        {imprint.title}
      </h1>

      {/* §5 TMG */}
      <section className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">{imprint.legalTitle}</h2>
        <p className="text-sm md:text-base whitespace-pre-line">{imprint.legalText}</p>
      </section>

      {/* Contact */}
      <section className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">{imprint.contactTitle}</h2>
        <p className="text-sm md:text-base whitespace-pre-line">{imprint.contactText}</p>
      </section>

      {/* Responsible Person */}
      <section className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">
          {imprint.responsibleTitle}
        </h2>
        <p className="text-sm md:text-base whitespace-pre-line">
          {imprint.responsibleText}
        </p>
      </section>

      {/* Business Info */}
      <section className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">{imprint.businessTitle}</h2>
        <p className="text-sm md:text-base whitespace-pre-line">{imprint.businessText}</p>
      </section>

      {/* Final Note */}
      <section className="mb-6 md:mb-8">
        <p className="text-sm md:text-base">{imprint.finalNote}</p>
      </section>
    </div>
  )
}

export default ImprintPage
