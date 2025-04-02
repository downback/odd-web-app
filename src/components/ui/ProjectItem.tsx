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
  projectListLength: number
  isOpen: boolean
  onToggle: () => void
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  subTitle,
  img,
  location,
  date,
  desc,
  projectListLength,
  isOpen,
  onToggle,
}) => {
  const dropDownRef = useRef<HTMLDivElement>(null)
  const sliderContainerRef = useRef<HTMLDivElement>(null)
  const slideWrapperRef = useRef<HTMLDivElement>(null)

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
    gsap.to(dropDownRef.current, {
      scaleY: isOpen ? 1 : 0,
      duration: 0.25,
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
        className=" w-full h-22 cursor-pointer border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)]  px-6"
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
        style={{ visibility: "hidden", height: 0, transform: "scaleY(0)" }}
      >
        {/* Top triangle bar */}
        <div className="w-full relative h-12 bg-stone-300">
          <div
            className="absolute top-0 left-0 w-0 h-0 border-t-[48px] border-r-[0px] border-b-[0px] border-l-[50px] border-solid"
            style={{
              borderColor: "transparent transparent transparent #292524",
            }}
          />
          <div className="w-full h-full flex justify-center items-center">
            {/* {location} */}
          </div>
          <div
            className="absolute top-0 right-0 w-0 h-0 border-t-[48px] border-r-[50px] border-b-[0px] border-l-[0px] border-solid"
            style={{
              borderColor: "transparent #292524  transparent transparent ",
            }}
          />
        </div>

        {/* Main content */}
        {/* <div className="w-full h-96 flex justify-between  ">
          <div className="w-[50px] h-full bg-stone-800" />
          <div className="flex-1 h-full bg-[#edebeb]">
            <div className="w-full h-full">
              <div className="w-full h-full bg-amber-200">
                <div className="">image title</div>
                <div className="">
                  <Image
                    src="/images/TestImage.png"
                    alt="TestImage"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="w-full h-full bg-blue-200 hidden">
                2nd slide of slide show
              </div>
            </div>
          </div>
          <div className="w-[50px] h-full bg-stone-800" />
        </div> */}

        {/* Slide Section */}
        <div className="w-full h-96 flex justify-between relative overflow-hidden">
          {/* Left Border */}
          <div className="w-[50px] h-full bg-stone-800" />

          {/* Slides */}
          <div
            ref={sliderContainerRef}
            className="w-full flex-1 h-full bg-[#edebeb] overflow-hidden relative"
          >
            <div
              ref={slideWrapperRef}
              className="w-full h-full  flex transition-transform duration-500 ease-in-out"
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
                className="slide h-full flex-shrink-0 px-6 py-4 flex flex-col justify-center items-center "
              >
                <div className="mb-4 font-semibold text-lg">{title}</div>
                <Image
                  // src={`/images/${img}`}
                  src="/images/TestImage.png"
                  alt={title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto", maxHeight: "80%" }}
                />
              </div>

              {/* Slide 2 */}
              <div
                style={{ width: sliderContainerWidth }}
                className="slide w-full h-full flex-shrink-0 px-6 py-4 flex flex-col justify-center items-center"
              >
                <div className="mb-4 font-semibold text-lg">Slide Two</div>
                <p>Additional content for this slide goes here.</p>
              </div>
              {/* Slide 3 */}
              <div
                style={{ width: sliderContainerWidth }}
                className="slide w-full h-full flex-shrink-0 px-6 py-4 flex flex-col justify-center items-center "
              >
                <div className="mb-4 font-semibold text-lg">Slide Two</div>
                <p>Additional content for this slide goes here.</p>
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
          <div className="w-[50px] h-full bg-stone-800" />
        </div>

        {/* Bottom triangle bar */}
        <div className="w-full relative h-12 bg-stone-300 border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)] ">
          <div
            className="absolute top-0 left-0 w-0 h-0 border-t-[0px] border-r-[0px] border-b-[48px] border-l-[50px] border-solid"
            style={{
              borderColor: "transparent transparent transparent #292524",
            }}
          />
          <div className="w-full h-full flex justify-center items-center">
            {/* {desc} */}
          </div>
          <div
            className="absolute top-0 right-0 w-0 h-0 border-t-[0px] border-l-[0px] border-b-[48px] border-r-[50px] border-solid"
            style={{
              borderColor: "transparent #292524 transparent transparent",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProjectItem
