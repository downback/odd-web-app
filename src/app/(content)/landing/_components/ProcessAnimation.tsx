"use client"

import React, { useRef, useEffect, useState, useContext } from "react"
import { useRouter } from "next/navigation"
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

const ProcessAnimation: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const router = useRouter()

  const stepDetails = translations?.landingPage.processSteps || []

  const [circleCoords, setCircleCoords] = useState<CircleData[]>([])
  const [currentPath, setCurrentPath] = useState(PATH_D_START)
  // const [isStraight, setIsStraight] = useState(false)
  const [isMorphing, setIsMorphing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const circleRefs = useRef<HTMLDivElement[]>([])
  const titleRefs = useRef<HTMLHeadingElement[]>([])
  const descRefs = useRef<HTMLParagraphElement[]>([])

  circleRefs.current = []
  titleRefs.current = []
  descRefs.current = []

  const getResponsiveWidth = () => {
    const raw = containerRef.current?.offsetWidth || window.innerWidth
    if (raw < 768) return (7 / 8) * raw
    if (raw >= 768) return (4 / 5) * raw
    return raw
  }

  const lineWidth = () => {
    const w = window.innerWidth
    if (w < 768) return 0.7
    if (w >= 768) return 0.5
    return w
  }

  // RESIZING
  // useEffect(() => {
  //   const handleResize = () => {
  //     window.location.reload()
  //   }
  //   window.addEventListener("resize", handleResize)
  //   return () => window.removeEventListener("resize", handleResize)
  // }, [])

  // useEffect(() => {
  //   const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  //   svg.setAttribute("viewBox", "0 0 377.35 785.63")
  //   svg.style.position = "fixed"
  //   svg.style.overflow = "hidden"

  //   const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
  //   path.setAttribute("d", PATH_D_START)
  //   svg.appendChild(path)
  //   document.body.appendChild(svg)

  //   const totalLength = path.getTotalLength()
  //   const count = 10
  //   const spacing = totalLength / (count - 1)

  //   const points: CircleData[] = []
  //   for (let i = 0; i < count; i++) {
  //     const pt = path.getPointAtLength(i * spacing)
  //     points.push({ x: pt.x, y: pt.y })
  //   }

  //   setCircleCoords(points)
  //   return () => {
  //     svg.remove()
  //   }
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
    const count = stepDetails.length
    const startOffset = totalLength * 0.02 // 5% offset at start
    const endOffset = totalLength * 0.98 // 5% offset at end
    const spacing = (endOffset - startOffset) / (count - 1)

    const points: CircleData[] = []
    for (let i = 0; i < count; i++) {
      const distance = startOffset + i * spacing
      const pt = path.getPointAtLength(distance)
      points.push({ x: pt.x, y: pt.y })
    }

    setCircleCoords(points)

    return () => {
      svg.remove()
    }
  }, [stepDetails])

  const drawPath = (d: string) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const containerWidth = getResponsiveWidth()
    const scaleX = containerWidth / BASE_PATH_WIDTH
    const scaleY =
      window.innerWidth < 768
        ? (1.9 * containerWidth) / BASE_PATH_WIDTH
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

  // Animate Morph

  useEffect(() => {
    drawPath(currentPath)
  }, [currentPath])

  const handleMorph = (index: number) => {
    // const from = isStraight ? PATH_D_END : PATH_D_START
    // const to = isStraight ? PATH_D_START : PATH_D_END
    // const interpolator = flubber.interpolate(from, to, { maxSegmentLength: 2 })

    setIsMorphing(true)

    const interpolator = flubber.interpolate(PATH_D_START, PATH_D_END, {
      maxSegmentLength: 2,
    })

    const dummy = { t: 0 }
    const targetX = 70

    // Hide all descs
    descRefs.current.forEach((el) => {
      if (el) gsap.to(el, { autoAlpha: 0, duration: 0.4 })
    })

    gsap.to(dummy, {
      t: 1,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        const d = interpolator(dummy.t)
        setCurrentPath(d)
        drawPath(d)

        // Animate circle Xs
        const updatedCoords = circleCoords.map((pt) => ({
          ...pt,
          x: gsap.utils.interpolate(pt.x, targetX, dummy.t),
        }))
        setCircleCoords(updatedCoords)
      },
      onComplete: () => {
        // Snap
        // const snapped = circleCoords.map((pt) => ({ ...pt, x: targetX }))
        // setCircleCoords(snapped)

        setTimeout(() => {
          // const reversedIndex = stepDetails.length - 1 - index
          router.push(`/consulting?section=${index}`)
        }, 800)
      },
    })
  }

  //Circle / title / desc ANIMATION

  useGSAP(() => {
    circleRefs.current.forEach((el, i) => {
      if (!el) return

      // gsap.fromTo(
      //   el,
      //   { scale: 0, opacity: 0 },
      //   {
      //     scale: 1,
      //     opacity: 1,
      //     duration: 0.6,
      //     ease: "back.out(1.7)",
      //     scrollTrigger: {
      //       trigger: el,
      //       start: "top 75%",
      //       end: "center center",
      //       toggleActions: "play none none reset",
      //     },
      //   }
      // )

      // const title = titleRefs.current[i]
      const desc = descRefs.current[i]

      // if (title) {
      //   gsap.fromTo(
      //     title,
      //     { y: 30, opacity: 0 },
      //     {
      //       y: 0,
      //       opacity: 1,
      //       duration: 0.6,
      //       delay: 0.2,
      //       ease: "power3.out",
      //       scrollTrigger: {
      //         trigger: title,
      //         start: "top 85%",
      //         toggleActions: "play none none reset",
      //       },
      //     }
      //   )
      // }

      if (desc) {
        gsap.fromTo(
          desc,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: desc,
              start: "top 75%",
              end: "center 40%",
              toggleActions: "play reverse play reverse",
              // markers: true,
            },
          }
        )
      }
    })
  }, [circleCoords])

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden max-w-full h-max flex flex-col justify-center items-center"
    >
      <div className="relative w-fit h-fit mt-6 mb-34">
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            pointerEvents: "none",
          }}
        />

        {circleCoords.map((pt, i) => {
          const containerWidth = getResponsiveWidth()
          const scaleX = containerWidth / BASE_PATH_WIDTH
          const scaleY =
            window.innerWidth < 768
              ? (1.9 * containerWidth) / BASE_PATH_WIDTH
              : scaleX
          const offsetX = (containerWidth - BASE_PATH_WIDTH * scaleX) / 2

          const x = pt.x * scaleX + offsetX
          const y = pt.y * scaleY
          const step = stepDetails[i]

          // const isMobile = window.innerWidth < 768

          return (
            <div
              key={`circle-${i}`}
              ref={(el) => {
                if (el) circleRefs.current[i] = el
              }}
              className="absolute w-5 h-5"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                ref={(el) => {
                  if (el) circleRefs.current[i] = el
                }}
                className="w-5 h-5 bg-white border border-black rounded-full"
              />
              {step && (
                // <div
                //   ref={(el) => {
                //     if (el) detailRefs.current[i] = el
                //   }}
                // >
                <ProcessDetailBox
                  title={step.title}
                  description={step.description}
                  className={step.position}
                  titleClassName={step?.titlePosition}
                  btnClassName={step?.btnPosition}
                  clickLink={() => handleMorph(i)}
                  titleRef={(el) => {
                    titleRefs.current[i] = el as HTMLHeadingElement
                  }}
                  descRef={(el) => {
                    descRefs.current[i] = el as HTMLParagraphElement
                  }}
                  forceFixedPosition={isMorphing} // 🔥 new prop
                />
                // </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProcessAnimation
