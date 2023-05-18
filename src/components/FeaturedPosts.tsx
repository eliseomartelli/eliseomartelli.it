import { Post } from "contentlayer/generated";
import React, { ReactNode } from "react";
import { Card } from "./Card";
import Link from "next/link";
import { dateFormatter } from "@/lib/dateFormatter";
import { Balancer } from "react-wrap-balancer";

export const FeaturedPosts = ({
  children,
}: {
  children?: ReactNode[] | ReactNode;
}) => {
  const postGrid = (
    <div className="flex flex-col md:flex-row gap-4 w-full flex-wrap">
      {children}
    </div>
  );
  return (
    <section className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold">Featured Posts</h2>
      {postGrid}
    </section>
  );
};

export const FeaturedPostCard = ({ post }: { post: Post }) => {
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

export const FeaturedPostCardEmpty = () => (
  //Empty State
  <Card className="flex-col flex grow h-full flex-1">
    <h3 className="font-bold text-transparent">
      <Balancer>
        {"Lorem ipsum dolor sit amet Lorem ipsum dolor"
          .split(" ")
          .map((a, i) => (
            <>
              <span
                key={i}
                className="text-transparent bg-gray-300 animate-pulse"
              >
                {a}
              </span>{" "}
            </>
          ))}
      </Balancer>
    </h3>
    <p className="text-transparent bg-gray-300 animate-pulse">May 3, 2023</p>
  </Card>
);
