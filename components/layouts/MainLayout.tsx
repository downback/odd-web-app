import Header from "../common/Header"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      {/* <h1>header</h1> */}
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}

export default MainLayout
