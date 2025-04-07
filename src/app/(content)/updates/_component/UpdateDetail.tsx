"use client"

import React from "react"
import Image from "next/image"

interface UpdateDetailProps {
  update: {
    id: number
    title: string
    date: string
    description: string
    imageUrl: string
  }
}

const UpdateDetail: React.FC<UpdateDetailProps> = ({ update }) => {
  return (
    <div className="w-full h-1/2 my-12 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-2">{update.title}</h2>
      <p className="text-gray-500 text-sm mb-4">{update.date}</p>
      <div className="w-2/3 h-auto mb-4">
        <Image
          src={update.imageUrl}
          alt={update.title}
          width={800}
          height={400}
          className="rounded w-full h-auto object-cover"
        />
      </div>
      <p className="text-gray-700 text-base">{update.description}</p>
    </div>
  )
}

export default UpdateDetail
