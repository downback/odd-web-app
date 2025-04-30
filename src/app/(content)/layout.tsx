import "../globals.css"
import { ReactNode } from "react"
import Head from "next/head"

import Layout from "@/components/layouts/Layout"
import { ContextWrapper } from "../../context/context-wrapper"
import { Nunito_Sans, Noto_Sans_KR } from "next/font/google"

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-nunito",
})

const noto = Noto_Sans_KR({
  subsets: ["latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-noto",
})

export const metadata = {
  title: "Odd Office",
  description: "We are Odd Office",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${noto.variable}`}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <ContextWrapper>
          <Layout>{children}</Layout>
        </ContextWrapper>
      </body>
    </html>
  )
}

// TODO MAIN
//[ ] page top bottom margin, font size standardize
//[x] mobile menu
//[x] enhance page header performance
//[x] nav bar item order
//[ ] lang="en"

// ----LANDING----
//[x] text and arrow position
//[-] enhance line animation

// ----PROJECTS----
//[x] mobile-image section margin
//[x] mobile-description section margin
//[x] add loading animation
//[x] when the box opens, screen position should be moved

// ----CONSULTING----
//[x] scroll animation (mild)
//[x] when it navigates from the landing page, the header animation has error

// ----ABOUT US----
//[x] desktop-image position

// ----UPDATES----
//[x] responsible design margins
//[x] separate no data and loading

// ----CONTACT----
//[x] mobile-x button width
//[x] 1,2, numbering
//[x] conformation modal

// ----ADMIN----
//[x] basic ui

// ----Imprint / Privacy policy----
//[x] x button to close
//[x] font
//[x] margin

//[ ] json - EN
//[ ] json - KO

//[ ] firebase api rule
//[ ] email
