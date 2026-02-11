import nodemailer from 'nodemailer';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fallbackClientUrl = 'https://eco-rental-bqf5.vercel.app';
const clientUrl =
  process.env.CLIENT_URL && process.env.CLIENT_URL.trim().length > 0
    ? process.env.CLIENT_URL.replace(/\/$/, '')
    : fallbackClientUrl;

export const verifyMail = async (token: string, email: string) => {
  const emailTemplateSource = fs.readFileSync(
    path.join(__dirname, 'template.hbs'),
    'utf-8',
  );

  const template = handlebars.compile(emailTemplateSource);
  const htmlToSend = template({
    token: encodeURIComponent(token),
    client_url: clientUrl,
  });

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS?.replace(/\s/g, ''), // removes spaces just in case
    },
  });

  const mailConfigurations = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Email Verification',
    html: htmlToSend,
  };

  await transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) {
      throw new Error(error.message);
    }
    console.log('Email sent successfully');
    console.log(info);
  });
};
