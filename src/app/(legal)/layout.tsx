"use client"

import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { Nunito_Sans, Noto_Sans_KR } from "next/font/google"
import { ContextWrapper } from "../../context/context-wrapper"
import "../globals.css"
import Footer from "@/components/common/footer/Footer"
import { MdOutlineArrowBack } from "react-icons/md"

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-nunito",
})

const noto = Noto_Sans_KR({
  subsets: ["latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-noto",
})

// export const metadata = {
//   title: "Legal | Odd Office",
//   description: "Odd Office",
// }

export default function LegalLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  return (
    <html lang="en" className={`${nunito.variable} ${noto.variable}`}>
      <body>
        <ContextWrapper>
          <main className="min-h-dvh md:min-h-screen max-w-2xl mx-auto flex justify-center px-6 pt-20 pb-28 md:pb-40">
            <div className="absolute top-0 left-0 text-xl md:text-2xl cursor-pointer p-4 md:p-8">
              <button onClick={() => router.back()} aria-label="Go Back">
                <MdOutlineArrowBack />
              </button>
            </div>
            {children}
          </main>
            <Footer />
        </ContextWrapper>
      </body>
    </html>
  )
}
