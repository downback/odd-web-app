"use client"

import React from "react"

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#edebeb] z-[9999] flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default Loader
