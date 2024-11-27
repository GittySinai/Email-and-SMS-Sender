import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const emails = await request.json();

  // Validate the incoming email data
  if (!emails || !Array.isArray(emails)) {
    return NextResponse.json({ error: 'Invalid email data' }, { status: 400 });
  }

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    pool: true, // Enable connection pooling for better efficiency
  });

  try {
    // Iterate over emails and send each one
    for (const email of emails) {
      if (!email.to || !email.subject || (!email.text && !email.html)) {
        console.error('Invalid email format:', email);
        continue; // Skip invalid email data
      }

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email.to,
        subject: email.subject,
        text: email.text,
        html: email.html, // Support for HTML content
      });
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: `${emails.length} emails sent successfully!`,
    });
  } catch (error) {
    console.error('Error sending emails:', error);

    // Handle error safely
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
