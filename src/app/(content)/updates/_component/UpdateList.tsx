"use client"

import React from "react"
import { twMerge } from "tailwind-merge"
import { UpdateItem } from "../page"

import { MdOutlineOpenInFull } from "react-icons/md"
import { MdOutlineCloseFullscreen } from "react-icons/md"

interface UpdateListProps {
  updates: UpdateItem[]
  onSelect: (item: UpdateItem) => void
  selectedId?: string
}

const UpdateList: React.FC<UpdateListProps> = ({
  updates,
  onSelect,
  selectedId,
}) => {
  return (
    <div className="w-full">
      <h3 className="px-6 py-2 text-sm uppercase border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)]">
        Updates
      </h3>
      {updates.length === 0 ? (
        <ul>
          <li className="w-full flex h-22 justify-between items-center px-6 py-4 border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)]">
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-gray-500">New Updates Coming soon ...</p>
            </div>
          </li>
        </ul>
      ) : (
        <ul>
          {updates.map((update) => (
            <li
              key={update.id}
              onClick={() => {
                onSelect(update)
                window.scrollTo({ top: 100, behavior: "smooth" })
              }}
              className={twMerge(
                "w-full flex h-22 justify-between items-center cursor-pointer px-6 py-4 border-b-[1.2px] border-stone-100 inset-shadow-[0_-1.2px_0_0_rgba(0,0,0,0.05)]  transition-all",
                selectedId === update.id
                  ? "cursor-default"
                  : "cursor-pointer hover:bg-stone-200"
              )}
            >
              <div className="w-xs flex h-full justify-between items-center">
                <div className="text-xl font-semibold">{update.title}</div>
                <div className="text-sm text-gray-500">{update.date}</div>
              </div>
              <div className="flex flex-2 h-16 justify-end items-center gap-2">
                {selectedId === update.id ? (
                  <p className="relative inline-block before:content-[''] before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-full before:bg-black before:origin-left before:scale-x-100">
                    This article is open above
                  </p>
                ) : (
                  <>
                    Click to open
                    <MdOutlineOpenInFull />
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UpdateList
