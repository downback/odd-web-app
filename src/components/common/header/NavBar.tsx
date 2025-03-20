"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NavBar: React.FC = () => {
  const pathname = usePathname()

  const navItems = [
    { label: "Projects", path: "/projects" },
    { label: "Consulting", path: "/consulting" },
    { label: "About Us", path: "/aboutUs" },
    { label: "Contact", path: "/contact" },
  ]

  return (
    <nav>
      <ul className="flex text-sm gap-2 cursor-pointer items-center justify-evenly">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link href={item.path}>
              <div
                className={`transition-colors duration-200 ${
                  pathname === item.path ? "font-bold" : "hover:text-gray-800"
                }`}
              >
                {item.label}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
