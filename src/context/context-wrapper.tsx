// app/context-wrapper.tsx
"use client"

import { ReactNode } from "react"
import { LanguageProvider } from "@/context/LanguageContext"
import { ScrollTriggerProvider } from "@/context/ScrollTriggerContext"

interface ContextWrapperProps {
  children: ReactNode
}

export const ContextWrapper = ({ children }: ContextWrapperProps) => {
  return (
    <LanguageProvider>
      <ScrollTriggerProvider>{children}</ScrollTriggerProvider>
    </LanguageProvider>
  )
}
