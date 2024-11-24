import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request: NextRequest) {
  const { to, message } = await request.json();
  
  // Twilio credentials from environment variables
  const accountSid = process.env.TWILIO_ACCOUNT_SID!;
  const authToken = process.env.TWILIO_AUTH_TOKEN!;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER!;
  
  const client = twilio(accountSid, authToken);
  
  try {
    const call = await client.calls.create({
      to: to, // Destination number
      from: twilioPhoneNumber, // Twilio number
      twiml: `<Response><Say>${message}</Say></Response>`, // Twilio XML for voice message
    });

    return NextResponse.json({ success: true, callSid: call.sid });
  } catch (error) {
    console.error('Error sending voice call:', error);
  
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
  
}
