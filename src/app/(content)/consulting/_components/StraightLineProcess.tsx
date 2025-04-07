"use client"

import React, { useRef, useEffect, useState, useContext } from "react"
import { useSearchParams } from "next/navigation"
import { LanguageContext } from "../../../../context/LanguageContext"
import ProcessDetailBox from "../../landing/_components/ProcessDetailBox"

interface CircleData {
  x: number
  y: number
}

const PATH_D_END = `M70,1000 L70,0`
const BASE_PATH_WIDTH = 377.35
const BASE_PATH_HEIGHT = 1000

const StraightLineProcess: React.FC = () => {
  const { translations } = useContext(LanguageContext)
  const stepDetails = translations?.landingPage.processSteps || []

  const [circleCoords, setCircleCoords] = useState<CircleData[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<HTMLDivElement[]>([])

  const getResponsiveWidth = () => {
    const raw = containerRef.current?.offsetWidth || window.innerWidth
    return raw < 768 ? (7 / 8) * raw : (4 / 5) * raw
  }

  const lineWidth = () => (window.innerWidth < 768 ? 0.7 : 0.5)

  useEffect(() => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("viewBox", "0 0 377.35 1000")
    svg.style.position = "fixed"
    svg.style.overflow = "hidden"

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttribute("d", PATH_D_END)
    svg.appendChild(path)
    document.body.appendChild(svg)

    const totalLength = path.getTotalLength()
    const count = stepDetails.length
    const startOffset = totalLength * 0.02
    const endOffset = totalLength * 0.98
    const spacing = (endOffset - startOffset) / (count - 1)

    const points: CircleData[] = []
    for (let i = 0; i < count; i++) {
      const distance = startOffset + i * spacing
      const pt = path.getPointAtLength(distance)
      points.push({ x: pt.x, y: pt.y })
    }

    setCircleCoords(points)
    return () => svg.remove()
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

  useEffect(() => {
    drawPath(PATH_D_END)
  }, [circleCoords])

  // --- Section Scroll ---
  const searchParams = useSearchParams()
  const sectionIndex = parseInt(searchParams.get("section") || "11", 10)

  useEffect(() => {
    const scrollToSection = () => {
      const section = sectionRefs.current[sectionIndex]
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }

    // Wait one frame or delay slightly to ensure refs are rendered
    requestAnimationFrame(() => {
      setTimeout(scrollToSection, 100)
    })
  }, [sectionIndex, circleCoords])

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

          return (
            <div
              key={`circle-${i}`}
              ref={(el) => {
                if (el) sectionRefs.current[i] = el
              }}
              className="absolute w-5 h-5"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-5 h-5 bg-white border border-black rounded-full" />
              {step && (
                <ProcessDetailBox
                  title={step.title}
                  description={step.description}
                  className="left-[90px] top-[-16px]"
                  forceFixedPosition={true}
                  isDetailPage={true}
                  clickLink={() => {}}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StraightLineProcess
