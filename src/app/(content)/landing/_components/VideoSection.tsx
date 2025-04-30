"use client"

import React, { useRef, useContext } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Link from "next/link"
import { MdArrowOutward } from "react-icons/md"
import { LanguageContext } from "../../../../context/LanguageContext"

gsap.registerPlugin(ScrollTrigger)

const LandingVideoSection: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const landingTranslation = translations.landingPage

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
      yPercent: -20,
      ease: "none",
      duration: 0.7,
      scrollTrigger: {
        trigger: text1,
        start: "top bottom",
        end: "bottom center",
        scrub: true,
        // markers: true,
      },
    })

    tl.to(text2, {
      yPercent: -10,
      ease: "none",
      duration: 0.7,
      scrollTrigger: {
        trigger: text2,
        start: "top bottom",
        end: "bottom center",
        scrub: true,
        // markers: true,
      },
    })

    ScrollTrigger.refresh()
  }, [])

  return (
    <div className="w-full h-auto flex flex-col justify-center items-start relative overflow-hidden">
      <div
        ref={videoWrapperRef}
        className="w-auto h-[40vh] md:w-full md:h-auto group relative mt-20 md:mt-36"
      >
        <video
          ref={videoRef}
          src="/images/landingPageVideo.mov"
          className="w-auto h-full object-cover md:object-fit shadow-md"
          muted
          playsInline
          preload="auto"
        />
      </div>
      <div className="w-full h-1/2 my-16 relative flex flex-col justify-center">
        <div
          ref={textRef1}
          className=" w-full h-48 flex justify-between px-4 pt-0 md:pt-2"
        >
          <div className="w-1/2 md:w-2/5 h-full">
            <h3
              className="text-xl text-bold"
              style={{
                textShadow: "3px 5px 5px #d6d3d1",
              }}
              lang="en"
            >
              odd office
            </h3>
            <div>{landingTranslation.oddOfficeShortDesc}</div>
          </div>
          <div className="w-1/2 md:w-1/3 h-full flex flex-row ">
            <Link
              href="/projects"
              className="w-full h-6 flex flex-row justify-end items-center gap-1"
            >
              <div className="relative inline-block before:content-[''] before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-full before:bg-black before:scale-x-0 before:origin-left before:transition-transform before:duration-400 hover:before:scale-x-100">
                {landingTranslation.viewAllProjects}
              </div>
              <MdArrowOutward />
            </Link>
          </div>
        </div>
        <div
          ref={textRef2}
          className=" w-full h-48 flex justify-center items-center"
        >
          <div className="w-auto h-auto text-center ">
            <div lang="en" className="text-xl text-bold">
              Do you get curious about us?
            </div>
            <Link href="/aboutUs" className="w-fit">
              <div className="relative inline-block overflow-hidden">
                <span
                  className="relative inline-block before:content-[''] before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-full before:bg-black before:scale-x-0 before:origin-left before:transition-transform before:duration-400 hover:before:scale-x-100"
                  style={{
                    textShadow: "3px 5px 5px #d6d3d1",
                  }}
                >
                  {landingTranslation.learnMoreButton}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingVideoSection
