import React from "react"

import Link from "next/link"
import Image from "next/image"

import { MdArrowOutward } from "react-icons/md"
import FooterLinksList from "./FooterLinksList"

const Footer: React.FC = () => {
  return (
    <footer
      lang="en"
      className="divide-y-[0.5px] divide-gray-400 text-white bg-black h-3/4 px-8 w-full grid grid-rows-[2fr_2fr_1fr]"
    >
      <div className="w-full py-12 flex flex-col justify-between">
        <Link href="/">
          <Image
            src="/images/LogoWhite.png"
            alt="LogoWhite"
            width={250}
            height={50}
          />
        </Link>

        <Link href="/contact" className="flex self-end">
          <h2 className="text-2xl">CONTACT US</h2>
          <MdArrowOutward className="text-3xl" />
        </Link>
      </div>
      <div className="w-full py-12 grid grid-cols-[2fr_1fr_1fr]">
        <div>
          <h2 className="text-2xl">Find Us</h2>
          <p>Address</p>
          <p>Email Address</p>
          <p>Phone number</p>
        </div>
        <div>
          <FooterLinksList
            linkTitle="NAVIGATION"
            navItems={[
              { label: "Home", path: "/" },
              { label: "Projects", path: "/projects" },
              { label: "About Us", path: "/aboutUs" },
              { label: "Consulting", path: "/consulting" },
              { label: "Contact", path: "/contact" },
            ]}
          />
        </div>
        <div>
          <FooterLinksList
            linkTitle="SOCIAL MEDIA"
            navItems={[
              { label: "Instagram", path: "/" },
              { label: "Youtube", path: "/projects" },
              { label: "Tiktok", path: "/consulting" },
            ]}
          />
        </div>
      </div>
      <div className="h-12 w-full py-6 flex flex-row justify-between">
        <div>© copyright</div>
        <ul className="flex flex-row">
          <li>COPYRIGHT</li>
          <li>IMPRINT</li>
          <li>ABOUT WEBSITE</li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer

//TODO
// [ ] privacy policy & terms of use
// [ ] cookies?
