"use client"

import React, { useRef, useState, useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { MdOutlineOpenInFull } from "react-icons/md"
import { MdOutlineCloseFullscreen } from "react-icons/md"
interface ProjectItemProps {
  title: string
  subTitle: string
  img: string
  location: string
  date: string
  desc: string
  // text: string
  projectListLength: number
  isOpen: boolean
  onToggle: () => void
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  subTitle,
  // img,
  location,
  date,
  desc,
  // text,
  // projectListLength,
  isOpen,
  onToggle,
}) => {
  const dropDownRef = useRef<HTMLDivElement>(null)
  const sliderContainerRef = useRef<HTMLDivElement>(null)
  const slideWrapperRef = useRef<HTMLDivElement>(null)

  const topBarRef = useRef<HTMLDivElement>(null)
  const bottomBarRef = useRef<HTMLDivElement>(null)

  const leftBorderRef = useRef<HTMLDivElement>(null)
  const rightBorderRef = useRef<HTMLDivElement>(null)

  const topLeftRef = useRef<HTMLDivElement>(null)
  const topRightRef = useRef<HTMLDivElement>(null)
  const bottomLeftRef = useRef<HTMLDivElement>(null)
  const bottomRightRef = useRef<HTMLDivElement>(null)

  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideCount, setSlideCount] = useState(0)
  const [sliderContainerWidth, setSliderContainerWidth] = useState(0)

  // const sliderContainerWidth = sliderContainerRef.current?.clientWidth

  // useEffect(() => {
  //   if (slideWrapperRef.current) {
  //     const count = slideWrapperRef.current.querySelectorAll(".slide").length
  //     setSlideCount(count)
  //   }
  // }, [])

  useEffect(() => {
    if (slideWrapperRef.current) {
      const count = slideWrapperRef.current.querySelectorAll(".slide").length
      setSlideCount(count)
    }

    const updateWidth = () => {
      if (sliderContainerRef.current) {
        setSliderContainerWidth(sliderContainerRef.current.clientWidth)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  useGSAP(() => {
    if (!dropDownRef.current) return
    const content = dropDownRef.current
    const targetHeight = content.scrollHeight

    gsap.to(content, {
      height: isOpen ? targetHeight : 0,
      visibility: isOpen ? "visible" : "hidden",
      duration: 0.4,
      ease: "power2.inOut",
    })
    gsap.to(content, {
      scaleY: isOpen ? 1 : 0,
      duration: 0.25,
      ease: "power2.inOut",
    })

    gsap.to(leftBorderRef.current, {
      x: isOpen ? "-100%" : "0",
      duration: 0.4,
      ease: "power2.inOut",
    })
    gsap.to(rightBorderRef.current, {
      x: isOpen ? "100%" : "0",
      duration: 0.4,
      ease: "power2.inOut",
    })

    gsap.to(topBarRef.current, {
      backgroundColor: isOpen
        ? "rgba(214, 211, 209, 0.4)"
        : "rgba(214, 211, 209, 1)",
      duration: 0.4,
    })
    gsap.to(bottomBarRef.current, {
      backgroundColor: isOpen
        ? "rgba(214, 211, 209, 0.4)"
        : "rgba(214, 211, 209, 1)",
      duration: 0.4,
    })

    gsap.to(topLeftRef.current, {
      borderLeftWidth: isOpen ? "0" : "50px",
      duration: 0.4,
      ease: "power2.inOut",
    })
    gsap.to(topRightRef.current, {
      borderRightWidth: isOpen ? "0" : "50px",
      duration: 0.4,
      ease: "power2.inOut",
    })

    gsap.to(bottomLeftRef.current, {
      borderLeftWidth: isOpen ? "0" : "50px",
      duration: 0.4,
      ease: "power2.inOut",
    })
    gsap.to(bottomRightRef.current, {
      borderRightWidth: isOpen ? "0" : "50px",
      duration: 0.4,
      ease: "power2.inOut",
    })
  }, [isOpen])

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount)
  }

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount)
  }

  return (
    <div className="w-full flex flex-col relative">
      <div
        onClick={onToggle}
        className=" w-full h-22 cursor-pointer border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)] px-6"
      >
        <div className="w-full h-full flex flex-row justify-between items-center">
          <div className="w-1/3 text-xl uppercase">{title}</div>
          <div className="w-1/3 text-sm font-light flex flex-row justify-between">
            <div>{subTitle}</div>
            <div>{date}</div>
          </div>
          <div className="text-base">
            {isOpen ? <MdOutlineCloseFullscreen /> : <MdOutlineOpenInFull />}
          </div>
        </div>
      </div>

      <div
        ref={dropDownRef}
        className="w-full h-auto relative"
        style={{
          visibility: "hidden",
          height: 0,
          transform: "scaleY(0)",
        }}
      >
        {/* Top triangle bar */}
        <div
          ref={topBarRef}
          className="w-full relative h-32 border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)]"
          style={{ backgroundColor: "#d6d3d1" }}
        >
          <div
            ref={topLeftRef}
            className="absolute top-0 left-0 w-0 h-0 border-t-[128px] border-r-[0px] border-b-[0px]  border-solid"
            style={{
              borderColor: "transparent transparent transparent #292524",
              borderLeftWidth: "50px",
            }}
          />
          <div className="w-full h-full flex flex-col justify-center items-start py-12 px-6 tex-sm">
            <p>Location : {location}</p>
            <p>Completion Date : {date}</p>
            <p>Scope of Work : {desc}</p>
          </div>
          <div
            ref={topRightRef}
            className="absolute top-0 right-0 w-0 h-0 border-t-[128px] border-b-[0px] border-l-[0px] border-solid"
            style={{
              borderColor: "transparent #292524  transparent transparent ",
              borderRightWidth: "50px",
            }}
          />
        </div>

        {/* Main content */}

        {/* Slide Section */}
        <div className="py-4 w-full h-120 flex justify-between relative overflow-hidden border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)]">
          {/* Left Border */}
          <div ref={leftBorderRef} className="w-[50px] h-full bg-stone-800" />

          {/* Slides */}
          <div
            ref={sliderContainerRef}
            className="w-full flex-1 h-full overflow-hidden relative"
          >
            <div
              ref={slideWrapperRef}
              className="w-full h-full flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentSlide * sliderContainerWidth
                }px)`,
                width: `${slideCount * sliderContainerWidth}px`,
              }}
            >
              {/* Slide 1 */}
              <div
                style={{ width: sliderContainerWidth }}
                className="slide w-full h-full flex-shrink-0 px-6 py-4 flex flex-col justify-center items-center "
              >
                <div className="w-auto h-full">
                  <Image
                    src="/images/TestImage.png"
                    alt={title}
                    width={1500}
                    height={1000}
                    className="object-cover h-full w-auto"
                  />
                </div>
              </div>

              {/* Slide 2 */}
              <div
                style={{ width: sliderContainerWidth }}
                className="slide w-full h-full flex-shrink-0 px-6 py-4 flex flex-col justify-center items-center"
              >
                <div className="w-autoh-full">
                  <Image
                    src="/images/00-min.jpg"
                    alt={title}
                    width={1500}
                    height={1000}
                    className="object-cover h-full w-auto"
                  />
                </div>
              </div>
              {/* Slide 3 */}
              <div
                style={{ width: sliderContainerWidth }}
                className="slide w-full h-full flex-shrink-0 px-6 py-4 flex flex-col justify-center items-center "
              >
                <div className="w-auto h-full">
                  <Image
                    src="/images/00.png"
                    alt={title}
                    width={1500}
                    height={1000}
                    className="object-cover h-full w-auto"
                  />
                </div>
              </div>
            </div>

            {/* Slide Controls */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded px-2 py-1 shadow"
            >
              ◀
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded px-2 py-1 shadow"
            >
              ▶
            </button>
          </div>

          {/* Right Border */}
          <div ref={rightBorderRef} className="w-[50px] h-full bg-stone-800" />
        </div>

        {/* Bottom triangle bar */}
        <div
          ref={bottomBarRef}
          className="w-full relative h-64 border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)] "
          style={{ backgroundColor: "#d6d3d1" }}
        >
          <div
            ref={bottomLeftRef}
            className="absolute top-0 left-0 w-0 h-0 border-t-[0px] border-r-[0px] border-b-[256px] border-solid"
            style={{
              borderColor: "transparent transparent transparent #292524",
              borderLeftWidth: "50px",
            }}
          />
          <div className="w-full h-full flex justify-center items-center">
            {desc}
          </div>
          <div
            ref={bottomRightRef}
            className="absolute top-0 right-0 w-0 h-0 border-t-[0px] border-l-[0px] border-b-[256px]  border-solid"
            style={{
              borderColor: "transparent #292524 transparent transparent",
              borderRightWidth: "50px",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProjectItem
