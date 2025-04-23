import Footer from "@/components/common/footer/Footer"

export const metadata = {
  title: "Legal | Odd Office",
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen p-4">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
