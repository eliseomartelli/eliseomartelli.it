import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const webfinger = {
    subject: "acct:eliseomartelli@mastodon.social",
    aliases: [
      "https://mastodon.social/@eliseomartelli",
      "https://mastodon.social/users/eliseomartelli",
    ],
    links: [
      {
        rel: "http://webfinger.net/rel/profile-page",
        type: "text/html",
        href: "https://mastodon.social/@eliseomartelli",
      },
      {
        rel: "self",
        type: "application/activity+json",
        href: "https://mastodon.social/users/eliseomartelli",
      },
      {
        rel: "http://ostatus.org/schema/1.0/subscribe",
        template: "https://mastodon.social/authorize_interaction?uri={uri}",
      },
    ],
  };
  return NextResponse.json(webfinger);
}
