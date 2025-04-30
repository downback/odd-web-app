"use client"

import React, { useContext } from "react"
import { LanguageContext } from "../../../context/LanguageContext"

const PrivacyPolicyPage: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const privacyPolicyPage = translations.privacyPolicyPage

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-20">
        {privacyPolicyPage.title}
      </h1>

      <section className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">
          {privacyPolicyPage.responsibleEntityTitle}
        </h2>
        <p className="text-sm md:text-base whitespace-pre-line">
          {privacyPolicyPage.responsibleEntityText}
        </p>
      </section>

      <section className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">
          {privacyPolicyPage.dataCollectionTitle}
        </h2>
        <p className="text-sm md:text-base whitespace-pre-line">
          {privacyPolicyPage.dataCollectionText}
        </p>
      </section>

      <section className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">
          {privacyPolicyPage.hostingTitle}
        </h2>
        <p className="text-sm md:text-base whitespace-pre-line">
          {privacyPolicyPage.hostingText}
        </p>
      </section>

      <section className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">
          {privacyPolicyPage.cookiesTitle}
        </h2>
        <p className="text-sm md:text-base whitespace-pre-line">
          {privacyPolicyPage.cookiesText}
        </p>
      </section>

      <section className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">
          {privacyPolicyPage.dataStorageTitle}
        </h2>
        <p className="text-sm md:text-base whitespace-pre-line">
          {privacyPolicyPage.dataStorageText}
        </p>
      </section>

      <section className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">
          {privacyPolicyPage.yourRightsTitle}
        </h2>
        <ul className="text-sm md:text-base list-disc pl-6 whitespace-pre-line">
          <li>{privacyPolicyPage.yourRightsText}</li>
        </ul>
      </section>
    </div>
  )
}

export default PrivacyPolicyPage
