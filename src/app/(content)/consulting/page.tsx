"use client"

import React, { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import ConsultingHeader from "./_components/ConsultingHeader"
import StraightLineProcess from "./_components/StraightLineProcess"

const ConsultingPage: React.FC = () => {
  const searchParams = useSearchParams()

  useEffect(() => {
    const sectionParam = searchParams.get("section")

    if (!sectionParam) {
      // Delay scroll to top slightly to avoid layout jank
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      })
    }
  }, [searchParams])

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <ConsultingHeader />
      <StraightLineProcess />
    </div>
  )
}

export default ConsultingPage
