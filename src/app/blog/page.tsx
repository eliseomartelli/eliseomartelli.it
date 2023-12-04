import React from "react";
import WidthLimit from "@/components/WidthLimit";
import { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import { PostList } from "@/components/PostList";
import { BlogListFooter } from "./BlogListFooter";
import { allSortedPosts } from "@/lib/data/allSortedPosts";

export const metadata: Metadata = {
  title: "Blog - Eliseo Martelli",
};

const Blog = () => {
  const posts = allSortedPosts;
  return (
    <PageLayout routes={[{ name: "Blog", href: "/blog" }]}>
      <WidthLimit>
        <PostList posts={posts} />
        <BlogListFooter />
      </WidthLimit>
    </PageLayout>
  );
};

export default Blog;
