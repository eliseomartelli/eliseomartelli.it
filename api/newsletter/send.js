import { pool, sendEmail, setCors, getLatestNewsletterIssue } from "../_utils.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();

  const authHeader = req.headers.authorization || "";
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const dbRes = await pool.query('SELECT email, unsub FROM "Subscriber"');
    if (dbRes.rows.length === 0) {
      return res.status(200).json("No subscribers");
    }

    const { title, html } = await getLatestNewsletterIssue();

    for (const sub of dbRes.rows) {
      try {
        await sendEmail({
          to: sub.email,
          subject: title,
          html: html,
          unsubUUID: sub.unsub,
        });
      } catch (mailErr) {
        console.error(`Failed sending to ${sub.email}:`, mailErr);
      }
    }

    return res.status(200).json("ok");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
