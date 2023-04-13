import compareDesc from "date-fns/compareDesc";
import React from "react";
import WidthLimit from "@/components/WidthLimit";
import { allPosts } from "contentlayer/generated";
import { BlogPostItem } from "@/components/BlogPostItem";

const Blog = () => {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  return (
    <WidthLimit>
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <ul className="flex flex-col gap-8 mt-8">
        {posts.map((post, i) => (
          <li key={i}>
            <BlogPostItem {...post} />
          </li>
        ))}
      </ul>
    </WidthLimit>
  );
};

export default Blog;
