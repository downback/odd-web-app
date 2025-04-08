import React, { Suspense } from "react"
import ConsultingHeader from "./_components/ConsultingHeader"
import StraightLineProcess from "./_components/StraightLineProcess"

const ConsultingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <ConsultingHeader />
      {/* Wrap the client-side component using useSearchParams in Suspense */}
      <Suspense fallback={<div className="py-16">Loading process...</div>}>
        <StraightLineProcess />
      </Suspense>
    </div>
  )
}

export default ConsultingPage
