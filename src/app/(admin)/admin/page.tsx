"use client"

import React from "react"
import AdminAuthGate from "./_component/AdminAuthGate"
import AdminEditor from "./_component/AdminEditor"
import AdminBoard from "./_component/AdminBoard"

const AdminPage: React.FC = () => {
  return (
    <AdminAuthGate>
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="mb-8 flex flex-col gap-3 border-b border-stone-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              Odd Office 관리자 페이지
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
              Updates 페이지 컨텐츠 관리
            </h1>
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <AdminEditor />
          <AdminBoard />
        </div>
      </div>
    </AdminAuthGate>
  )
}

export default AdminPage
