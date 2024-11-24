import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const emails = await request.json();

  if (!emails || !Array.isArray(emails)) {
    return NextResponse.json({ error: 'Invalid email data' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    for (const email of emails) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email.to,
        subject: email.subject,
        text: email.text,
      });
    }

    return NextResponse.json({ success: true, message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json({ error: 'Error sending emails' }, { status: 500 });
  }
}
