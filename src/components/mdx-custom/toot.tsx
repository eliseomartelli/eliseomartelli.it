import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LinkIcon } from "lucide-react";
import { dateFormatter } from "@/lib/date-formatter";
import { Card } from "../ui/card";
import { CustomImage } from "../custom/custom-image";

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
}): Promise<React.ReactNode> {
  const response = await fetch(`https://${server}/api/v1/statuses/${id}`);
  if (!response.ok) {
    return <>Error loading Toot.</>;
  }
  const json = await response.json();
  const { content, account, url, media_attachments, created_at } = json;
  return (
    <Card className="not-prose p-4">
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
                <span className="text-stone-400"> @{account.username}</span>
              </p>
              <p>{dateFormatter(created_at)}</p>
            </div>
          </div>
        </Link>
        <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
        {(media_attachments as { url: string; description: string }[]).map(
          ({ url, description }, i) => (
            <div key={i} className="w-full aspect-video">
              <CustomImage src={url} alt={description} />
            </div>
          ),
        )}
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
