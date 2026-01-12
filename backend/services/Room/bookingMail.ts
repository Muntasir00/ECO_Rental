import nodemailer from 'nodemailer';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendBookingEmail = async (booking: any, room: any) => {
  const emailTemplateSource = fs.readFileSync(
    path.join(__dirname, 'booking-template.hbs'),
    'utf-8'
  );

  const template = handlebars.compile(emailTemplateSource);

  const htmlToSend = template({
    bookingId: booking._id,
    hotelName: room.name,
    roomType: room.type,
    checkIn: booking.checkIn.toDateString(),
    checkOut: booking.checkOut.toDateString(),
    totalGuest: booking.totalGuest,
    totalPrice: booking.totalPrice.toFixed(2),
    supportContact: 'mdmuntasirmamun00@gmail.com | +8801794690000',
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: booking.email,
    subject: 'Booking Confirmation – Eco Rental',
    html: htmlToSend,
  };

  await transporter.sendMail(mailOptions);
};
