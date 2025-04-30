"use client"

import React from "react"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-[#edebeb] p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-black text-white rounded hover:bg-stone-800 transition"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default ConfirmationModal
