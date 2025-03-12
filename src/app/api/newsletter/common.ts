import { getMailTransporter } from "@/lib/mail-transporter";
import { NewsletterService } from "@/lib/server/NewsletterService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const transporter = getMailTransporter();
const { NEWSLETTER_FROM: from } = process.env;

export const newsletterService = new NewsletterService(
  prisma,
  transporter,
  from!,
);
