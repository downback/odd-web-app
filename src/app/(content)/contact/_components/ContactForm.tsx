import React from "react"

const ContactForm: React.FC = () => {
  return (
    <div className="w-2/5 p-6 bg-white border border-black rounded">
      <h2 className="text-2xl font-bold text-center text-black mb-4">
        Contact Us
      </h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-black font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-black font-semibold mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
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
            className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black"
          ></textarea>
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
