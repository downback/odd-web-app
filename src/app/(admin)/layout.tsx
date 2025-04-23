import "../globals.css"

import { ReactNode } from "react"
import { ContextWrapper } from "../../context/context-wrapper"
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
  title: "Admin | Odd Office",
  description: "Admin Dashboard",
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${noto.variable}`}>
      <body>
      <ContextWrapper>
        <div className="min-h-screen bg-gray-50 p-6">{children}</div>
      </ContextWrapper>
      </body>
    </html>
  )
}

