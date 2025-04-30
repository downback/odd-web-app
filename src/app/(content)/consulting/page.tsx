import React, { Suspense } from "react"
import ConsultingHeader from "./_components/ConsultingHeader"
import StraightLineProcess from "./_components/StraightLineProcess"

const ConsultingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <ConsultingHeader />
      {/* margin */}
      <div className="h-25 md:h-30"></div>
      <Suspense fallback={<div className="py-16">Loading process...</div>}>
        <StraightLineProcess />
      </Suspense>
      <div className="h-55 md:h-70"></div>
    </div>
  )
}

export default ConsultingPage
