import nodemailer from 'nodemailer';
import 'dotenv/config';

export const sendOtpMail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Password reset OTP',
    html: `<p>Your OTP for password reset is: </br><h1><b>${otp}</b></h1></br> It is valid for 10 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
