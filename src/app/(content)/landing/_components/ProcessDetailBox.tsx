import React from "react"
import { twMerge } from "tailwind-merge"

interface ProcessDetailBoxProps {
  title: string
  description: string
  className: string
}

const ProcessDetailBox: React.FC<ProcessDetailBoxProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div className={twMerge("absolute w-40 text-sm", className)}>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-gray-600 mt-1">{description}</p>
      <button>click!</button>
    </div>
  )
}

export default ProcessDetailBox
