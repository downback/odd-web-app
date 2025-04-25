"use client"

import React, { useContext } from "react"
import Image from "next/image"
import { UpdateItem } from "../page"
import { LanguageContext } from "../../../../context/LanguageContext"

interface UpdatesDetailProps {
  update: UpdateItem | null
}

const UpdatesDetail: React.FC<UpdatesDetailProps> = ({ update }) => {
  const { translations } = useContext(LanguageContext)
  const UpdatesPageTranslation = translations?.UpdatesPage

  if (!update) {
    return (
      <div className="w-full h-72 flex justify-center items-center">
        <p className="text-gray-500">{UpdatesPageTranslation.comingSoonText}</p>
      </div>
    )
  }

  return (
    <div className="w-full h-fit flex flex-col justify-start lg:justify-center items-center p-6">
      <h2 className="text-2xl font-bold mb-4">{update.title}</h2>
      <p className="text-sm text-gray-500 mb-2">{update.date}</p>
      <div className="w-full lg:w-5/6 h-fit relative mb-4 rounded overflow-hidden flex justify-center items-center">
        <Image
          src={update.imageUrl}
          alt={update.title}
          width={500}
          height={300}
          className="object-cover rounded"
          layout="intrinsic"
        />
      </div>
      <p className="w-full lg:w-5/6  text-gray-700 whitespace-pre-line text-center">
        {update.description}
      </p>
    </div>
  )
}

export default UpdatesDetail
