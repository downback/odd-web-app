"use client"

import React, { useRef, useState } from "react"

import Link from "next/link"
import Image from "next/image"
import NavBar from "./NavBar"
import LanguageSwitcher from "./LanguageSwitcher"
import { CiMenuFries } from "react-icons/ci"
import { IoCloseOutline } from "react-icons/io5"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useScrollTrigger } from "@/context/ScrollTriggerContext"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  // const [lastScrollTop, setLastScrollTop] = useState(0)
  const { sectionTriggerRef } = useScrollTrigger()

  useGSAP(() => {
    const header = headerRef.current
    const bg = bgRef.current
    const logo = logoRef.current
    // const trigger = triggerRef.current

    if (!header || !bg || !logo || !sectionTriggerRef.current) return

    // const animateY = gsap.quickTo(header, "y", {
    //   duration: 0.8,
    //   ease: "power3.out",
    // })

    // gsap.to(header, {
    //   height: "2.5rem",
    //   duration: 0.6,
    //   ease: "power1.inOut",
    //   scrollTrigger: {
    //     // trigger: sectionTriggerRef.current,
    //     trigger: header,
    //     start: "+=600",
    //     end: "+=100",
    //     scrub: true,
    //     markers: true,
    //   },
    // })
    // gsap.to(logo, {
    //   scale: 0.8,
    //   duration: 0.6,
    //   ease: "power1.inOut",
    //   scrollTrigger: {
    //     // trigger: sectionTriggerRef.current,
    //     trigger: header,
    //     // start: "top top",
    //     start: "+=600",
    //     end: "+=100",
    //     scrub: true,
    //     // markers: true,
    //   },
    // })

    // let lastScroll = window.scrollY

    const handleScroll = () => {
      const currentScroll = window.scrollY
      const isMobile = window.innerWidth < 768

      if (!isMobile) {
        gsap.to(bg, {
          opacity: currentScroll > 30 ? 1 : 0,
          duration: 0.4,
          ease: "power1.out",
        })
      } else {
        gsap.to(bg, {
          opacity: 1,
        })
      }

      // lastScroll = currentScroll <= 0 ? 0 : currentScroll
      // setLastScrollTop(lastScroll)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      ScrollTrigger.refresh()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [sectionTriggerRef.current])

  const toggleMenu = () => {
    const bg = bgRef.current
    const menu = mobileMenuRef.current

    setMenuOpen((prev) => {
      const isOpening = !prev

      // Expand/collapse background height
      gsap.to(bg, {
        opacity: 1,
        height: isOpening ? "100dvh" : "100%",
        // autoAlpha: isOpening ? 1 : 0,
        duration: 0.2,
        ease: "power2.inOut",
      })

      gsap.to(menu, {
        height: isOpening ? "100dvh" : "100%",
        y: isOpening ? 0 : -50,
        autoAlpha: isOpening ? 1 : 0,
        duration: 0.6,
        delay: isOpening ? 0.2 : 0,
        ease: "power2.out",
      })

      return isOpening
    })
  }

  return (
    <>
      <header
        lang="en"
        ref={headerRef}
        className="fixed top-0 z-40 px-4 xl:px-6 w-screen h-14 flex flex-row items-center justify-between"
      >
        <div className="flex-1 z-40">
          <div ref={logoRef} className="w-28 md:w-38 xl:w-40">
            <Link href="/">
              <Image
                src="/images/LogoBlack.png"
                alt="LogoBlack"
                width={300}
                height={150}
                priority
                unoptimized
              />
            </Link>
          </div>
        </div>
        <div className="z-40 flex-initial w-3/5 hidden md:inline">
          <NavBar ulClassName="items-center" />
        </div>
        <div className="z-40 flex-1 hidden md:inline">
          <LanguageSwitcher />
        </div>
        <div
          className="z-50 flex md:hidden text-3xl cursor-pointer"
          onClick={toggleMenu}
        >
          {menuOpen ? <IoCloseOutline /> : <CiMenuFries />}
        </div>
        <div
          ref={bgRef}
          className="w-full h-full absolute left-0 top-0 bg-[#edebeb] border-b-1 border-stone-100 inset-shadow-[0_-1px_0_0_rgba(0,0,0,0.05)] "
        />
        {/* header border designs */}
        {/* <div
        ref={bgRef}
        className="w-full h-full absolute left-0 top-0 bg-[#edebeb] border-b-1 border-stone-800"
      /> */}
        {/* <div ref={bgRef} className="w-full h-full absolute left-0 top-0 bg-linear-to-b from-[#edebeb]/96 from-80% via-[#edebeb]/85 via-85% to-transparent to-100%"/> */}
      </header>
      <div
        ref={mobileMenuRef}
        className="fixed top-14 left-0 w-full px-8 py-4 z-50 md:hidden opacity-0 "
      >
        <NavBar
          navClassName="mt-6"
          ulClassName="flex-col items-end text-lg"
          toggleMenu={toggleMenu}
          isHome={true}
        />
        <div className="mt-30">
          <LanguageSwitcher />
        </div>
      </div>
    </>
  )
}

export default Header

//TODO
// [x] entire header : scroll up - appear / scroll down - disappear (?)
// [x] header background-color : scroll start - appear
// [x] menu hover : underline with animation
// [x] mobile menu : hamburger menu (?)

//DEBUG
// [] 코드를 업데이트해서 새로 저장했을때문 ScrollTrigger가 적용됨
