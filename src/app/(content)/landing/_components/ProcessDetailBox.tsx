import React from "react"
import { twMerge } from "tailwind-merge"

interface ProcessDetailBoxProps {
  title: string
  className: string
}

const ProcessDetailBox: React.FC<ProcessDetailBoxProps> = ({
  title,
  className,
}) => {
  return <div className={twMerge("absolute w-40", className)}>{title}</div>
}

export default ProcessDetailBox
