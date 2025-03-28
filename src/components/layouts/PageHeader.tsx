"use client"

import React, { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

interface PageHeaderProps {
  titleTop: string
  titleBottom: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ titleTop, titleBottom }) => {
  const triggerBoxRef = useRef<HTMLDivElement>(null)
  const headerBoxRef = useRef<HTMLDivElement>(null)
  const textBoxRef = useRef<HTMLDivElement>(null)
  const textTopRef = useRef<HTMLDivElement>(null)
  const textBottomRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const triggerBox = triggerBoxRef.current
    const pageHeaderText = headerBoxRef.current
    const textBox = textBoxRef.current
    const textTop = textTopRef.current
    const textBottom = textBottomRef.current

    if (!pageHeaderText || !triggerBox || !textBox || !textTop || !textBottom)
      return

    const originalHeight = getComputedStyle(pageHeaderText).height
    const scrollRange = 100 // how far user must scroll for animation
    const snapHeight = gsap.utils.snap([0, 1])
    const normalize = gsap.utils.normalize(0, scrollRange)

    const lastSnap = -1
    let lastScroll = window.scrollY

    const tl = gsap.timeline()

    tl.from(textTop, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: "power3.out",
    }).from(
      textBottom,
      {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "power3.out",
      },
      "<+0.1"
    )

    ScrollTrigger.create({
      trigger: triggerBox,
      start: "top top",
      end: "bottom bottom",
      // markers: true,
      scrub: true,
      onUpdate: (self) => {
        const progress = normalize(self.scroll())
        const snapped = snapHeight(progress)
        const direction = window.scrollY > lastScroll ? "down" : "up"
        lastScroll = window.scrollY

        if (snapped !== lastSnap) {
          if (snapped === 1 && direction === "down") {
            gsap.to(pageHeaderText, {
              height: "2.8rem",
              ease: "power2.out",
              backgroundColor: "#edebeb",
              duration: 0.3,
            })
            gsap.to(textBox, {
              scale: "0.45",
              ease: "power2.out",
              transform: "translateY(-45%)",
              duration: 0.3,
            })
          } else if (snapped === 0 && direction === "up") {
            gsap.to(pageHeaderText, {
              height: originalHeight,
              ease: "power2.out",
              backgroundColor: "transparent",
              duration: 0.3,
            })
            gsap.to(textBox, {
              scale: "1",
              transform: "translateY(0)",
              ease: "power2.out",
              duration: 0.3,
            })
          }
        }
      },
    })

    return () => {
      gsap.set(pageHeaderText, { height: originalHeight })
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <div ref={triggerBoxRef} className=" w-full h-10" />
      <div
        ref={headerBoxRef}
        className=" z-30 sticky top-12 w-full  pb-10 border-b-2 border-stone-100 inset-shadow-[0_-2px_0_0_rgba(0,0,0,0.05)] text-7xl"
      >
        <div
          ref={textBoxRef}
          lang="en"
          className="w-full flex flex-col items-center "
        >
          <div ref={textTopRef} className="">
            {titleTop}
          </div>
          <div ref={textBottomRef} className="">
            {titleBottom}
          </div>
        </div>
      </div>
    </>
  )
}

export default PageHeader

//TODO
//absolute or sticky and make margin top on the content
//sticky top-12
//ref={sectionTriggerRef}
