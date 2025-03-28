"use client"

import React, { useRef, useEffect, useState, useContext } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import * as flubber from "flubber"

import ProcessDetailBox from "./ProcessDetailBox"
import { LanguageContext } from "../../../../context/LanguageContext"

gsap.registerPlugin(ScrollTrigger)

interface CircleData {
  x: number
  y: number
}

const PATH_D_START = `M186.27,785.63c-1.16-44.94,66.22-104.26,51.43-117.63-12.03-10.87-85.37,27.64-105.2,11.63-60.74-49.05,174.85-85.15,152.73-135.72C260.55,487.52-6.47,493.24.43,412.88c8.39-97.66,405.39,80.68,374.96-21.5-23.22-77.98-265.76-73.4-233.32-139.93,20.63-42.31,165.53-8.85,167.03-66.88,1.48-57.29-206.57,19.9-199.5-33.23,6.44-48.36,172.43-30.54,139.71-88.61-13.86-24.6-63.06-6.38-63.06-62.73`
const PATH_D_END = `M70,785.63 L70,0`

const BASE_PATH_WIDTH = 377.35
const BASE_PATH_HEIGHT = 785.63

const AnimatedProcess: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const stepDetails = translations?.processSteps || []

  const [circleCoords, setCircleCoords] = useState<CircleData[]>([])
  const [currentPath, setCurrentPath] = useState(PATH_D_START)
  const [isStraight, setIsStraight] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const circleRefs = useRef<HTMLDivElement[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  circleRefs.current = []

  // const getResponsiveWidth = () => {
  //   const w = window.innerWidth
  //   if (w < 768) return (7 / 8) * w
  //   if (w >= 768) return (4 / 5) * w
  //   return w
  // }

  const getResponsiveWidth = () => {
    const raw = containerRef.current?.offsetWidth || window.innerWidth
    if (raw < 768) return (7 / 8) * raw
    if (raw >= 768) return (4 / 5) * raw
    return raw
  }

  const lineWidth = () => {
    const w = window.innerWidth
    if (w < 768) return 1
    if (w >= 768) return 0.5
    return w
  }

  // useEffect(() => {
  //   const handleResize = () => {
  //     window.location.reload()
  //   }
  //   window.addEventListener("resize", handleResize)
  //   return () => window.removeEventListener("resize", handleResize)
  // }, [])

  useEffect(() => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("viewBox", "0 0 377.35 785.63")
    svg.style.position = "fixed"
    svg.style.overflow = "hidden"

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttribute("d", PATH_D_START)
    svg.appendChild(path)
    document.body.appendChild(svg)

    const totalLength = path.getTotalLength()
    const count = 10
    const spacing = totalLength / (count - 1)

    const points: CircleData[] = []
    for (let i = 0; i < count; i++) {
      const pt = path.getPointAtLength(i * spacing)
      points.push({ x: pt.x, y: pt.y })
    }

    setCircleCoords(points)
    return () => {
      svg.remove()
    }
  }, [])

  const drawPath = (d: string) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const containerWidth = getResponsiveWidth()
    const scaleX = containerWidth / BASE_PATH_WIDTH
    const scaleY =
      window.innerWidth < 768
        ? (1.7 * containerWidth) / BASE_PATH_WIDTH
        : scaleX

    const dpr = window.devicePixelRatio || 1
    const newWidth = containerWidth
    const newHeight = BASE_PATH_HEIGHT * scaleY

    canvas.width = newWidth * dpr
    canvas.height = newHeight * dpr
    canvas.style.width = `${newWidth}px`
    canvas.style.height = `${newHeight}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const path2D = new Path2D(d)
    const offsetX = (newWidth - BASE_PATH_WIDTH * scaleX) / 2

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.translate(offsetX, 0)
    ctx.scale(scaleX, scaleY)
    ctx.strokeStyle = "black"
    ctx.lineWidth = lineWidth()
    ctx.stroke(path2D)
    ctx.restore()
  }

  useEffect(() => {
    const containerWidth = getResponsiveWidth()
    // console.log(containerWidth)
    drawPath(currentPath)
  }, [currentPath])

  const handleMorph = () => {
    const from = isStraight ? PATH_D_END : PATH_D_START
    const to = isStraight ? PATH_D_START : PATH_D_END
    const interpolator = flubber.interpolate(from, to, { maxSegmentLength: 2 })

    const dummy = { t: 0 }
    // const targetX = 70

    // Animate path
    gsap.to(dummy, {
      t: 1,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        const d = interpolator(dummy.t)
        setCurrentPath(d)
        drawPath(d)

        // Animate circle Xs
        // const updatedCoords = circleCoords.map((pt) => ({
        //   ...pt,
        //   x: gsap.utils.interpolate(pt.x, targetX, dummy.t),
        // }))
        // setCircleCoords(updatedCoords)
      },
      onComplete: () => {
        setIsStraight(!isStraight)

        // Snap circles to final state
        // if (!isStraight) {
        //   const snapped = circleCoords.map((pt) => ({
        //     ...pt,
        //     x: targetX,
        //   }))
        //   setCircleCoords(snapped)
        // }
      },
    })
  }

  useGSAP(() => {
    circleRefs.current.forEach((el) => {
      if (!el) return

      gsap.fromTo(
        el,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "center center",
            markers: false,
            toggleActions: "play none none reset",
          },
        }
      )
    })
  }, [circleCoords])

  return (
    <div
      ref={containerRef}
      className="w-full max-w-full overflow-x-hidden h-max my-12 flex flex-col justify-center items-center"
    >
      <div className="relative w-fit h-fit">
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            pointerEvents: "none",
          }}
        />
        <button
          onClick={handleMorph}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Morph Path
        </button>

        {circleCoords.map((pt, i) => {
          const containerWidth = getResponsiveWidth()
          const scaleX = containerWidth / BASE_PATH_WIDTH
          const scaleY =
            window.innerWidth < 768
              ? (1.7 * containerWidth) / BASE_PATH_WIDTH
              : scaleX
          const offsetX = (containerWidth - BASE_PATH_WIDTH * scaleX) / 2

          const x = pt.x * scaleX + offsetX
          const y = pt.y * scaleY
          const step = stepDetails[i]

          return (
            // <div
            //   ref={(el) => {
            //     if (el) circleRefs.current[i] = el
            //   }}
            //   key={`circle-${i}`}
            //   className="absolute w-5 h-5"
            //   style={{
            //     left: `${x}px`,
            //     top: `${y}px`,
            //     transform: "translate(-50%, -50%)",
            //   }}
            // >
            //   <div className="absolute w-5 h-5 bg-white border border-black rounded-full"></div>
            //   <ProcessDetailBox title={`Step ${i + 1}`} className="top-12" />
            // </div>
            <div
              ref={(el) => {
                if (el) circleRefs.current[i] = el
              }}
              key={`circle-${i}`}
              className="absolute w-5 h-5"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="absolute w-5 h-5 bg-white border border-black rounded-full" />
              {step && (
                <ProcessDetailBox
                  title={step.title}
                  description={step.description}
                  className={step.position}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AnimatedProcess
