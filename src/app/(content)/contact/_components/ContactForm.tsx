"use client"

import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"

import { MdArrowOutward } from "react-icons/md"

interface ContactFormProps {
  selectedServices: string[]
  onRemoveInterest: (item: string) => void
}

const ContactForm: React.FC<ContactFormProps> = ({
  selectedServices,
  onRemoveInterest,
}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      number: Yup.string().notRequired(),
      message: Yup.string().notRequired(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch(
          "https://us-central1-odd-office.cloudfunctions.net/api",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...values,
              interests: selectedServices,
            }),
          }
        )

        if (!res.ok) throw new Error("Failed to send message")

        alert("Message sent successfully!")
        resetForm()
      } catch (error) {
        console.error(error)
        alert("Something went wrong. Please try again later.")
      }
    },
  })

  return (
    <div className="w-5/6 md:w-4/9 lg:w-2/5 p-6 border border-black rounded">
      <h2 className="text-2xl font-bold text-center text-black mb-4">
        Contact Us
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-black font-semibold mb-1">
            Name*
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="w-full px-3 py-2 border placeholder-stone-400 border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-sm text-red-600 mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-black font-semibold mb-1"
          >
            Email*
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full px-3 py-2 border placeholder-stone-400 border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Contact Detail */}
        <div>
          <label
            htmlFor="number"
            className="block text-black font-semibold mb-1"
          >
            Contact Detail
          </label>
          <input
            id="number"
            name="number"
            type="text"
            placeholder="Your phone number or KakaoTalk ID"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.number}
            className="w-full px-3 py-2 border placeholder-stone-400 border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
          />
          {formik.touched.number && formik.errors.number && (
            <p className="text-sm text-red-600 mt-1">{formik.errors.number}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-black font-semibold mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Your message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            className="w-full px-3 py-2 border placeholder-stone-400 border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Selected Interests Display (Optional) */}
        <div className="block text-black font-semibold mb-1">
          Your Selected Services
        </div>
        <div className="w-full min-h-24 px-3 py-2 border border-black rounded">
          {selectedServices.length > 0 ? (
            <ul className="">
              {selectedServices.map((interest, index) => (
                <li key={index} className="flex h-8 items-center">
                  -
                  <p className="max-w-82 overflow-hidden text-ellipsis whitespace-nowrap">
                    {interest}
                  </p>
                  <button
                    type="button"
                    onClick={() => onRemoveInterest(interest)}
                    className="ml-1 w-4 h-4 bg-stone-50 border border-black text-black rounded-full flex justify-center items-center cursor-pointer hover:bg-stone-800 hover:border-white hover:text-white"
                    aria-label={`Remove ${interest}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div
              onClick={() => window.scrollTo(0, 100)}
              className="text-stone-400 flex flex-row gap-1 height-12 items-center cursor-pointer"
            >
              Go to add the your required service
              <MdArrowOutward />
            </div>
          )}
        </div>

        <div className="text-xs text-stone-600 text-right">
          * required fields
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white font-semibold rounded hover:bg-gray-800 transition-colors"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
