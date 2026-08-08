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

  let finalHtml = html;
  if (html) {
    let footer = "";
    if (unsubUUID) {
      footer = `<hr style="border: 0; border-top: 1px solid #eee; margin: 2rem 0 1rem 0;" />
      <p style="font-size: 0.8rem; color: #666; text-align: center; margin: 0;">
        You are receiving this because you subscribed to my newsletter. 
        <a href="https://eliseomartelli.it/newsletter-unsub/?uuid=${unsubUUID}" style="color: #666; text-decoration: underline;">Unsubscribe</a>
      </p>`;
    }

    finalHtml = `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; max-width: 600px; margin: 0 auto; color: #333;">
      ${html}
      ${footer}
    </div>`;
  }

  return transporter.sendMail({
    from: mailFrom,
    to: mailTo,
    subject,
    html: finalHtml,
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

import fs from "fs/promises";
import path from "path";

export async function getLatestNewsletterIssue() {
  try {
    let xml = "";

    // Read locally during development to avoid loopback fetches
    if (process.env.NODE_ENV === "development" || !process.env.VERCEL) {
      const localPath = path.join(process.cwd(), "public", "newsletter", "feed.xml");
      xml = await fs.readFile(localPath, "utf-8");
    } else {
      const siteHost = process.env.SITE_HOST || "https://eliseomartelli.it";
      const res = await fetch(`${siteHost}/newsletter/feed.xml`);
      if (!res.ok) throw new Error(`Failed to fetch RSS: ${res.status}`);
      xml = await res.text();
    }

    // extract the first <item> ... </item> block
    const itemMatch = xml.match(/<item>([\s\S]*?)<\/item>/);
    if (!itemMatch) throw new Error("No items found in RSS feed");
    const itemContent = itemMatch[1];

    // extract title and description
    const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/);
    const descMatch = itemContent.match(/<description>([\s\S]*?)<\/description>/);

    const unescapeHtml = (str) => {
      return str
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'");
    };

    const title = titleMatch ? unescapeHtml(titleMatch[1].trim()) : "Latest Newsletter Issue";
    let bodyHtml = descMatch ? unescapeHtml(descMatch[1].trim()) : "Check out the latest issue at https://eliseomartelli.it/newsletter/";

    const html = `<h2 style="margin-top: 0; color: #111;">${title}</h2>\n${bodyHtml}`;

    return { title, html };
  } catch (err) {
    console.error("Failed to parse latest newsletter issue:", err);
    return {
      title: "Latest Newsletter Issue",
      html: `<p>Check out the latest issue of my newsletter here: <a href="https://eliseomartelli.it/newsletter/">https://eliseomartelli.it/newsletter/</a></p>`
    };
  }
}

