"use client"

import React, { useState } from "react"
import ContactForm from "./_components/ContactForm"
import RadioSelectForm from "./_components/RadioSelectForm"
import ContactHeader from "./_components/ContactHeader"

const ContactPage: React.FC = () => {
  const [selectedServices, setselectedServices] = useState<string[]>([])

  const handleToggleInterest = (interest: string) => {
    setselectedServices((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    )
  }

  const handleRemoveInterest = (interest: string) => {
    setselectedServices((prev) => prev.filter((item) => item !== interest))
  }

  return (
    <div className="w-full h-fit flex flex-col">
      <ContactHeader />
      {/* margin */}
      <div className="my-16 w-full h-fit flex flex-col lg:flex-row justify-center items-center lg:justify-evenly lg:items-start gap-10 lg:gap-0">
        <RadioSelectForm
          selected={selectedServices}
          onToggle={handleToggleInterest}
        />
        <ContactForm
          selectedServices={selectedServices}
          onRemoveInterest={handleRemoveInterest}
        />
      </div>
    </div>
  )
}

export default ContactPage
