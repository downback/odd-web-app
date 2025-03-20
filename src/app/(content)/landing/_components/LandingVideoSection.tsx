import React from "react"
import Image from "next/image"

const LandingVideoSection: React.FC = () => {
  return (
    <div className="w-full h-fit relative" style={{ height: "300px" }}>
      <Image
        src="/images/TestImage.png"
        alt="LogoWhite"
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  )
}

export default LandingVideoSection
