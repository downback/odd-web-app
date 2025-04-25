"use client"

import React, { useContext, useRef } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

const AboutUsHeader: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const aboutUsTranslation = translations?.aboutUsPage

  const headerTitleRef = useRef<HTMLDivElement>(null)
  const descTopRef = useRef<HTMLDivElement>(null)
  const descBottomRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const headerTitle = headerTitleRef.current
    const descTop = descTopRef.current
    const descBottom = descBottomRef.current

    if (!headerTitle || !descTop || !descBottom) return

    const tl = gsap.timeline()

    tl.from(headerTitle, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: "power3.out",
    })
      .from(
        descTop,
        {
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: "power3.out",
        },
        "<+0.1"
      )
      .from(
        descBottom,
        {
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: "power3.out",
        },
        "<+0.1"
      )
  })

  return (
    <>
      <div className=" w-full pb-20 border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)]">
        <div
          lang="en"
          className="w-full flex flex-col items-center px-6 sm:px-12 md:px-16"
        >
          <div
            ref={headerTitleRef}
            className="w-full mb-2 md:mb-8 text-5xl md:text-6xl xl:text-7xl "
          >
            {aboutUsTranslation.headerTitle}
          </div>
          <div ref={descTopRef} className="w-full text-2xl mb-2 md:mb-0">
            {aboutUsTranslation.descTop}
          </div>
          <div
            ref={descBottomRef}
            className="w-full text-base md:text-2xl text-stone-600 md:text-black"
          >
            {aboutUsTranslation.descBottom}
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutUsHeader
