import { Post } from "content-collections";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";

export const PostCard = ({
  title,
  slug,
  formattedDate,
  timeToRead,
  postTags,
  excerpt,
}: Post) => {
  return (
    <div className="hover:bg-gray-100 p-4 -m-4 rounded-md">
      <Link href={`/blog/${slug}`} passHref>
        <div>
          <h1 className="font-bold font-serif text-2xl">{title}</h1>
          <p className="opacity-75">
            {formattedDate} - <i>⏱️ {timeToRead}</i>
          </p>
          <p className="my-2">{excerpt}</p>
        </div>
      </Link>
      <div className="space-x-2">
        {postTags.map(({ tag, colorClassName }) => (
          <Badge key={tag} className={colorClassName} asChild>
            <Link href={`/blog/tags/${tag}`}>{tag}</Link>
          </Badge>
        ))}
      </div>
    </div>
  );
};
