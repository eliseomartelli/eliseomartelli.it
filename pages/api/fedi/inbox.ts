import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { ACTIVITYPUB_DOMAIN } = process.env;
  res.status(200).json({
    "@context": "https://www.w3.org/ns/activitystreams",
    id: `https://${ACTIVITYPUB_DOMAIN}/outbox`,
    type: "OrderedCollection",
    orderedItems: [
      {
        type: "Note",
        name: "Hello, world!",
        content: "Hello, world!",
      },
      {
        type: "Note",
        name: "Hello, world 2!",
        content: "Hello, world 2!",
      },
    ],
  });
}
