import MainLayout from "@/components/layouts/MainLayout"
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
          <MainLayout>{children}</MainLayout>
        </LanguageProvider>
      </body>
    </html>
  )
}
