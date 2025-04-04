import Header from "@/components/common/header/Header"
import Footer from "@/components/common/footer/Footer"
import { LanguageProvider } from "../context/LanguageContext"
import { ScrollTriggerProvider } from "@/context/ScrollTriggerContext"

import "./globals.css"

import { Nunito_Sans, Noto_Sans_KR } from "next/font/google"

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-nunito",
})

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-noto",
})

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
    <html lang="en" className={`${nunito.variable} ${noto.variable}`}>
      <head />
      <body>
        <LanguageProvider>
          <ScrollTriggerProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow pt-14 xl:pt-18">{children}</main>
              <Footer />
            </div>
          </ScrollTriggerProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

// TODO MAIN
//[ ] footer hover

//[ ] projects - list inside outside ui
//[ ] projects - extra decoration

//[ ] about us - header ui
//[ ] about us - content ui

//[ ] contact - ui
//[ ] contact - nodemailer

//[ ] odd people - content ui

//[ ] json data

//[ ] landing - process - text box / click btn / page transition
//[ ] landing - video  - page pin(?)
//[ ] landing - project - simple btn
//[ ] landing - goodbye  -

//[ ] consulting - process straight line
//[ ] consulting - extra decoration

//DEBUG
//[ ] landing - process mobile
//[ ] page headers - color glitching
