import React from "react"
import Link from "next/link"

interface FooterLinksProps {
  linkTitle: string
  navItems: { label: string; path: string }[]
}

const FooterLinksList: React.FC<FooterLinksProps> = ({
  linkTitle,
  navItems,
}) => {
  return (
    <div lang="en">
      <div className="mb-3">{linkTitle}</div>
      <ul className="flex flex-col gap-2 cursor-pointer justify-between">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link href={item.path}>
              <div className="">{item.label}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterLinksList
