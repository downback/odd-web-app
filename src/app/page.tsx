import React from "react"
import ProcessSection from "./(content)/landing/_components/ProcessSection"
import AnimationSection from "./(content)/landing/_components/AnimationSection"
import LandingVideoSection from "./(content)/landing/_components/LandingVideoSection"
import LandingProjectsSection from "./(content)/landing/_components/LandingProjectsSection"

const HomePage: React.FC = () => {
  return (
    <div className="container w-full h-max">
      <AnimationSection />
      <ProcessSection />
      <LandingVideoSection />
      <LandingProjectsSection />
    </div>
  )
}

export default HomePage
