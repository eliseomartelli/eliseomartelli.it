import { PostList } from "@/components/custom/post-list";
import { Button } from "@/components/ui/button";
import { allSortedPosts } from "@/lib/sortedPosts";
import { RssIcon, TagsIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <>
      <section className="flex justify-between flex-row">
        <Button variant="secondary" asChild>
          <Link href="/feed.xml">
            <>
              <span className="text-orange-500">
                <RssIcon />
              </span>
              Subscribe to RSS
            </>
          </Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/blog/tags">
            <>
              <TagsIcon />
              Explore Tags
            </>
          </Link>
        </Button>
      </section>
      <hr />
      <PostList postlist={allSortedPosts} />
    </>
  );
}
