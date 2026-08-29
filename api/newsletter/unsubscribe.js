import { pool, setCors } from "../_utils.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const payload = req.body || {};
  if (payload.uuid) {
    try {
      await pool.query('DELETE FROM "Subscriber" WHERE unsub = $1', [
        payload.uuid,
      ]);
    } catch (err) {
      console.error(err);
    }
  }
  return res.redirect(303, "/msg-sent/");
}
