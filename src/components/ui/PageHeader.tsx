"use client"

import React, { useRef, useState, useEffect } from "react"
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

  const [screenSize, setScreenSize] = useState("normal")

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setScreenSize("mobile")
      } else if (width >= 1280) {
        setScreenSize("desktop")
      } else {
        setScreenSize("normal")
      }
    }

    handleResize() // Run once on mount
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useGSAP(() => {
    const triggerBox = triggerBoxRef.current
    const pageHeaderText = headerBoxRef.current
    const textBox = textBoxRef.current
    const textTop = textTopRef.current
    const textBottom = textBottomRef.current

    if (!pageHeaderText || !triggerBox || !textBox || !textTop || !textBottom)
      return

    const originalHeight = getComputedStyle(pageHeaderText).height
    const scrollRange = 100
    const snapHeight = gsap.utils.snap([0, 1])
    const normalize = gsap.utils.normalize(0, scrollRange)
    const headerHeight =
      screenSize === "mobile"
        ? "1.9rem"
        : screenSize === "desktop"
        ? "2.5rem"
        : "2rem"

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

    gsap.set(pageHeaderText, {
      backgroundColor: "transparent",
      height: originalHeight,
    })

    const trigger = ScrollTrigger.create({
      trigger: triggerBox,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = normalize(self.scroll())
        const snapped = snapHeight(progress)
        // const direction = window.scrollY > lastScroll ? "down" : "up"
        lastScroll = window.scrollY

        if (snapped === 1) {
          gsap.to(pageHeaderText, {
            height: headerHeight,
            backgroundColor: "#edebeb",
            duration: 0.4,
            ease: "power2.out",
          })
          gsap.to(textBox, {
            scale: 0.45,
            transform: "translateY(-45%)",
            duration: 0.4,
            ease: "power2.out",
          })
        } else if (snapped === 0) {
          gsap.to(pageHeaderText, {
            height: originalHeight,
            backgroundColor: "transparent",
            duration: 0.4,
            ease: "power2.out",
          })
          gsap.to(textBox, {
            scale: 1,
            transform: "translateY(0)",
            duration: 0.4,
            ease: "power2.out",
          })
        }
      },
      onEnterBack: () => {
        gsap.to(pageHeaderText, {
          height: originalHeight,
          backgroundColor: "transparent",
          duration: 0.4,
          ease: "power2.out",
        })
        gsap.to(textBox, {
          scale: "1",
          transform: "translateY(0)",
          ease: "power2.out",
          duration: 0.4,
        })
      },
    })

    if (window.scrollY >= scrollRange) {
      gsap.set(pageHeaderText, {
        height: headerHeight,
        backgroundColor: "#edebeb",
        duration: 0.4,
        ease: "power2.out",
      })
      gsap.set(textBox, {
        scale: 0.45,
        transform: "translateY(-45%)",
        duration: 0.4,
        ease: "power2.out",
      })
    } else {
      gsap.set(pageHeaderText, {
        height: originalHeight,
        backgroundColor: "transparent",
        duration: 0.4,
        ease: "power2.out",
      })
      gsap.set(textBox, {
        scale: 1,
        transform: "translateY(0)",
        duration: 0.4,
        ease: "power2.out",
      })
    }

    return () => {
      trigger.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [screenSize])

  return (
    <>
      <div ref={triggerBoxRef} className="w-full h-8" />
      <div
        lang="en"
        ref={headerBoxRef}
        className="z-30 sticky top-12 w-full pb-1 sm:pb-10 text-5xl sm:text-6xl xl:text-7xl border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)]"
      >
        <div
          ref={textBoxRef}
          lang="en"
          className="w-full flex flex-col items-center"
        >
          <div ref={textTopRef} className="">
            {titleTop}
          </div>
          <div ref={textBottomRef} className="mt-2">
            {titleBottom}
          </div>
        </div>
      </div>
    </>
  )
}

export default PageHeader
