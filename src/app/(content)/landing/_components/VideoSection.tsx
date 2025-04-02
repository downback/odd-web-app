"use client"

import React, { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const LandingVideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoWrapperRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const video = videoRef.current
    const wrapper = videoWrapperRef.current

    if (!video || !wrapper) return

    // Reset scroll position for better experience
    ScrollTrigger.refresh()

    ScrollTrigger.create({
      trigger: wrapper,
      start: "top 20%",
      end: "bottom top",
      scrub: true,
      onEnter: () => video.play(),
      onEnterBack: () => video.play(),
      onLeave: () => video.pause(),
      onLeaveBack: () => video.pause(),
      // markers: true,
    })
  }, [])

  return (
    <div
      ref={videoWrapperRef}
      className="w-full h-[100vh] flex justify-center items-center relative overflow-hidden"
    >
      <div className="w-full h-3/5 lg:h-2/3 group relative">
        <video
          ref={videoRef}
          src="/images/landingPageVideo.mov"
          className="w-full h-full object-cover shadow-lg"
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none z-10" />
      </div>
    </div>
  )
}

export default LandingVideoSection
