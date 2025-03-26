"use client"

import React, { createContext, useRef, useContext, RefObject } from "react"

type ScrollTriggerContextType = {
  sectionTriggerRef: RefObject<HTMLDivElement | null>
}

const ScrollTriggerContext = createContext<ScrollTriggerContextType | null>(
  null
)

export const ScrollTriggerProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const sectionTriggerRef = useRef<HTMLDivElement>(null)

  return (
    <ScrollTriggerContext.Provider value={{ sectionTriggerRef }}>
      {children}
    </ScrollTriggerContext.Provider>
  )
}

export const useScrollTrigger = () => {
  const context = useContext(ScrollTriggerContext)
  if (!context) {
    throw new Error(
      "useScrollTrigger must be used within ScrollTriggerProvider"
    )
  }
  return context
}
