"use client"

import React from "react"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

interface HoverLinkProps {
  href: string
  linkText: string
  className?: string
  underlineColor?: string 
  isExternal?: boolean
}

const HoverLink: React.FC<HoverLinkProps> = ({
  href,
  linkText,
  className,
  underlineColor = "before:bg-black",
  isExternal = false,
}) => {
  const baseClasses =
    "relative inline-block overflow-hidden transition-all duration-300"

  const hoverEffectClasses = twMerge(
    "before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[1px] before:w-full before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100 before:top-1/2",
    underlineColor
  )

  const combinedClasses = twMerge(baseClasses, hoverEffectClasses, className)

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
      >
        {linkText}
      </a>
    )
  }

  return (
    <Link href={href}>
      <span className={combinedClasses}>{linkText}</span>
    </Link>
  )
}

export default HoverLink
