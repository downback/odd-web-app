import AboutUsContent from "./_components/AboutUsContent"
import AboutUsHeader from "./_components/AboutUsHeader"

const AboutUsPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="h-25 md:h-30"></div>
      <AboutUsHeader />
      <AboutUsContent />
      <div className="h-55 md:h-70"></div>
    </div>
  )
}

export default AboutUsPage
