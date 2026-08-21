import { sendEmail, setCors } from "../_utils.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const payload = req.body || {};

  // Regular contact / post reply submission
  if (!payload.message) {
    return res.redirect(303, "/msg-error/");
  }

  if (payload.email) {
    return res.redirect(303, "/msg-sent/");
  }

  const subject = payload.post_title
    ? `Reply to ${payload.post_title} from ${payload.name}`
    : `New message from ${payload.name}`;

  const textBody = payload.post_title
    ? `RE: ${payload.post_title}\nSender: ${payload.name} - ${payload.user_contact_email}\n\n${payload.message}`
    : `Sender: ${payload.name} - ${payload.user_contact_email}\n\n${payload.message}`;

  try {
    await sendEmail({
      subject,
      text: textBody,
      replyTo: payload.user_contact_email,
    });
    return res.redirect(303, "/msg-sent/");
  } catch (err) {
    console.error(err);
    return res.redirect(303, "/msg-error/");
  }
}
