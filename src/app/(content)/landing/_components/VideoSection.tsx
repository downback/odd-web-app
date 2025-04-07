"use client"

import React, { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

const LandingVideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoWrapperRef = useRef<HTMLDivElement>(null)
  const textRef1 = useRef<HTMLDivElement>(null)
  const textRef2 = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const video = videoRef.current
    const wrapper = videoWrapperRef.current
    const text1 = textRef1.current
    const text2 = textRef2.current

    if (!video || !wrapper || !text1 || !text2) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top center", // when wrapper hits top of viewport
        end: "bottom top", 
        scrub: true,
        onEnter: () => video.play(),
        onLeave: () => video.pause(),
        onEnterBack: () => video.play(),
        onLeaveBack: () => video.pause(),
        // markers: true,
      },
    })

    // Animate height to full screen
    tl.to(text1, {
      yPercent: -50,
      ease: "none",
      duration: 0.5,
      scrollTrigger: {
        trigger: text1,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        // markers: true,
      },
    })

    tl.to(text2, {
      yPercent: -35,
      ease: "none",
      duration: 0.5,
      scrollTrigger: {
        trigger: text2,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        // markers: true,
      },
    })

    ScrollTrigger.refresh()
  }, [])

  return (
    <div className=" w-full h-auto  flex flex-col justify-center items-start relative overflow-hidden">
      <div
        ref={videoWrapperRef}
        className="w-full h-3/5 lg:h-2/3 group relative mt-42"
      >
        <video
          ref={videoRef}
          src="/images/landingPageVideo.mov"
          className="w-full h-full object-cover shadow-lg"
          muted
          playsInline
          preload="auto"
        />
        {/* <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none z-10" /> */}
      </div>
      <div className="w-full h-1/2 my-16 relative flex flex-col justify-center">
        <div
          ref={textRef1}
          className=" w-full h-48  flex justify-between px-4 pt-4"
        >
          <div className="w-1/2 md:w-1/3 h-full">
            Odd Office brings your idea to life—with bold concepts, sharp
            visuals, and the paperwork magic you didn’t know you needed.
          </div>
          <div className="w-1/2 md:w-1/3 h-full text-right">
            <Link href="/projects">View all projects</Link>
          </div>
        </div>
        <div
          ref={textRef2}
          className=" w-full h-48 flex justify-center items-center"
        >
          <div className="h-auto text-center">
            <div className="">Did you get curious about us?</div>
            <Link href="/aboutUs">Learn more about us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingVideoSection
