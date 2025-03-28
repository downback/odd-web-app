"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { twMerge } from "tailwind-merge"

interface HoverLinkProps {
  href: string
  linkText: string
  className?: string
  underlineColor?: string
  activeLineColor?: string // example: "bg-black", "bg-white", "bg-red-500"
  activeTextColor?: string
}

const HoverLink: React.FC<HoverLinkProps> = ({
  href,
  linkText,
  className,
  activeLineColor = "after:bg-black",
  activeTextColor = "bg-black",
  underlineColor = "before:bg-black",
}) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <li>
      <Link href={href}>
        <div
          className={twMerge(
            "relative transition-all duration-300",
            className,
            isActive
              ? `after:content-[''] after:absolute after:left-0 after:top-1/2 after:h-[1px] after:w-full ${activeLineColor} ${activeTextColor}`
              : "hover:before:scale-x-100",
            !isActive &&
              `before:content-[''] before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-full  before:scale-x-0 before:origin-left before:transition-transform before:duration-400 ${underlineColor} `
          )}
        >
          {linkText}
        </div>
      </Link>
    </li>
  )
}

export default HoverLink
