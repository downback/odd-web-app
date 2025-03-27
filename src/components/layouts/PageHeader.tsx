"use client"

import React, { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useScrollTrigger } from "@/context/ScrollTriggerContext"

gsap.registerPlugin(useGSAP)

interface PageHeaderProps {
  titleTop: string
  titleBottom?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ titleTop, titleBottom }) => {
  const pageHeaderTextRef = useRef<HTMLDivElement>(null)
  const { sectionTriggerRef } = useScrollTrigger()

  useGSAP(() => {
    const pageHeaderText = pageHeaderTextRef.current
    if (!pageHeaderText || !sectionTriggerRef.current) return

    // const currentScroll = window.scrollY
    const originalHeight = getComputedStyle(pageHeaderText).height

    gsap.from(pageHeaderText, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: "power3.out",
    })

    gsap.fromTo(
      pageHeaderText,
      {
        height: originalHeight,
      },
      {
        height: "3rem",
        duration: 0.2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: pageHeaderTextRef.current,
          start: "top top",
          scrub: true,
        },
      }
    )

    // const handleScroll = () => {
    //   const currentScroll = window.scrollY
    //   const originalHeight = getComputedStyle(pageHeaderText).height

    //   gsap.to(pageHeaderTextRef.current, {
    //     height: currentScroll > 30 ? "3rem" : originalHeight,
    //     duration: 0.2,
    //     ease: "power1.out",
    //   })
    // }

    // window.addEventListener("scroll", handleScroll)
    // return () => {
    //   window.removeEventListener("scroll", handleScroll)
    // }
  }, [pageHeaderTextRef.current])

  return (
    <div
      ref={pageHeaderTextRef}
      className=" sticky top-12 xl:-top-12 w-full flex flex-col justify-center items-center py-10 border-b-2 border-stone-100 inset-shadow-[0_-2px_0_0_rgba(0,0,0,0.05)] text-7xl"
    >
      <div ref={sectionTriggerRef} className="">
        {titleTop}
      </div>
      {titleBottom && <div className="">{titleBottom}</div>}
    </div>
  )
}

export default PageHeader

//TODO
//absolute or sticky and make margin top on the content
