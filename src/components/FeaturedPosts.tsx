import React, { ReactNode, use } from "react";
import * as t from "@/components/Typography";
import { Card } from "./Card";
import { Post } from "@/.contentlayer/generated/types";
import { featuredPosts, featuredPostsFromSlug } from "@/lib/featured";
import { dateFormatter } from "@/lib/dateFormatter";
import Link from "next/link";
import { Color, getButtonClassNames } from "./Button";
import { ArrowUpHighIcon } from "./Icons";

export function FeaturedPosts() {
  const posts = use(featuredPosts());
  return <FeaturedPostsLayout posts={posts} />;
}

export function AIFeaturedPosts({ post }: AIFeaturedPostsProps) {
  const posts = use(featuredPostsFromSlug(post.url));
  return <FeaturedPostsLayout posts={posts} ai />;
}

export const EmptyFeaturedPosts = ({ ai = false }: { ai: boolean }) => {
  return <FeaturedPostsLayout ai={ai} empty />;
};

export interface AIFeaturedPostsProps {
  post: Post;
}

export const FeaturedPostsLayout = ({
  posts,
  ai = false,
  empty = false,
}: {
  posts?: Post[];
  ai?: boolean;
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
      <t.h2>Featured Posts</t.h2>
      <FeaturedPostsGrid>{cards}</FeaturedPostsGrid>
      <BottomBar ai={ai} />
    </section>
  );
};

const BottomBar = ({ ai }: { ai: boolean }) => (
  <div className="flex justify-end items-center">
    {ai && (
      <Link
        href={"/blog/13-05-2023-onehundredpercent-more-ai"}
        className="text-xs text-gray-500 hover:underline flex flex-row items-center gap-2 grow"
      >
        <span>ℹ️ </span>
        <div className="flex-col flex">
          <span>Featured posts generated using AI.</span>
          <span>
            AI functionalities provided by OpenAI using GPT-3.5 model.
          </span>
        </div>
      </Link>
    )}
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
            className="bg-gray-300 animate-pulse text-transparent"
            key={key}
          >
            {word}
          </span>{" "}
        </>
      ))}
    </h3>
    <p className="bg-gray-200 animate-pulse text-transparent">May 3, 2023</p>
  </Card>
);
