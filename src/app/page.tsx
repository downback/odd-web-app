import React from "react"
import ProcessSection from "./(content)/landing/_components/ProcessSection"
import DrawingSection from "./(content)/landing/_components/DrawingSection"
import VideoSection from "./(content)/landing/_components/VideoSection"

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <DrawingSection />
      <div className="w-full">
        <ProcessSection />
      </div>
      <div className="w-full">
        <VideoSection />
      </div>
    </div>
  )
}

export default HomePage

//TODO
//[x] mobile menu not working
//[x] implementing "No headache" animation
//[ ] Process section text component improvement
//[ ] Process animation morphing improvement
//[ ] Process section -> Consulting page transition
//[ ] implementing Lading page video and projects section
//[ ] Footer mobile design
//[ ] projects section 2 versions

//[ ] mail address connect & functions

//[x] Header 없어지는 것 대신, height 줄어드는 효과로 변경/ mobile에서도 똑같이 적용
