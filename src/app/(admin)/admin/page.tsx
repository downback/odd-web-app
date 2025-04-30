"use client"

import React from "react"
import AdminEditor from "./_component/AdminEditor"
import AdminBoard from "./_component/AdminBoard"

const AdminPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 space-y-10">
      <h1 className="text-3xl font-bold">Upload and Manage Updates Here</h1>
      <AdminEditor />
      <AdminBoard />
    </div>
  )
}

export default AdminPage
