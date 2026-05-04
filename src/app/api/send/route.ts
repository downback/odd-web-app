import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

interface ContactRequestBody {
  name?: string
  email?: string
  number?: string
  message?: string
  selectedServices?: string[]
  interests?: string[]
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")

export async function POST(request: Request) {
  const gmailTo = process.env.GMAIL_TO
  const gmailPass = process.env.GMAIL_PASS

  if (!gmailTo || !gmailPass) {
    return NextResponse.json(
      { error: "Email server is not configured" },
      { status: 500 }
    )
  }

  const body = (await request.json()) as ContactRequestBody
  const { name, email, message, number } = body
  const selectedServices = body.selectedServices || body.interests || []

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    )
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: gmailTo,
        pass: gmailPass,
      },
    })

    const servicesText = Array.isArray(selectedServices)
      ? selectedServices.join(", ")
      : "-"

    await transporter.sendMail({
      to: [gmailTo, email],
      from: gmailTo,
      replyTo: email,
      subject: `${name}님께서 Odd Office에 문의하셨습니다.`,
      html: `
        <h2>Odd Office Contact 문의사항</h2>
        <p><strong>성함 / Name: </strong> ${escapeHtml(name)}</p>
        <p><strong>이메일 / Email: </strong> ${escapeHtml(email)}</p>
        <p><strong>연락처 / Contact Detail: </strong> ${
          number ? escapeHtml(number) : "-"
        }</p>
        <p><strong>요청 서비스 / Selected Services: </strong> ${
          servicesText ? escapeHtml(servicesText) : "-"
        }</p>
        <p><strong>Message:</strong></p>
        <p>${message ? escapeHtml(message).replace(/\n/g, "<br />") : "No message provided"}</p>
      `,
    })

    return NextResponse.json({ message: "Email sent successfully!" })
  } catch (error) {
    console.error("Email send failed:", error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
}
