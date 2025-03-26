"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { twMerge } from "tailwind-merge"

interface NavBarProps {
  navClassName?: string
  ulClassName?: string
  toggleMenu?: (open: boolean) => void
  isHome?: boolean
}

const NavBar: React.FC<NavBarProps> = ({
  navClassName,
  ulClassName,
  toggleMenu,
  isHome,
}) => {
  const pathname = usePathname()

  const navItems = [
    { label: "Projects", path: "/projects" },
    { label: "Consulting", path: "/consulting" },
    { label: "About Us", path: "/aboutUs" },
    { label: "Odd People", path: "/oddPeople" },
    { label: "Contact", path: "/contact" },
  ]


  return (
    <nav className={twMerge("", navClassName)}>
      <ul
        className={twMerge(
          "flex text-sm gap-5 cursor-pointer justify-center",
          ulClassName
        )}
      >
        {isHome ? (
          <li>
            <Link href="/" onClick={() => toggleMenu?.(false)}>
              <div
                className="relative transition-all duration-300 hover:before:scale-x-100 before:content-[''] before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-full before:bg-black before:scale-x-0 before:origin-left before:transition-transform before:duration-400"
              >
                Home
              </div>
            </Link>
          </li>
        ) : null}

        {navItems.map((item) => {
          const isActive = pathname === item.path

          return (
            <li key={item.path}>
              <Link href={item.path} onClick={() => toggleMenu?.(false)}>
                <div
                  // menu item active design
                  // className={twMerge(
                  //   "relative transition-all duration-300",
                  //   isActive ? "font-bold" : "hover:before:scale-x-100",
                  //   !isActive &&
                  //     "before:content-[''] before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-full before:bg-black before:scale-x-0 before:origin-left before:transition-transform before:duration-400"
                  // )}

                  className={twMerge(
                    "relative transition-all duration-300",
                    isActive
                      ? "after:content-[''] after:absolute after:left-0 after:top-1/2 after:h-[1px] after:w-full after:bg-black"
                      : "hover:before:scale-x-100",
                    !isActive &&
                      "before:content-[''] before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-full before:bg-black before:scale-x-0 before:origin-left before:transition-transform before:duration-400"
                  )}
                >
                  {item.label}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default NavBar
