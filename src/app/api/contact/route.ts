import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { first_name, last_name, email, phone, enquiry_type, subject, message } = await req.json()

    if (!first_name || !last_name || !email || !enquiry_type || !subject || !message) {
      return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: 'Pinnacle Newspaper <info@pinnaclenewspaper.com>',
      to: 'info@pinnaclenewspaper.com',
      replyTo: email,
      subject: `[${enquiry_type}] ${subject}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="background: #1B2D5E; padding: 20px 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0; font-size: 20px;">New Contact Form Submission</h2>
            <p style="color: #93c5fd; margin: 4px 0 0; font-size: 13px;">Pinnacle Newspaper</p>
          </div>
          
          <div style="border: 1px solid #e0e0e0; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #767676; font-size: 13px; width: 140px;">Name</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px; font-weight: 600;">${first_name} ${last_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #767676; font-size: 13px;">Email</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;">
                  <a href="mailto:${email}" style="color: #d0021b;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; color: #767676; font-size: 13px;">Phone</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px;">${phone}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 8px 0; color: #767676; font-size: 13px;">Enquiry Type</td>
                <td style="padding: 8px 0;">
                  <span style="background: #1B2D5E; color: white; padding: 2px 10px; border-radius: 20px; font-size: 12px; font-weight: 700;">${enquiry_type}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #767676; font-size: 13px;">Subject</td>
                <td style="padding: 8px 0; color: #1a1a1a; font-size: 15px; font-weight: 600;">${subject}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="color: #767676; font-size: 13px; margin: 0 0 8px;">Message</p>
              <div style="background: #f9f9f9; padding: 16px; border-radius: 6px; border-left: 3px solid #d0021b;">
                <p style="color: #1a1a1a; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>

            <p style="margin-top: 24px; font-size: 12px; color: #999; border-top: 1px solid #e0e0e0; padding-top: 16px;">
              This message was sent via the contact form at pinnaclenewspaper.com. 
              Reply directly to this email to respond to ${first_name}.
            </p>
          </div>
        </div>
      `,
    })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ ok: true })

  } catch (err) {
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}