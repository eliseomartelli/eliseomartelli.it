import type { NextApiRequest, NextApiResponse } from "next";
import { FediActor } from "../../../types/fedi/actor";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<FediActor>
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
    outbox: `https://${ACTIVITYPUB_DOMAIN}/outbox`,
    publicKey: {
      id: `https://${ACTIVITYPUB_DOMAIN}/actor#main-key`,
      owner: `https://${ACTIVITYPUB_DOMAIN}/actor`,
      publicKeyPem: ACTIVITYPUB_PUBLIC_KEY_PEM!.toString(),
    },
  });
}
