import nodemailer from "nodemailer";

export const getMailTransporter = () => {
  const {
    SMTP_USERNAME: user,
    SMTP_PASSWORD: pass,
    SMTP_HOST: host,
  } = process.env;

  return nodemailer.createTransport({
    host,
    port: 587,
    secure: false,
    auth: {
      user,
      pass,
    },
  });
};
