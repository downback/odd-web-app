import React from "react"
import HoverLink from "@/components/ui/HoverLink"

interface FooterLinksProps {
  linkTitle: string
  navItems: { label: string; path: string }[]
  isExternal?: boolean
}

const FooterLinksList: React.FC<FooterLinksProps> = ({
  linkTitle,
  navItems,
  isExternal = false,
}) => {
  return (
    <div lang="en" className="flex-1">
      <div className="mb-3 font-light text-xs">{linkTitle}</div>
      <ul className="flex flex-col gap-1 cursor-pointer justify-between">
        {navItems.map((item) => (
          <li key={item.path} className="w-fit h-fit">
            <HoverLink
              href={item.path}
              linkText={item.label}
              isExternal={isExternal}
              underlineColor="before:bg-stone-400"
              className="text-stone-400"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterLinksList
