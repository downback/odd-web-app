"use client"

// src/context/LanguageContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react"
import en from "../locales/en/en.json"
import ko from "../locales/ko/ko.json"

type Translations = typeof en // Assuming both JSON files share the same structure

interface LanguageContextProps {
  locale: string
  translations: Translations
  setLanguage: (lang: string) => void
}

export const LanguageContext = createContext<LanguageContextProps>({
  locale: "en",
  translations: en,
  setLanguage: () => {},
})

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [locale, setLocale] = useState<string>("en")
  const [translations, setTranslations] = useState<Translations>(en)

  const setLanguage = (lang: string) => {
    if (lang === "ko") {
      setLocale("ko")
      setTranslations(ko)
    } else {
      setLocale("en")
      setTranslations(en)
    }
  }

  // Update the <html> lang attribute on language change
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <LanguageContext.Provider value={{ locale, translations, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
