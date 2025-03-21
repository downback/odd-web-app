// src/components/AnimatedMotionDrawing.tsx
"use client"

import React, { useRef } from "react"
import gsap from "gsap"

import { MdKeyboardDoubleArrowDown } from "react-icons/md"

import { useGSAP } from "@gsap/react" // <-- import the hook from our React package

gsap.registerPlugin(useGSAP)

const AnimatedMotionDrawing: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (pathRef.current) {
      // Get the total length of the path
      const pathLength = pathRef.current.getTotalLength()

      // Set the initial dasharray and dashoffset to the path's length
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      })

      gsap.set(textRef.current, { opacity: 0 })

      gsap.set(arrowRef.current, { opacity: 0 })

      // Create a GSAP timeline.
      const tl = gsap.timeline()

      // Animate the path drawing.
      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power1.inOut",
      })
        .to(
          textRef.current,
          {
            opacity: 1,
            duration: 1,
            ease: "power1.inOut",
          },
          "-=0.5"
        )
        .to(pathRef.current, {
          opacity: 0.4,
          ease: "power1.inOut",
        })
        .add("startGroup")
        .to(
          arrowRef.current,
          {
            opacity: 1,
            ease: "power1.inOut",
          },
          "startGroup"
        )
        .to(
          arrowRef.current,
          {
            y: -20,
            duration: 0.5,
            ease: "power1.out",
            yoyo: true,
            repeat: -1,
          },
          "startGroup"
        )
    }
  }, [])

  return (
    <div>
      <div className="absolute w-full flex flex-col justify-center items-center ">
        <svg
          width="100%"
          height="800"
          viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* This is a randomly entangled messy path that spans a larger area */}
          <path
            ref={pathRef}
            d="
            M50,100 
            C100,20,200,80,250,150 
            S350,220,400,180 
            C450,140,550,200,600,150 
            S700,80,750,120 
            C770,160,650,240,600,220 
            S450,300,400,260 
            C350,220,250,300,200,260 
            S100,220,250,50 
            C300,200,350,350,500,400 
            S600,450,550,500 
            C500,550,450,580,400,600 
            S350,550,300,580 
            C250,610,200,640,150,700 
            S100,560,50,580
            C0,650,300,700,400,730 
            S400,750,400,800
          "
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <div ref={arrowRef}>
          <MdKeyboardDoubleArrowDown className="text-4xl" />
        </div>
      </div>
      <div
        ref={textRef}
        className="absolute font-bold text-7xl w-full h-full flex flex-col justify-center items-center"
      >
        <p>MAKE YOUR</p>
        <p>JOURNEY EASIER</p>
        <p>WITH US</p>
      </div>
    </div>
  )
}

export default AnimatedMotionDrawing
