"use client";

import {
  EmptyFeaturedPostCard,
  FeaturedPostCard,
  FeaturedPosts,
} from "@/components/FeaturedPosts";

import { Post } from "contentlayer/generated";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Color, getButtonClassNames } from "@/components/Button";
import { ArrowUpHighIcon } from "@/components/Icons";

export const DefaultFeaturedPosts = ({ url = "" }: { url?: string }) => {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  const API_URL = url ? `/api/posts/featured/${url}` : `/api/posts/featured`;

  useEffect(() => {
    fetch(API_URL)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FeaturedPosts error={error}>
      {posts.length > 0
        ? posts.map((post, i) => <FeaturedPostCard post={post} key={i} />)
        : // empty state
          Array(3)
            .fill(true)
            .map((_, i) => <EmptyFeaturedPostCard key={i} />)}
      <span className="basis-full h-0"></span> {/* Spacer */}
      <div className="flex flex-row items-center justify-between grow">
        {url && <p className="text-sm">Featured posts generated using AI.</p>}
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
    </FeaturedPosts>
  );
};
