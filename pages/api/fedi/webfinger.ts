import type { NextApiRequest, NextApiResponse } from "next";

type WebfingerType = {
  subject: string;
  links: [
    {
      rel: "self";
      type: "application/activity+json";
      href: string;
    }
  ];
};

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<WebfingerType>
) {
  const { ACTIVITYPUB_DOMAIN } = process.env;
  res.status(200).json({
    subject: `acct:site@${ACTIVITYPUB_DOMAIN}`,
    links: [
      {
        rel: "self",
        type: "application/activity+json",
        href: `https://${ACTIVITYPUB_DOMAIN}/actor`,
      },
    ],
  });
}
