import React from "react"

import Link from "next/link"
import Image from "next/image"

import { MdArrowOutward } from "react-icons/md"
import FooterLinksList from "./FooterLinksList"
import HoverLink from "@/components/ui/HoverLink"

const Footer: React.FC = () => {
  return (
    <footer
      lang="en"
      className="divide-y-[0.5px] divide-gray-400 text-stone-300 bg-stone-950 h-1/2 px-8 w-full flex flex-col"
    >
      <div className="w-full py-8 md:py-12 flex flex-col justify-between h-72 md:h-80">
        <div className="w-48 md:w-50 xl:w-56">
          <Link href="/">
            <Image
              src="/images/LogoWhite.png"
              alt="LogoWhite"
              width={300}
              height={150}
              priority
              unoptimized
            />
          </Link>
        </div>

        <Link href="/contact" className="flex self-end">
          <h2 className="text-xl md:text-2xl">CONTACT US</h2>
          <MdArrowOutward className="text-2xl md:text-3xl" />
        </Link>
      </div>
      <div className="w-full flex flex-col py-8 md:py-12 md:grid md:grid-cols-[1.5fr_1fr] h-max">
        <div>
          <h2 className="text-xl md:text-2xl">Find Us</h2>
          <p>Address</p>
          <p>Email Address</p>
          <p>Phone number</p>
        </div>
        <div className="flex flex-row justify-between mt-6 md:mt-0">
          <FooterLinksList
            linkTitle="NAVIGATION"
            navItems={[
              { label: "Home", path: "/" },
              { label: "Projects", path: "/projects" },
              { label: "About Us", path: "/aboutUs" },
              { label: "Consulting", path: "/consulting" },
              { label: "Odd People", path: "/oddPeople" },
              { label: "Contact", path: "/contact" },
            ]}
          />
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
      <div className="h-24 md:h-36 w-full py-6 flex flex-row justify-between text-sm text-stone-400">
        <div className="flex flex-col md:flex-row gap-2">
          <div>WEBSITE copyright</div>
          <Link href="/" className="text-stone-300">
            © DAEUN PARK
          </Link>
        </div>
        <ul className="flex flex-col md:flex-row md:items-start items-end gap-2 relative">
          <HoverLink
            href="/contact"
            linkText="PRIVACY POLICY"
            activeTextColor="text-stone-200"
            activeLineColor="after:bg-stone-200"
            underlineColor="before:tbg-stone-400"
            className="text-stone-400 w-fit"
          />
          <HoverLink
            href="/"
            linkText="IMPRINT"
            activeTextColor="text-stone-200"
            activeLineColor="after:bg-stone-200"
            underlineColor="before:tbg-stone-400"
            className="text-stone-400"
          />
        </ul>
      </div>
    </footer>
  )
}

export default Footer

//TODO
// [ ] privacy policy & terms of use
// [ ] cookies?
