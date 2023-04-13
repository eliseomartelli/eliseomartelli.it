"use client";

import {
  EmptyFeaturedPostCard,
  FeaturedPostCard,
  FeaturedPosts,
} from "@/components/FeaturedPosts";

import { Post } from "contentlayer/generated";
import Link from "next/link";
import { useEffect, useState } from "react";

import Button, { Color } from "@/components/Button";
import { ArrowUpHighIcon } from "@/components/Icons";

export const DefaultFeaturedPosts = () => {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetch("/api/posts/featured")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((featuredPosts) => {
        setPosts(featuredPosts);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <>
      <FeaturedPosts error={error}>
        {posts.length > 0
          ? posts.map((post, i) => <FeaturedPostCard post={post} key={i} />)
          : // empty state
            Array(3)
              .fill(true)
              .map((_, i) => <EmptyFeaturedPostCard key={i} />)}
        <span className="basis-full h-0"></span>
        <div className="flex flex-col items-end justify-end grow">
          <Link href={"/blog"} className="group">
            <Button small noBold color={Color.Transparent}>
              <span className="flex items-center gap-2">
                View all posts
                <ArrowUpHighIcon className="h-4 w-4 group-hover:rotate-45 transition-all" />
              </span>
            </Button>
          </Link>
        </div>
      </FeaturedPosts>
    </>
  );
};
