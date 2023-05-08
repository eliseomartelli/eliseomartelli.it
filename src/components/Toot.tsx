import React from "react";
import { Card } from "./Card";
import Link from "next/link";
import { LinkIcon } from "./Icons";
import { dateFormatter } from "@/lib/dateFormatter";
import Image from "next/image";

export function BaseToot({
  fallbackUrl,
}: {
  id: string;
  server: string;
  fallbackUrl: string;
}) {
  return <a href={fallbackUrl}>Mastodon link</a>;
}
export async function Toot({
  id,
  server,
}: {
  id: string;
  server: string;
  fallbackUrl: string;
}): Promise<JSX.Element> {
  const response = await fetch(`https://${server}/api/v1/statuses/${id}`);
  if (!response.ok) {
    return <>Error loading Toot.</>;
  }
  const json = await response.json();
  const { content, account, url, media_attachments, created_at } = json;
  return (
    <Card className="not-prose">
      <div className="flex flex-col gap-4">
        <Link href={account.url}>
          <div className="flex items-center gap-4">
            <Image
              width={"12"}
              height={"12"}
              alt={`${account.display_name}'s profile picture`}
              src={account.avatar_static}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p>
                <span className="font-bold">{account.display_name}</span>
                <span className="text-gray-400"> @{account.username}</span>
              </p>
              <p>{dateFormatter(created_at)}</p>
            </div>
          </div>
        </Link>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <Link href={url}>
          <div className="flex justify-between items-center">
            <div>
              {media_attachments.length > 0 && <p>Open to see media.</p>}
              <p className="text-gray-400 text-sm">From {server}</p>
            </div>
            <LinkIcon />
          </div>
        </Link>
      </div>
    </Card>
  );
}
