// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import nodemailer from "nodemailer";

interface EmailResponse {
  statusCode: number;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EmailResponse>
) {
  const { name, email, message } = req.body;

  const {
    SMTP_USERNAME: user,
    SMTP_PASSWORD: pass,
    SMTP_HOST: host,
    SMTP_FROM: from,
    SMTP_TO: to,
  } = process.env;

  const transporter = nodemailer.createTransport({
    host,
    port: 587,
    secure: false,
    auth: {
      user,
      pass,
    },
  });

  const subject = `New form submission from ${name}`;
  const text = `Submission from ${name}\n${email}\n\n${message}`;

  await transporter
    .sendMail({
      from,
      to,
      subject,
      text,
    })
    .then(() => {
      res.status(200).json({ statusCode: 200 });
    })
    .catch((err) => {
      res.status(400).json({ statusCode: 400, error: err });
    });
}
