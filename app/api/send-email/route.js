import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import NewBookingEmail from '@/emails/NewBookingEmail';
import NewMessageEmail from '@/emails/NewMessageEmail';
import NewReviewEmail from '@/emails/NewReviewEmail'; // Added import

export async function POST(req) {
  try {
    const { type, data } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    let emailHtml;
    let subject;

    if (type === 'booking') {
      emailHtml = await render(<NewBookingEmail bookingData={data} />);
      subject = '🚀 New Booking Alert!';
    } else if (type === 'message') {
      emailHtml = await render(<NewMessageEmail messageData={data} />);
      subject = '✉️ New Message from your Website';
    } else if (type === 'review') { // Added handler for review type
      emailHtml = await render(<NewReviewEmail reviewData={data} />);
      subject = '⭐ New Review Awaiting Approval!';
    } else {
      return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
    }

    const mailOptions = {
      from: `"Mimi Family Tour" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: subject,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
