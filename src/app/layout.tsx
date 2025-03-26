import Header from "@/components/common/header/Header"
import Footer from "@/components/common/footer/Footer"
import { LanguageProvider } from "../context/LanguageContext"

import "./globals.css"

export const metadata = {
  title: "My Web App",
  description: "A description of my web app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            {/* <Header /> */}
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}

// pt-16 px-4
