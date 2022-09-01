// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

interface NewsletterSubscribeRequest
  extends Partial<{
    [key: string]: string | string[];
  }> {
  email: string;
}

type NewsletterSubscribeResponse = {
  statusCode: number;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsletterSubscribeResponse>
) {
  const { email } = req.body as NewsletterSubscribeRequest;
  if (!validateEmail(email)) {
    res
      .status(400)
      .json({ statusCode: 400, error: "Please enter an e-mail address." });
    return;
  }
  const result = await fetch("https://www.getrevue.co/api/v2/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REVUE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await result.json();

  if (!result.ok) {
    res.status(500).json({ statusCode: 500, error: data.error.email[0] });
    return;
  }
  res.status(200).json({ statusCode: 200 });
  return;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
