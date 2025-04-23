"use client"

import React, { useState, useContext } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"
// import PageHeader from "@/components/ui/PageHeader"

const AboutUsContent: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const aboutUsTranslation = translations.aboutUsPage

  // State to track the index of the list item that is expanded
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  // Handle toggle function for bio details visibility
  const handleToggleBioDetails = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <div className="px-8 my-12 flex flex-col">
      {/* Map through usList to display each item dynamically */}
      {aboutUsTranslation.usList.map((usItem, index) => (
        <div key={index} className="flex flex-row">
          {/* Display Name */}
          <div className="px-8 my-12 w-1/4">{usItem.name}</div>
          <div className="px-8 my-12 flex-1 flex flex-col">
            {/* Display Main Description */}
            <div className="text-2xl">{usItem.descMain}</div>
            <div>{usItem.descSub}</div>

            {/* Button to toggle bio details */}
            <div
              className="mt-6 w-fit cursor-pointer text-stone-500 relative inline-block before:content-[''] before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-full before:bg-black before:scale-x-0 before:origin-left before:transition-transform before:duration-400 hover:before:scale-x-100"
              onClick={() => handleToggleBioDetails(index)}
            >
              click to see details of bio
            </div>

            {/* Conditionally render the bio details if the current item is expanded */}
            {expandedIndex === index &&
              usItem.bioDetail.map((bio, bioIndex) => (
                <ul key={bioIndex} className="list-disc ml-6 mt-2">
                  <li>{bio}</li>
                </ul>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AboutUsContent
