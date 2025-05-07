import "../globals.css"
import { ReactNode } from "react"
import Head from "next/head"

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
  weight: ["300", "400", "500"],
  variable: "--font-noto",
})

export const metadata = {
  title: "Odd Office",
  description: "We are Odd Office",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={`${nunito.variable} ${noto.variable}`}>
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

//[x] json - EN
//[x] json - KO

//[x] create email

//[x] 랜딩페이지에 grand open 하얀색 원 안에, 검정 원 깜빡거리기
//[x] 웹사이트 기본 세팅 한글로
//[ ] KO / EN 폰트 bolder
//[ ] about us 페이지 이름 한글로

//[ ] 세부페이지들 헤더 오류 수정
//[ ] 모바일에서 랜딩페이지 디자인이 너무 꽉차 보여서 애니메이션 살짝 변경
//[ ] landing page video loading earlier
//[ ] firebase api rule
//[ ] admin 페이지 로그인 기능 추가
//[ ] admin 업로드 된 아이템들 순서 수정
//[ ] projects 페이지 종이 열리는 애니메이션 더 스무스하게 변경
//[ ] info@odd-office.de 연결 안되는 버그 수정
