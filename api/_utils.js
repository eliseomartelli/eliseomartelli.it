import nodemailer from "nodemailer";
import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: true,
  },
});

export async function sendEmail({ from, to, subject, html, text, replyTo, unsubUUID }) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USERNAME;
  const pass = process.env.SMTP_PASSWORD;
  const defaultFrom = process.env.NEWSLETTER_FROM || process.env.SMTP_FROM;
  const defaultTo = process.env.SMTP_TO;

  const mailFrom = from || defaultFrom;
  const mailTo = to || defaultTo;

  if (!host || !user || !pass || !mailFrom || !mailTo) {
    throw new Error("SMTP configuration is missing or incomplete.");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const headers = {};
  if (unsubUUID) {
    headers["List-Unsubscribe"] = `<https://eliseomartelli.it/newsletter-unsub/?uuid=${unsubUUID}>`;
  }

  return transporter.sendMail({
    from: mailFrom,
    to: mailTo,
    subject,
    html,
    text,
    replyTo,
    headers,
  });
}

export function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}
