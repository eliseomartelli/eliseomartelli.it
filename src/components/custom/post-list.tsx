import { Post } from "content-collections";
import React from "react";
import { PostCard } from "./post-card";
import { ScoredPost } from "@/lib/embeddings/types";

export const PostList = ({ postlist }: { postlist: (Post | ScoredPost)[] }) => {
  return (
    <ul className="space-y-4">
      {postlist.map((item) => {
        const post = "post" in item ? item.post : item;
        const score = "score" in item ? item.score : null;
        return (
          <li key={post.slug} className="group relative">
            <PostCard {...post} />
            {score !== null && (
              <span className="group-hover:block hidden absolute text-xs end-0 bg-gray-500 text-white px-2 py-1 rounded-full">
                Similarity {(score * 100).toFixed(0)}%
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};
