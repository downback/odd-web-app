"use client"

import React from "react"
import { twMerge } from "tailwind-merge"

interface UpdateItem {
  id: number
  title: string
  date: string
  description: string
  imageUrl: string
}

interface UpdateListProps {
  updates: UpdateItem[]
  onSelect: (item: UpdateItem) => void
  selectedId?: number
}

const UpdateList: React.FC<UpdateListProps> = ({
  updates,
  onSelect,
  selectedId,
}) => {
  return (
    <div className="">
      <h3 className="px-6 text-sm mt-12  border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)]">
        Updates
      </h3>
      <ul className="">
        {updates.map((update) => (
          <li
            key={update.id}
            onClick={() => onSelect(update)}
            className=" w-full h-22 cursor-pointer border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)] px-6"
          >
            <div className="w-full h-full flex flex-row justify-between items-center">
              <div className="w-1/3 text-xl uppercase">{update.title}</div>
              <div className="w-1/3 text-sm font-light flex flex-row justify-between">
                <div>{update.date}</div>
              </div>
              <div
                className={twMerge(
                  "cursor-pointer p-3 rounded border hover:bg-gray-50",
                  selectedId === update.id && "border-blue-500 bg-blue-50"
                )}
              >
                {/* {isOpen ? <MdOutlineCloseFullscreen /> : <MdOutlineOpenInFull />} */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UpdateList
