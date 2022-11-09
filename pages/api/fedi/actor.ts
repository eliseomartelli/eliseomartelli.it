import type { NextApiRequest, NextApiResponse } from "next";

type ActorType = {
  "@context": string[];
  id: string;
  type: string;
  preferredUsername: string;
  inbox: string;
  publicKey: {
    id: string;
    owner: string;
    publicKeyPem: string;
  };
};

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<ActorType>
) {
  const { ACTIVITYPUB_DOMAIN, ACTIVITYPUB_PUBLIC_KEY_PEM } = process.env;
  res.status(200).json({
    "@context": [
      "https://www.w3.org/ns/activitystreams",
      "https://w3id.org/security/v1",
    ],
    id: `https://${ACTIVITYPUB_DOMAIN}/actor`,
    type: "Person",
    preferredUsername: "site",
    inbox: `https://${ACTIVITYPUB_DOMAIN}/inbox`,
    publicKey: {
      id: `https://${ACTIVITYPUB_DOMAIN}/actor#main-key`,
      owner: `https://${ACTIVITYPUB_DOMAIN}/actor`,
      publicKeyPem: ACTIVITYPUB_PUBLIC_KEY_PEM!.toString(),
    },
  });
}
