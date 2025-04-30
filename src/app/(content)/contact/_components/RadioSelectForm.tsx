"use client"

import React, { useContext, useState, useEffect } from "react"
import { LanguageContext } from "../../../../context/LanguageContext"

interface RadioSelectFormProps {
  selected: string[]
  onToggle: (interest: string) => void
}

const RadioSelectForm: React.FC<RadioSelectFormProps> = ({
  selected,
  onToggle,
}) => {
  const { translations } = useContext(LanguageContext)
  const contactTranslation = translations.contactPage
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900)
    }

    handleResize() // Check on mount
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="w-5/6 lg:w-2/5">
      <h2
        lang="en"
        className="text-2xl font-bold text-left text-black mb-6 md:mb-8"
      >
        {contactTranslation.radioBoxTitle}
      </h2>
      <div className="w-full p-4 lg:p-6 border border-black rounded shadow-sm">
        <form className="space-y-3">
          {contactTranslation.options.map((option, index) => (
            <label
              key={index}
              className="flex items-start gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                name="interest"
                value={option}
                checked={selected.includes(option)}
                onChange={() => onToggle(option)}
                className="translate-y-1 peer appearance-none w-4 h-4 md:w-5 md:h-5 bg-white border border-black rounded-full"
              />
              <span className="absolute w-2.5 h-2.5 md:w-3 md:h-3 translate-y-[7px] md:translate-y-2 translate-x-[3px] md:translate-x-1 bg-black rounded-full scale-0 peer-checked:scale-100 transition-transform duration-200" />
              <span className="text-black">
                {isMobile ? (
                  <>
                    {option.split("&")[0]}
                    {option.includes("&") && (
                      <>
                        <br className="block md:hidden" />
                        &nbsp;&{option.split("&")[1]}
                      </>
                    )}
                  </>
                ) : (
                  option
                )}
              </span>
            </label>
          ))}
        </form>
      </div>
    </div>
  )
}

export default RadioSelectForm
