import React from "react"
import ContactForm from "./_components/ContactForm"
import RadioSelectForm from "./_components/RadioSelectForm"
import PageHeader from "@/components/layouts/PageHeader"

const ContactPage: React.FC = () => {
  return (
    <div className="container w-full h-fit flex flex-col">
      <PageHeader title="CONTACT" />
      <div className="container my-30 w-full h-fit flex justify-evenly">
        <RadioSelectForm />
        <ContactForm />
      </div>
    </div>
  )
}

export default ContactPage
