import { pool, sendEmail, setCors } from "../_utils.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const payload = req.body || {};
  
  if (payload.email) {
    return res.redirect(303, "/msg-sent/");
  }

  if (!payload.user_contact_email) {
    return res.redirect(303, "/msg-error/");
  }

  const emailToSubscribe = payload.user_contact_email;

  try {
    const checkRes = await pool.query('SELECT email FROM "Subscriber" WHERE email = $1', [emailToSubscribe]);
    if (checkRes.rows.length > 0) {
      return res.redirect(303, "/msg-error/");
    }

    const unsubUUID = crypto.randomUUID();
    await pool.query('INSERT INTO "Subscriber" (email, unsub) VALUES ($1, $2)', [emailToSubscribe, unsubUUID]);

    const welcomeHTML = `Hi!<br/>
Welcome to my newsletter. You can <a href="https://eliseomartelli.it/newsletter-unsub/?uuid=${unsubUUID}">unsubscribe</a> at any time. Here I will share some of the things I'm working on.
<br/>
<br/>
See you soon!<br/>
Eliseo`;

    await sendEmail({
      to: emailToSubscribe,
      subject: "Welcome to the newsletter!",
      html: welcomeHTML,
      unsubUUID,
    });

    return res.redirect(303, "/msg-sent/");
  } catch (err) {
    console.error(err);
    return res.redirect(303, "/msg-error/");
  }
}
