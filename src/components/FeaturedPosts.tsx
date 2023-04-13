import { Post } from "contentlayer/generated";
import React, { ReactNode } from "react";
import { Card } from "./Card";
import Link from "next/link";
import { dateFormatter } from "@/lib/dateFormatter";

export const FeaturedPosts = ({
  children,
  error,
}: {
  children?: ReactNode[] | ReactNode;
  error?: string;
}) => {
  const postGrid = (
    <div className="flex flex-col md:flex-row gap-4 w-full flex-wrap">
      {children}
    </div>
  );
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Featured Posts</h2>
      {error ? <p>{error}</p> : postGrid}
    </section>
  );
};

export const FeaturedPostCard = ({ post }: { post?: Post }) => {
  if (!post) {
    return <EmptyFeaturedPostCard />;
  }
  return (
    <Link href={post.url} className="flex-1">
      <Card className="flex-col flex grow h-full" hoverable>
        <h3 className="font-bold">{post.title}</h3>
        <p>{dateFormatter(post.date)}</p>
      </Card>
    </Link>
  );
};

export const EmptyFeaturedPostCard = () => (
  //Empty State
  <Card className="grow">
    <span className="block h-8 w-1/3 bg-gray-500 animate-pulse mb-12" />
    <span className="block h-6 w-2/3 bg-gray-300 animate-pulse" />
  </Card>
);
