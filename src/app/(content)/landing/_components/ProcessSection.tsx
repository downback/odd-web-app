"use client"

import React, { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import ProcessAnimation from "./ProcessAnimation"

gsap.registerPlugin(ScrollTrigger)

const ProcessSection: React.FC = () => {
  const beforeWordRef = useRef<HTMLDivElement>(null)
  const afterWordRef = useRef<HTMLDivElement>(null)
  const textTriggerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const before = beforeWordRef.current
    const after = afterWordRef.current
    const trigger = textTriggerRef.current

    if (!before || !after || !trigger) return

    gsap.set(before, { x: 0 })
    gsap.set(after, { x: "-100%" })

    const tl = gsap.timeline({ paused: true })

    tl.to(before, {
      x: "100%",
      duration: 1,
      ease: "power2.inOut",
    }).to(after, {
      x: "0%",
      duration: 1,
      ease: "power2.inOut",
    })

    ScrollTrigger.create({
      trigger: trigger,
      start: "top 75%",
      onEnter: () => {
        tl.play()
      },

      // markers: true,
    })

    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
  }, [])

  return (
    <div lang="en" className="w-full h-auto flex flex-col">
      <ProcessAnimation />
      <div
        ref={textTriggerRef}
        lang="en"
        className="font-bold text-5xl md:text-6xl w-full h-full flex flex-col justify-center items-center"
      >
        <div className="w-full md:w-4/7 h-max overflow-hidden font-medium px-1">
          <div className="w-full h-fit flex justify-center">WELCOME TO</div>

          <div className="w-full relative h-16 md:h-16 overflow-hidden">
            <div
              ref={beforeWordRef}
              className="absolute w-full h-fit flex flex-col md:flex-row justify-evenly md:justify-center items-center"
            >
              <div>THE START</div>
            </div>
            <div
              ref={afterWordRef}
              className="absolute w-full h-fit flex flex-col md:flex-row justify-evenly md:justify-center items-center "
            >
              <div>THE HELL</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-24 flex flex-col justify-center items-center">
        <p className="text-base">It’ll never be easy</p>
        <p className="text-base">But we’ll make it less painful</p>
      </div>
    </div>
  )
}

export default ProcessSection
