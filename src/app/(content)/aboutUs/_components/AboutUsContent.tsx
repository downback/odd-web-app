"use client"

import React, { useState, useContext, useRef, useEffect } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"
import { twMerge } from "tailwind-merge"

const AboutUsContent: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const aboutUsTranslation = translations.aboutUsPage

  const [expandedIndex, setExpandedIndex] = useState<number[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [showImage, setShowImage] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.pageX + 30, y: e.pageY + 30 })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleMouseEnter = (profileImageUrl: string) => {
    setImageUrl(profileImageUrl)
    setShowImage(true)
  }

  const handleMouseLeave = () => {
    setShowImage(false)
    setImageUrl(null)
  }

  const handleToggleBioDetails = (index: number) => {
    if (expandedIndex.includes(index)) {
      setExpandedIndex(expandedIndex.filter((i) => i !== index))
    } else {
      setExpandedIndex([...expandedIndex, index])
    }
  }

  return (
    <div className="px-6 sm:px-12 md:px-16 my-12 flex flex-col">
      {aboutUsTranslation.usList.map((usItem, index) => (
        <div key={index}>
          <div
            className="flex flex-row mb-12 relative overflow-hidden"
            onMouseEnter={() => handleMouseEnter(usItem.profileImageUrl)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-1/4">{usItem.name}</div>
            <div className="flex-1 flex flex-col ml-2 md:ml-0">
              <div className="text-2xl italic cursor-pointer">
                &quot; {usItem.descMain} &quot;
              </div>

              <div className="w-full flex flex-wrap justify-start gap-1 text-xs md:text-sm mt-2">
                {usItem.jobTitles.map((jobTitle, idex) => (
                  <div
                    key={idex}
                    className="border border-stone-950 rounded-xl px-2"
                  >
                    {jobTitle}
                  </div>
                ))}
              </div>

              <div
                className={twMerge(
                  "w-fit mt-6 cursor-pointer text-stone-600 relative inline-block before:content-[''] before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-full before:bg-black before:scale-x-0 before:origin-left before:transition-transform before:duration-400",
                  expandedIndex.includes(index)
                    ? "before:scale-x-100"
                    : "hover:before:scale-x-100"
                )}
                onClick={() => handleToggleBioDetails(index)}
                onMouseEnter={handleMouseLeave}
                onMouseLeave={() => handleMouseEnter(usItem.profileImageUrl)}
              >
                {!expandedIndex.includes(index) && aboutUsTranslation.bioOpen}
                {expandedIndex.includes(index) && aboutUsTranslation.bioClose}
              </div>
              <div
                onMouseEnter={handleMouseLeave}
                onMouseLeave={() => handleMouseEnter(usItem.profileImageUrl)}
              >
                {expandedIndex.includes(index) &&
                  usItem.bioDetail.map((bio, bioIndex) => (
                    <ul
                      key={bioIndex}
                      className="ml-0 md:ml-6 mt-4 md:mt-6 text-sm md:text-base"
                    >
                      <li className="flex flex-row">
                        <div className="absolute mt-1 md:mt-1 w-3 h-3 md:w-4 md:h-4 bg-white border border-black rounded-full"></div>
                        <p className="ml-4 md:ml-6">{bio}</p>
                      </li>
                    </ul>
                  ))}
              </div>
            </div>
          </div>
          {showImage && imageUrl && (
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Profile"
              className="absolute w-30 h-30 shadow-lg z-50 object-cover"
              style={{
                top: mousePos.y,
                left: mousePos.x,
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default AboutUsContent
