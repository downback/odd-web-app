import React, { useContext } from "react"
import { LanguageContext } from "../../../context/LanguageContext"

const ImprintPage: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const imprintPage = translations.imprintPage

  return (
    <div className="px-6 sm:px-12 md:px-16 my-12 flex flex-col">
      <h1 className="text-4xl font-bold text-center mb-6">
        {imprintPage.title}
      </h1>

      {/* Responsible Entity */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          {imprintPage.responsibleEntityTitle}
        </h2>
        <p className="text-lg">{imprintPage.responsibleEntityText}</p>
      </section>

      {/* Data Collection */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          {imprintPage.dataCollectionTitle}
        </h2>
        <p className="text-lg">{imprintPage.dataCollectionText}</p>
      </section>

      {/* Hosting and Third-party Providers */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          {imprintPage.hostingTitle}
        </h2>
        <p className="text-lg">{imprintPage.hostingText}</p>
      </section>

      {/* Cookies */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          {imprintPage.cookiesTitle}
        </h2>
        <p className="text-lg">{imprintPage.cookiesText}</p>
      </section>

      {/* Data Storage & Security */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          {imprintPage.dataStorageTitle}
        </h2>
        <p className="text-lg">{imprintPage.dataStorageText}</p>
      </section>

      {/* Your Rights (according to GDPR) */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          {imprintPage.yourRightsTitle}
        </h2>
        <ul className="text-lg list-disc pl-6">
          <li>{imprintPage.yourRightsText}</li>
        </ul>
      </section>
    </div>
  )
}

export default ImprintPage
