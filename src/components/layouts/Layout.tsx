// components/Layout.tsx
import { ReactNode } from "react"
import Header from "../common/header/Header"
import Footer from "../common/footer/Footer"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-14 xl:pt-18">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
