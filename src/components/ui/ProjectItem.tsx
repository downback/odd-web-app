"use client"

import React, { useRef, useState, useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { MdOutlineOpenInFull } from "react-icons/md"
import { MdOutlineCloseFullscreen } from "react-icons/md"
import { MdArrowBackIosNew } from "react-icons/md"
import { MdArrowForwardIos } from "react-icons/md"

interface ProjectItemProps {
  title: string
  subTitle: string
  imgList: string[]
  location: string
  date: string
  scopeTags: string
  projectText: string
  projectListLength: number
  isOpen: boolean
  onToggle: () => void
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  subTitle,
  location,
  imgList,
  date,
  scopeTags,
  projectText,
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
  // const [slideCount, setSlideCount] = useState(0)
  const [sliderContainerWidth, setSliderContainerWidth] = useState(0)

  // const slideCount = imgList.length
  useEffect(() => {
    const updateWidth = () => {
      if (sliderContainerRef.current) {
        setSliderContainerWidth(sliderContainerRef.current.clientWidth)
      }
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  }, [])

  useGSAP(() => {
    if (!dropDownRef.current) return
    const content = dropDownRef.current
    const targetHeight = content.scrollHeight

    gsap.to(content, {
      height: isOpen ? targetHeight : 0,
      visibility: isOpen ? "visible" : "hidden",
      scaleY: isOpen ? 1 : 0,
      duration: 0.55,
      ease: "circ.in",
    })

    gsap.to(leftBorderRef.current, {
      x: isOpen ? "-100%" : "0",
      duration: 0.55,
      ease: "circ.in",
    })
    gsap.to(rightBorderRef.current, {
      x: isOpen ? "100%" : "0",
      duration: 0.55,
      ease: "circ.in",
    })

    gsap.to(topBarRef.current, {
      backgroundColor: isOpen
        ? "rgba(214, 211, 209, 0.4)"
        : "rgba(214, 211, 209, 1)",
      duration: 0.55,
    })
    gsap.to(bottomBarRef.current, {
      backgroundColor: isOpen
        ? "rgba(214, 211, 209, 0.4)"
        : "rgba(214, 211, 209, 1)",
      duration: 0.55,
    })

    gsap.to(topLeftRef.current, {
      borderLeftWidth: isOpen ? "0" : "50px",
      duration: 0.55,
      ease: "circ.in",
    })
    gsap.to(topRightRef.current, {
      borderRightWidth: isOpen ? "0" : "50px",
      duration: 0.55,
      ease: "circ.in",
    })

    gsap.to(bottomLeftRef.current, {
      borderLeftWidth: isOpen ? "0" : "50px",
      duration: 0.55,
      ease: "circ.in",
    })
    gsap.to(bottomRightRef.current, {
      borderRightWidth: isOpen ? "0" : "50px",
      duration: 0.55,
      ease: "circ.in",
    })
  }, [isOpen])

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % imgList.length)
  }

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + imgList.length) % imgList.length)
  }

  return (
    <div className="w-full h-fit flex flex-col relative">
      <div
        onClick={onToggle}
        className=" w-full h-22 cursor-pointer border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)] px-6"
      >
        <div className="w-full h-full flex flex-row justify-between items-center">
          <div className="w-24 md:w-xs flex h-full justify-between items-center">
            <div className="text-xl uppercase">{title}</div>
          </div>
          <div className="w-24 md:w-xs text-sm text-center font-light text-gray-500">
            {subTitle}
          </div>
          <div className="flex-1 flex text-base h-16 justify-end items-center gap-2">
            {isOpen ? (
              <>
                <div>Click to close</div>
                <MdOutlineCloseFullscreen />
              </>
            ) : (
              <div>
                <MdOutlineOpenInFull />
              </div>
            )}
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
          transformOrigin: "top",
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
            <div className="w-full h-fit flex justify-between">
              <p className="w-fit md:w-36  text-sm">Location :</p>
              <p>{location}</p>
            </div>
            <div className="w-full h-fit flex justify-between">
              <p className="w-fit md:w-36 text-sm">Completion Date :</p>
              <p>{date}</p>
            </div>
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
        <div className="relative w-full h-140 md:h-120 flex justify-between overflow-hidden border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)]">
          {/* Left Border */}
          <div ref={leftBorderRef} className="w-[50px] bg-stone-800 h-full" />

          {/* Slides */}
          <div
            ref={sliderContainerRef}
            className="w-full flex-1 py-4 h-full relative overflow-hidden"
          >
            <div
              ref={slideWrapperRef}
              className="w-full h-full flex transition-transform duration-500 ease-in-out items-center"
              style={{
                transform: `translateX(-${
                  currentSlide * sliderContainerWidth
                }px)`,
                width: `${imgList.length * sliderContainerWidth}px`,
              }}
            >
              {imgList.map((url, idx) => (
                <div
                  key={idx}
                  style={{ width: sliderContainerWidth }}
                  className="slide w-full h-full flex justify-center items-center"
                >
                  <div className="w-auto h-full overflow-hidden flex items-center">
                    <Image
                      src={url}
                      alt={`${title}-${idx}`}
                      width={1500}
                      height={1000}
                      className="object-cover h-auto w-full md:h-full md:w-auto"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Controls */}
          <div
            onClick={handlePrev}
            className="absolute top-0 w-2/5 h-140 md:h-120 left-3 md:left-0 cursor-pointer flex justify-start md:justify-center items-center"
          >
            <MdArrowBackIosNew className="m-0 text-2xl" />
          </div>
          <div
            onClick={handleNext}
            className="absolute top-0 w-2/5 h-140 md:h-120 right-3 md:right-0 cursor-pointer flex justify-end md:justify-center items-center"
          >
            <MdArrowForwardIos className="m-0 text-2xl" />
          </div>
          {/* Right Border */}
          <div ref={rightBorderRef} className="w-[50px] h-full bg-stone-800" />
        </div>

        {/* Bottom triangle bar */}
        <div
          ref={bottomBarRef}
          className="w-full relative h-60 md:h-120 border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)] "
          style={{ backgroundColor: "#d6d3d1" }}
        >
          <div
            ref={bottomLeftRef}
            className="absolute top-0 left-0 w-0 h-0 border-t-[0px] border-r-[0px] border-b-[320px] md:border-b-[480px] border-solid"
            style={{
              borderColor: "transparent transparent transparent #292524",
              borderLeftWidth: "50px",
            }}
          />
          <div className="w-full h-full flex flex-col justify-center items-start py-12 px-6">
            <div>
              <p className="text-sm">Scope of Work :</p>
              <p>{scopeTags}</p>
              <p className="">{projectText}</p>
            </div>
            <div></div>
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
