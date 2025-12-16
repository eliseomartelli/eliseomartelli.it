import { PostList } from "@/components/custom/post-list";
import { Button } from "@/components/ui/button";
import { allSortedPosts } from "@/lib/sortedPosts";
import { RssIcon, TagsIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

const POSTS_PER_PAGE = 10;

export const metadata: Metadata = {
  title: "Blog",
};

export async function generateStaticParams() {
  const totalPages = Math.ceil(allSortedPosts.length / POSTS_PER_PAGE);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ page: string | string[] | undefined }>;
}) {
  const pageParam = (await params).page as string;
  const page = parseInt(pageParam ?? "1", 10);
  const currentPage = isNaN(page) || page < 1 ? 1 : page;
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = allSortedPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allSortedPosts.length / POSTS_PER_PAGE);

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
      <PostList postlist={paginatedPosts} />
      <div className="flex justify-between items-center mt-8">
        {currentPage > 1 ? (
          <Button variant="outline" asChild>
            <Link href={`/blog/page/${currentPage - 1}`}>Previous</Link>
          </Button>
        ) : (
          <div className="w-24" />
        )}
        <span>
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages ? (
          <Button variant="outline" asChild>
            <Link href={`/blog/page/${currentPage + 1}`}>Next</Link>
          </Button>
        ) : (
          <div className="w-24" />
        )}
      </div>
    </>
  );
}
