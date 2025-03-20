import Footer from "../common/footer/Footer"
import Header from "../common/header/Header"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-16 px-4">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
