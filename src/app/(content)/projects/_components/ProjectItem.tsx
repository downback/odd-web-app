"use client"

import React, { useRef, useState, useEffect, useContext } from "react"
import Image from "next/image"
import { LanguageContext } from "../../../../context/LanguageContext"
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
  scopeTags: string[]
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
  const { translations } = useContext(LanguageContext)
  const projectsPageTranslation = translations.projectsPage

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
  const [sliderContainerWidth, setSliderContainerWidth] = useState(0)
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([])

  useEffect(() => {
    if (imgList.length > 0) {
      setImageLoaded(Array(imgList.length).fill(false))
    }
  }, [imgList])

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
        className=" w-full h-22 py-0.5 cursor-pointer border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)] px-6"
      >
        <div className="w-full h-full flex flex-row justify-between items-center">
          <div className="w-1/3 md:w-xs flex h-full justify-between items-center">
            <div lang="en" className="text-lg md:text-xl uppercase">
              {title}
            </div>
          </div>
          <div className="w-1/3 md:w-xs text-xs md:text-sm text-left md:text-center font-light text-gray-500">
            {subTitle}
          </div>
          <div className="flex-1 flex text-base h-16 justify-end items-center gap-2">
            {isOpen ? (
              <>
                <div lang="en" className="hidden md:block">
                  Click to close
                </div>
                <MdOutlineCloseFullscreen className="text-sm md:text-base" />
              </>
            ) : (
              <div>
                <MdOutlineOpenInFull className="text-sm md:text-base" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        ref={dropDownRef}
        className="w-full h-fit relative"
        style={{
          visibility: "hidden",
          height: 0,
          transform: "scaleY(0)",
          transformOrigin: "top",
        }}
      >
        {/* Top bar */}
        <div
          ref={topBarRef}
          className="w-full relative h-24 border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)]"
          style={{ backgroundColor: "#d6d3d1" }}
        >
          <div
            ref={topLeftRef}
            className="absolute top-0 left-0 w-0 h-0 border-t-[96px] border-r-[0px] border-b-[0px]  border-solid"
            style={{
              borderColor: "transparent transparent transparent #292524",
              borderLeftWidth: "50px",
            }}
          />
          <div className="w-full h-full flex flex-col justify-center items-start px-6 tex-sm">
            <div className="w-full h-fit flex justify-between">
              <p className="w-fit md:w-36  text-sm">
                {projectsPageTranslation.location} :
              </p>
              <p lang="en">{location}</p>
            </div>
            <div className="w-full h-fit flex justify-between">
              <p className="w-fit md:w-36 text-sm">
                {projectsPageTranslation.completionDate} :
              </p>
              <p lang="en">{date}</p>
            </div>
          </div>
          <div
            ref={topRightRef}
            className="absolute top-0 right-0 w-0 h-0 border-t-[96px] border-l-[0px] border-b-[0px]  border-solid"
            style={{
              borderColor: "transparent #292524  transparent transparent ",
              borderRightWidth: "50px",
            }}
          />
        </div>

        {/* Main content */}
        <div className="relative w-full h-110 md:h-120 flex justify-between overflow-hidden border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)]">
          <div ref={leftBorderRef} className="w-[50px] bg-stone-800 h-full" />
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
                  className="relative slide w-full h-full flex justify-center items-center"
                >
                  <div className="w-auto h-full overflow-hidden flex items-center relative">
                    {!imageLoaded[idx] && (
                      <div className="absolute z-10 inset-0 bg-gray-200 animate-pulse" />
                    )}
                    <Image
                      src={url}
                      alt={`${title}-${idx}`}
                      width={1500}
                      height={1000}
                      onLoadingComplete={() => {
                        setImageLoaded((prev) => {
                          const updated = [...prev]
                          updated[idx] = true
                          return updated
                        })
                      }}
                      className="object-cover h-auto w-full md:h-full md:w-auto"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            onClick={handlePrev}
            className="absolute top-0 w-2/5 h-110 md:h-120 left-3 md:left-20 lg:left-0 cursor-pointer flex justify-start lg:justify-center items-center"
          >
            <MdArrowBackIosNew className="m-0 text-2xl" />
          </div>
          <div
            onClick={handleNext}
            className="absolute top-0 w-2/5 h-110 md:h-120 right-3 md:right-20 lg:right-0 cursor-pointer flex justify-end lg:justify-center items-center"
          >
            <MdArrowForwardIos className="m-0 text-2xl" />
          </div>
          <div ref={rightBorderRef} className="w-[50px] h-full bg-stone-800" />
        </div>

        {/* Bottom bar */}
        <div
          ref={bottomBarRef}
          className="w-full relative h-90 md:h-64 border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)] "
          style={{ backgroundColor: "#d6d3d1" }}
        >
          <div
            ref={bottomLeftRef}
            className="absolute top-0 left-0 w-0 h-0 border-t-[0px] border-r-[0px] border-b-[360px] md:border-b-[256px]  border-solid"
            style={{
              borderColor: "transparent transparent transparent #292524",
              borderLeftWidth: "50px",
            }}
          />
          <div className="w-full h-fit flex flex-col justify-start items-center p-6">
            <div className="w-full h-fit flex justify-between flex-col md:flex-row">
              <p className="w-fit md:w-36 text-sm">
                {projectsPageTranslation.scopeOfWorks} :
              </p>
              <div className="w-full flex flex-wrap justify-start md:justify-end gap-1 text-xs md:text-sm mt-2 md:mt-0">
                {scopeTags.map((tag, index) => (
                  <div
                    key={index}
                    className=" w-fit border border-stone-950 rounded-xl px-2 "
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-8 md:mt-12">{projectText}</p>
          </div>
          <div
            ref={bottomRightRef}
            className="absolute top-0 right-0 w-0 h-0 border-t-[0px] border-r-[0px] border-b-[360px] md:border-b-[256px] border-solid"
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
