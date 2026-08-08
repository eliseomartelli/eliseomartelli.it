import { sendEmail, setCors } from "../_utils.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const payload = req.body || {};

  if (!payload.message) {
    return res.redirect(303, "/msg-error/");
  }

  try {
    await sendEmail({
      subject: "Received new feedback",
      text: `You received new feedback:\n\n${payload.message}`,
    });
    return res.redirect(303, "/msg-sent/");
  } catch (err) {
    console.error(err);
    return res.redirect(303, "/msg-error/");
  }
}
