"use client"

import React, { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { MdOutlineOpenInFull } from "react-icons/md"
import { MdOutlineCloseFullscreen } from "react-icons/md"
interface ProjectItemProps {
  title: string
  subTitle: string
  location: string
  date: string
  desc: string
  isOpen: boolean
  onToggle: () => void
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  subTitle,
  location,
  date,
  desc,
  isOpen,
  onToggle,
}) => {
  const dropDownRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="w-full flex flex-col relative">
      <div
        onClick={onToggle}
        className=" w-full h-18 cursor-pointer border-b-2 border-stone-100 inset-shadow-[0_-2px_0_0_rgba(0,0,0,0.05)] px-6"
      >
        <div className="flex flex-row justify-between items-center">
          <div>{title}</div>
          <div>{subTitle}</div>
          <div className="">
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
        <div className="relative h-12 bg-stone-300">
          <div
            className="absolute top-0 left-0 w-0 h-0 border-t-[48px] border-r-[0px] border-b-[0px] border-l-[50px] border-solid"
            style={{
              borderColor: "transparent transparent transparent #292524",
            }}
          />
          <div className="">{location}</div>
          <div
            className="absolute top-0 right-0 w-0 h-0 border-t-[48px] border-r-[50px] border-b-[0px] border-l-[0px] border-solid"
            style={{
              borderColor: "transparent #292524  transparent transparent ",
            }}
          />
        </div>

        {/* Main content */}
        <div className="w-full h-48 flex justify-between  ">
          <div className="w-[50px] h-full bg-stone-800" />
          <div className="flex-auto bg-[#edebeb]">{date}</div>
          <div className="w-[50px] h-full bg-stone-800" />
        </div>

        {/* Bottom triangle bar */}
        <div className="relative h-12 bg-stone-300 border-b-2 border-stone-100 inset-shadow-[0_-2px_0_0_rgba(0,0,0,0.05)]">
          <div
            className="absolute top-0 left-0 w-0 h-0 border-t-[0px] border-r-[0px] border-b-[48px] border-l-[50px] border-solid"
            style={{
              borderColor: "transparent transparent transparent #292524",
            }}
          />
          <div className="">{desc}</div>
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
