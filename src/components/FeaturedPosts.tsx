import { Post } from "contentlayer/generated";
import React, { ReactNode } from "react";
import { Card } from "./Card";
import Link from "next/link";
import { dateFormatter } from "@/lib/dateFormatter";
import { Balancer } from "react-wrap-balancer";

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
    <section className="flex flex-col gap-4 w-full">
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
        <h3 className="font-bold">
          <Balancer>{post.title}</Balancer>
        </h3>
        <p>{dateFormatter(post.date)}</p>
      </Card>
    </Link>
  );
};

export const EmptyFeaturedPostCard = () => (
  //Empty State
  <Card className="flex-1 flex-col flex grow text-transparent">
    <h3 className="font-bold">
      <Balancer>
        {"Lorem ipsum dolor sit amet Lorem ipsum dolor "
          .split(" ")
          .map((a, i) => (
            <>
              <span key={i} className="bg-gray-300 animate-pulse">
                {a}
              </span>{" "}
            </>
          ))}
      </Balancer>
    </h3>
    <p className="bg-gray-200 animate-pulse inline-block">
      Lorem ipsum dolor sit
    </p>
  </Card>
);
