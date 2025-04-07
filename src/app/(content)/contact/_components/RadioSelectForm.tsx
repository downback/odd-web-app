"use client"

import React, { useState } from "react"

const options = [
  "Business Plan",
  "Location Selection & Lease Agreement",
  "Legal Permits & Administrative Procedures",
  "Branding",
  "Interior Design",
  "Construction & Installation",
  "Online Marketing",
  "Staff Recruitment & Training",
  "System Setup",
  "Grand Opening",
]

const RadioSelectForm: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="w-full md:w-2/5 p-6 border border-black rounded shadow-sm">
      <h2 className="text-2xl font-bold text-center text-black mb-4">
        Select your interests
      </h2>
      <form className="space-y-3">
        {options.map((option, index) => (
          <label key={index} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="interest"
              value={option}
              checked={selected === option}
              onChange={() => setSelected(option)}
              className="accent-black w-4 h-4"
            />
            <span className="text-black">{option}</span>
          </label>
        ))}
      </form>
    </div>
  )
}

export default RadioSelectForm
