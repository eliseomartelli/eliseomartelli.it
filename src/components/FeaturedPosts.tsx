import React, { ReactNode } from "react";
import * as t from "@/components/Typography";
import { Card } from "./Card";
import { Post } from "@/.contentlayer/generated/types";
import { dateFormatter } from "@/lib/dateFormatter";
import Link from "next/link";
import { Color, getButtonClassNames } from "./Button";
import { ArrowUpHighIcon } from "./Icons";

export function FeaturedPosts({ posts }: { posts: Post[] }) {


  return <FeaturedPostsLayout posts={posts} />;
}

export const EmptyFeaturedPosts = () => {
  return <FeaturedPostsLayout empty />;
};

export const FeaturedPostsLayout = ({
  posts,
  empty = false,
}: {
  posts?: Post[];
  empty?: boolean;
}) => {
  const cards = !empty ? (
    posts!.map((post, key) => (
      <li className="grow flex-1" key={key}>
        <Link href={post.url}>
          <FeaturedPostCard post={post} />
        </Link>
      </li>
    ))
  ) : (
    <>
      <li>
        <FeaturedPostCardEmpty />
      </li>
      <li>
        <FeaturedPostCardEmpty />
      </li>
      <li>
        <FeaturedPostCardEmpty />
      </li>
    </>
  );

  return (
    <section className="flex flex-col gap-4 w-full">
      <t.h2>Writing</t.h2>
      <p>Here are some of my thoughts you might also like.</p>
      <FeaturedPostsGrid>{cards}</FeaturedPostsGrid>
      <BottomBar />
    </section>
  );
};

const BottomBar = () => (
  <div className="flex justify-end items-center">
    <Link
      href={"/blog"}
      className={getButtonClassNames({
        small: true,
        noBold: true,
        color: Color.Transparent,
        className: "group flex items-center gap-2",
      })}
    >
      View all posts
      <ArrowUpHighIcon className="h-4 w-4 group-hover:rotate-45 transition-all" />
    </Link>
  </div>
);

const FeaturedPostsGrid = ({
  children,
}: {
  children?: ReactNode[] | ReactNode;
}) => (
  <ul className="flex md:flex-row flex-col gap-4 items-stretch">{children}</ul>
);

const FeaturedPostCard = (props: { post: Post }) => {
  const { title, date } = props.post;
  return (
    <Card className="gap-4 flex flex-col h-full">
      <h3 className="font-bold">{title}</h3>
      <p>{dateFormatter(date)}</p>
    </Card>
  );
};

const FeaturedPostCardEmpty = () => (
  <Card className="gap-4 flex flex-col h-full" hoverable={false}>
    <h3 className="font-bold">
      {"Lorem ipsum dolor sit amet, qui minim.".split(" ").map((word, key) => (
        <>
          <span
            className="bg-stone-300 animate-pulse text-transparent"
            key={key}
          >
            {word}
          </span>{" "}
        </>
      ))}
    </h3>
    <p className="bg-stone-200 animate-pulse text-transparent">May 3, 2023</p>
  </Card>
);
