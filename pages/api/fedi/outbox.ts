import { NextApiRequest, NextApiResponse } from "next";

type OutboxType = {
  "@context": string;
  id: string;
  type: string;
  first?: string;
  next?: string;
  prev?: string;
  partOf?: string;
  orderedItems?: {
    id?: string;
    type?: string;
    actor?: string;
    published?: string;
    to?: string[];
    cc?: string[];
    object?: string;
    name?: string;
    content?: string;
  }[];
};

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<OutboxType>
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
