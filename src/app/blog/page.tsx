import compareDesc from "date-fns/compareDesc";
import React from "react";
import WidthLimit from "@/components/WidthLimit";
import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { Color, getButtonClassNames } from "@/components/Button";
import Link from "next/link";
import { ArrowUpHighIcon } from "@/components/Icons";
import { RSSSubscribe } from "@/components/RSSSubscribe";
import { PageLayout } from "@/components/PageLayout";
import { PostList } from "@/components/PostList";

export const metadata: Metadata = {
  title: "Blog - Eliseo Martelli",
};

const Blog = () => {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

  return (
    <PageLayout routes={[{ name: "Blog", href: "/blog" }]}>
      <WidthLimit className="flex flex-col gap-4 items-end">
        <PostList posts={posts} />
        <div className="flex justify-between items-center w-full mb-8">
          <Link
            href={"/blog/tags"}
            className={getButtonClassNames({
              small: true,
              noBold: true,
              color: Color.Transparent,
              className: "group flex items-center gap-2",
            })}
          >
            Explore tags
            <ArrowUpHighIcon className="h-4 w-4 group-hover:rotate-45 transition-all" />
          </Link>
          <RSSSubscribe />
        </div>
      </WidthLimit>
    </PageLayout>
  );
};

export default Blog;
