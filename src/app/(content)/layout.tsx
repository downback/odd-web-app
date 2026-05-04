import "../globals.css"
import { ReactNode } from "react"

import Layout from "@/components/layouts/Layout"
import { ContextWrapper } from "../../context/context-wrapper"
import { Nunito_Sans, Noto_Sans_KR } from "next/font/google"

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-nunito",
})

const noto = Noto_Sans_KR({
  subsets: ["latin-ext"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto",
})

export const metadata = {
  title: "Odd Office",
  description: "We are Odd Office",
  icons: {
    icon: "/images/logo.ico",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={`${nunito.variable} ${noto.variable}`}>
      <body>
        <ContextWrapper>
          <Layout>{children}</Layout>
        </ContextWrapper>
      </body>
    </html>
  )
}