import React from "react"
import Link from "next/link"
import HoverLink from "@/components/layouts/hoverLink"

interface FooterLinksProps {
  linkTitle: string
  navItems: { label: string; path: string }[]
}

const FooterLinksList: React.FC<FooterLinksProps> = ({
  linkTitle,
  navItems,
}) => {
  return (
    <div lang="en" className="flex-1">
      <div className="mb-3">{linkTitle}</div>
      <ul className="flex flex-col gap-2 cursor-pointer justify-between">
        {navItems.map((item) => (
          <li key={item.path} className="w-fit">
            <HoverLink
              href={item.path}
              linkText={item.label}
              activeTextColor="text-stone-200"
              activeLineColor="after:bg-stone-200"
              underlineColor="before:tbg-stone-400"
              className="text-stone-400"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterLinksList
