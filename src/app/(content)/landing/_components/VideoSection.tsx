"use client"

import React, { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const LandingVideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoWrapperRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const video = videoRef.current
    const videoWrapper = videoWrapperRef.current
    if (!video || !videoWrapper) return

    ScrollTrigger.create({
      trigger: videoWrapper,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      start: "top top",
      end: "bottom top",
      onEnter: () => video.play(),
      onLeave: () => video.pause(),
      onEnterBack: () => video.play(),
      onLeaveBack: () => video.pause(),
      // markers: true,
      id: "video",
    })
  }, [])

  return (
    <div
      ref={videoWrapperRef}
      className="w-full h-[900px] flex justify-center items-center "
    >
      <div className="w-full h-3/5 lg:h-2/3 group relative">
        <video
          ref={videoRef}
          src="/images/landingPageVideo.mov"
          width="100%"
          className="w-full h-full object-cover shadow-lg"
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none z-10" />
      </div>
    </div>
  )
}

export default LandingVideoSection

//TODO
// [ ] video hover | pin | design?
