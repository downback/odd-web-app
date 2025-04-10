"use client"

import React from "react"

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

interface RadioSelectFormProps {
  selected: string[]
  onToggle: (interest: string) => void
}

const RadioSelectForm: React.FC<RadioSelectFormProps> = ({
  selected,
  onToggle,
}) => {
  // const handleToggle = (option: string) => {
  //   setSelectedOptions((prev) =>
  //     prev.includes(option)
  //       ? prev.filter((item) => item !== option)
  //       : [...prev, option]
  //   )
  // }

  return (
    <div className="w-5/6 md:w-4/9 lg:w-2/5 p-6 border border-black rounded shadow-sm">
      <h2 className="text-2xl font-bold text-center text-black mb-4">
        Select your interests
      </h2>
      <form className="space-y-3">
        {options.map((option, index) => (
          <label key={index} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="interest"
              value={option}
              checked={selected.includes(option)}
              onChange={() => onToggle(option)}
              className="accent-black w-4 h-4"
            />
            <span className="text-black">{option}</span>
          </label>
        ))}
      </form>

      {/* OPTIONAL: Show selected 
       <div className="bg-stone-50 w-full h-45 h-min-45 p-6">
        <strong>Selected:</strong>

        {selectedOptions.join(", ") || "None"}
        {selectedOptions.map((option, index) => (
          <div key={index} className="text-black">
            {selectedOptions.length === 0 ? "None" : option}
          </div>
        ))}
      </div>
       */}
    </div>
  )
}

export default RadioSelectForm
