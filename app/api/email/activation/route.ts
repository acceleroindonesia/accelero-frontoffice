import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { getServerSession } from 'next-auth';
import { authOptions } from '@utils/AuthOptions';

const JWT_SECRET = process.env.JWT_SECRET!; // store securely in .env
const BASE_URL = process.env.NEXTAUTH_BACKEND_URL || 'http://localhost:8000'; // your domain

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email, name } = await req.json();

  // Create email verification token
  const token = jwt.sign({ userId: session.user.id, email }, JWT_SECRET, { expiresIn: '15m' });

  const verifyUrl = `${BASE_URL}/verify-email?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail', // or "Mailgun", "SendGrid", etc.
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"accelero.com" <${process.env.EMAIL_USER}>`,
    to: 'tiketordal.hosting@gmail.com',
    subject: 'Verify your email address',
    html: `
      <h2>Hello ${name || 'there'},</h2>
      <p>Thanks for signing up. Please verify your email by clicking the button below:</p>
      <p><a href="${verifyUrl}" style="padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px;">Verify Email</a></p>
      <p>This link will expire in 15 minutes.</p>
      <br/>
      <p>If you didn't request this, please ignore this message.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: 'Verification email sent!' });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
