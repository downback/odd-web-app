import { Nunito_Sans, Noto_Sans_KR } from "next/font/google"
import { ContextWrapper } from "../../provider/context-wrapper"
import "../globals.css"
import Footer from "@/components/common/footer/Footer"

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

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${noto.variable}`}>
      <body>
        <ContextWrapper>
          <main className="min-h-screen">
            {children}
            <Footer />
          </main>
        </ContextWrapper>
      </body>
    </html>
  )
}
