import * as functions from "firebase-functions"
import * as admin from "firebase-admin";
import express from "express"
import { Request, Response, NextFunction } from "express"
import cors from "cors"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

// Load environment variables from .env (locally, not needed in production)
dotenv.config()

const app = express()

// Middleware
app.use(cors({ origin: true }))
app.use(express.json())

// POST endpoint
app.post(
  "/send",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { name, email, message, number, selectedServices } = req.body

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" })
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.GMAIL_TO,
          pass: process.env.GMAIL_PASS,
        },
      })

      await transporter.sendMail({
        to: process.env.GMAIL_TO,
        from: email,
        subject: `Odd Office Inquiry from ${name}`,
        html: `
        <h2>New Inquiry from Odd Office Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact Detail:</strong> ${number || "N/A"}</p>
        <p><strong>Selected Services:</strong> ${
          Array.isArray(selectedServices)
            ? selectedServices.join(", ")
            : selectedServices || "N/A"
        }</p>
        <p><strong>Message:</strong></p>
        <p>${message || "No message provided"}</p>
      `,
      })

      return res.status(200).json({ message: "Email sent successfully!" })
    } catch (error: any) {
      console.error("Email send failed:", error)
      return res.status(500).json({ error: "Failed to send email" })
    }
  }
)

// Export the API endpoint for Firebase
export const api = functions.https.onRequest(app)

// https://us-central1-odd-office.cloudfunctions.net/api
