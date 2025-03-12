import { Post } from "content-collections";
import React from "react";
import { PostCard } from "./post-card";

export const PostList = ({ postlist }: { postlist: Post[] }) => {
  return (
    <ul className="space-y-4">
      {postlist.map((post) => (
        <li key={post.slug}>
          <PostCard {...post} />
        </li>
      ))}
    </ul>
  );
};
