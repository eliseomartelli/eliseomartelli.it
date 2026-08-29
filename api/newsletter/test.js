import {
  pool,
  sendEmail,
  setCors,
  getLatestNewsletterIssue,
} from "../_utils.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();

  const authHeader = req.headers.authorization || "";
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const payload = req.body || {};
  const recipient = payload.email || process.env.SMTP_TO;

  if (!recipient) {
    return res.status(400).json({ error: "No recipient email provided" });
  }

  try {
    const dbRes = await pool.query(
      'SELECT unsub FROM "Subscriber" WHERE email = $1',
      [recipient],
    );
    const unsubUUID = dbRes.rows[0]?.unsub || "test-unsub-uuid";

    const { title, html } = await getLatestNewsletterIssue();

    await sendEmail({
      to: recipient,
      subject: `[TEST] ${title}`,
      html: html,
      unsubUUID,
    });

    return res
      .status(200)
      .json({ success: true, message: `Test newsletter sent to ${recipient}` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
