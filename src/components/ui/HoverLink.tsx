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
  activeLineColor?: string
  activeTextColor?: string
  isExternal?: boolean
}

const HoverLink: React.FC<HoverLinkProps> = ({
  href,
  linkText,
  className,
  underlineColor = "before:bg-black",
  activeLineColor = "after:bg-black",
  activeTextColor = "text-black",
  isExternal = false,
}) => {
  const pathname = usePathname()
  const isActive = pathname === href

  const linkClasses = twMerge(
    "relative inline-block overflow-hidden transition-all duration-300",
    className,
    isActive
      ? `after:content-[''] after:absolute after:left-0 after:top-1/2 after:h-[1px] after:w-full ${activeLineColor} ${activeTextColor}`
      : "hover:line-through",
    !isActive &&
      `before:content-[''] before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-full ${underlineColor} before:scale-x-0 before:origin-left before:transition-transform before:duration-300`
  )

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        {linkText}
      </a>
    )
  }

  return (
    <Link href={href}>
      <span className={linkClasses}>{linkText}</span>
    </Link>
  )
}

export default HoverLink

//DEBUG
//
