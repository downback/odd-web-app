import "../globals.css"
import { ReactNode } from "react"

// import Header from "@/components/common/header/Header"
// import Footer from "@/components/common/footer/Footer"
import Layout from "@/components/layouts/Layout"
import { ContextWrapper } from "../../provider/context-wrapper"
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
  title: "Odd Office",
  description: "We are Odd Office",
}

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" className={`${nunito.variable} ${noto.variable}`}>
//       <body>
//         <ContextWrapper>
//           <Header />
//           <main>{children}</main>
//           <Footer />
//         </ContextWrapper>
//       </body>
//     </html>
//   )
// }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${noto.variable}`}>
      <body>
        <ContextWrapper>
          <Layout>{children}</Layout>
        </ContextWrapper>
      </body>
    </html>
  )
}

// TODO MAIN

// ----LANDING----
//[x] drawing - position up
//[x] process - start and end point design
//[ ] process - svg animation improve & page transition
//[ ] json data update
//[ ] UI/UX detail

// ----PROJECTS----
//[ ] lists - list highlight design
//[ ] item - clean up
//[ ] item - slider
//[ ] item - hover info / click and closed
//[ ] UI/UX detail

// ----CONSULTING----
//[ ] process - start and end point design
//[ ] process - info and design update
//[ ] UI/UX detail

// ----ABOUT US----
//[ ] header - test and scroll position update
//[ ] text - info and design update
//[ ] UI/UX detail

// ----UPDATES----
//[ ] UI/UX detail
//[ ] detail - info and design update
//[ ] lists - list highlight design
//[ ] firebase api

// ----CONTACT----
//[x] select - multiple select
//[x] form - validation
//[x] form - nodemailer

// ----ADMIN----
//[ ] ui
//[ ] fire store
//[ ] fire storage

//DEBUG
//[ ] page headers - color glitching

//SCHEDULE
// TUE -
// WED
// THU
// FRI
