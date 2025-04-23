"use client"

import Image from "next/image"
import { UpdateItem } from "../page"

interface UpdatesDetailProps {
  update: UpdateItem | null
}

const UpdatesDetail: React.FC<UpdatesDetailProps> = ({ update }) => {
  if (!update) {
    return (
      <div className="w-full h-72 flex justify-center items-center">
        <p className="text-gray-500">New Updates Coming soon ...</p>
      </div>
    )
  }

  return (
    <div className="w-full h-fit flex flex-col justify-center items-center p-6">
      <h2 className="text-2xl font-bold mb-4">{update.title}</h2>
      <p className="text-sm text-gray-500 mb-2">{update.date}</p>
      <div className="w-7/8 md:w-5/6 h-96 relative mb-4 rounded overflow-hidden">
        <Image
          src={update.imageUrl}
          alt={update.title}
          fill
          className="object-cover rounded"
        />
      </div>
      <p className="w-7/8 text-gray-700 whitespace-pre-line text-center">
        {update.description}
      </p>
    </div>
  )
}

export default UpdatesDetail
