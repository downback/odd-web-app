"use client"

import React, { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

interface CirclePosition {
  x: number
  y: number
}

const CanvasWindingAnimationWithScrollTrigger: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Base canvas dimensions used for our design.
  const baseWidth = 800
  const baseHeight = 1250

  // Predefined circle positions in base coordinates.
  const baseCirclePositions: CirclePosition[] = [
    { x: 400, y: 50 },
    { x: 300, y: 250 },
    { x: 300, y: 600 },
    { x: 300, y: 1000 },
    { x: 300, y: 1200 },
  ]

  // The winding path defined in the base coordinate system.
  const basePath = {
    start: { x: 400, y: 50 },
    curves: [
      {
        cp1: { x: 350, y: 150 },
        cp2: { x: 150, y: 150 },
        end: { x: 300, y: 250 },
      },
      {
        cp1: { x: 800, y: 450 },
        cp2: { x: 0, y: 450 },
        end: { x: 300, y: 600 },
      },
      {
        cp1: { x: 600, y: 800 },
        cp2: { x: 100, y: 800 },
        end: { x: 300, y: 1000 },
      },
      {
        cp1: { x: 500, y: 1150 },
        cp2: { x: 200, y: 1150 },
        end: { x: 300, y: 1200 },
      },
    ],
  }

  const circleTexts: string[] = [
    "Business Plan",
    "Location Selection & Lease Agreement",
    "Legal Permits & Administrative Procedures",
    "Branding",
    "Interior Design",
  ]

  const triggeredRef = useRef<boolean[]>(
    new Array(baseCirclePositions.length).fill(false)
  )

  useGSAP(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    // Determine responsive canvas dimensions.
    const containerWidth = canvas.parentElement
      ? canvas.parentElement.clientWidth
      : window.innerWidth
    const scale = containerWidth / baseWidth
    const newWidth = containerWidth
    const newHeight = baseHeight * scale

    // Improve resolution for high-DPI devices.
    const dpr = window.devicePixelRatio || 1
    canvas.width = newWidth * dpr
    canvas.height = newHeight * dpr
    canvas.style.width = `${newWidth}px`
    canvas.style.height = `${newHeight}px`
    ctx.scale(dpr, dpr)

    const width = newWidth
    const height = newHeight

    const draw = () => {
      // Clear the canvas.
      ctx.clearRect(0, 0, width, height)

      // Draw the vertical winding line.
      //   ctx.strokeStyle = "black"
      //   ctx.lineWidth = 2
      //   ctx.beginPath()
      //   ctx.moveTo(300, 50)
      //   ctx.bezierCurveTo(350, 150, 150, 150, 300, 300)
      //   ctx.bezierCurveTo(600, 550, 0, 550, 300, 800)
      //   ctx.bezierCurveTo(400, 950, 200, 950, 300, 1200)
      //   ctx.bezierCurveTo(400, 1350, 200, 1350, 300, 1500)
      //   ctx.bezierCurveTo(400, 1350, 200, 1350, 300, 1500)
      //   ctx.stroke()

      // Draw the vertical winding path.
      ctx.strokeStyle = "black"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(basePath.start.x * scale, basePath.start.y * scale)
      basePath.curves.forEach((curve) => {
        ctx.bezierCurveTo(
          curve.cp1.x * scale,
          curve.cp1.y * scale,
          curve.cp2.x * scale,
          curve.cp2.y * scale,
          curve.end.x * scale,
          curve.end.y * scale
        )
      })
      ctx.stroke()

      // Get the canvas's position relative to the viewport.
      const rect = canvas.getBoundingClientRect()
      const viewportCenterY = window.innerHeight / 2

      // Draw each circle.
      baseCirclePositions.forEach((pos, index) => {
        // Compute the circle's absolute y-position in the viewport.
        const absoluteY = pos.y * scale + rect.top
        const distanceFromCenter = Math.abs(absoluteY - viewportCenterY)
        const threshold = 100 // pixels
        if (distanceFromCenter < threshold) {
          triggeredRef.current[index] = true
        }
        const progress = triggeredRef.current[index] ? 1 : 0
        const radius = 10 * progress
        if (radius > 0) {
          ctx.beginPath()
          ctx.arc(pos.x * scale, pos.y * scale, radius, 0, 2 * Math.PI)
          // Draw circle with white fill and a 1px black border.
          ctx.fillStyle = "white"
          ctx.fill()
          ctx.lineWidth = 1
          ctx.strokeStyle = "black"
          ctx.stroke()

          // Draw the corresponding text next to the circle.
          ctx.font = `${16 * scale}px sans-serif`
          ctx.fillStyle = "black"
          ctx.fillText(
            circleTexts[index],
            pos.x * scale + 15,
            pos.y * scale + 5
          )
        }
      })
    }

    // Initial draw.
    draw()

    // Create a ScrollTrigger that calls the draw function on every scroll update.
    //     ScrollTrigger.create({
    //       trigger: canvas,
    //       start: "top center",
    //       end: "bottom center",
    //       scrub: true,
    //       markers: true,
    //       toggleActions: "play none none reverse",
    //       onUpdate: draw,
    //     })
    //   }, [])

    const dummy = { progress: 0 }
    gsap.to(dummy, {
      progress: 1,
      duration: 3,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: canvas,
        start: "top center",
        end: "bottom center",
        // markers: true,
        toggleActions: "play none none reverse",
        scrub: true,
      },
      onUpdate: () => {
        draw()
      },
      onLeaveBack: () => console.log("hit going backward"),
    })
    // Optionally handle window resize.
    const handleResize = () => {
      window.location.reload() // Simple solution; you may implement a more graceful resize.
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return <canvas ref={canvasRef} style={{ width: "100%", height: "auto" }} />
}
// , backgroundColor: "lightgray"
export default CanvasWindingAnimationWithScrollTrigger
