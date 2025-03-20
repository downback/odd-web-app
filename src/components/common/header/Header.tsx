import React from "react"

import Link from "next/link"
import Image from "next/image"
import NavBar from "./NavBar"
import LanguageSwitcher from "./LanguageSwitcher"

const Header: React.FC = () => {
  return (
    <header
      lang="en"
      className="fixed z-50 px-4 py-4 w-full h-16 grid grid-cols-3"
    >
      <div>
        <Link href="/">
          <Image
            src="/images/LogoBlack.png"
            alt="LogoBlack"
            width={150}
            height={50}
          />
        </Link>
      </div>

      <NavBar />

      <div>
        <LanguageSwitcher />
      </div>
    </header>
  )
}

export default Header
