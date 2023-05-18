import {
  FeaturedPostCard,
  FeaturedPostCardEmpty,
  FeaturedPosts,
} from "@/components/FeaturedPosts";

import Link from "next/link";

import { Color, getButtonClassNames } from "@/components/Button";
import { ArrowUpHighIcon } from "@/components/Icons";
import { Suspense } from "react";
import { featuredPosts, featuredPostsFromSlug } from "@/lib/featured";
import { Post } from "@/.contentlayer/generated";

export const DefaultFeaturedPosts = async ({ url = "" }: { url?: string }) => {
  const posts = (
    url ? await featuredPostsFromSlug(url) : await featuredPosts()
  ) as Post[];
  return (
    <Suspense
      fallback={
        <FeaturedPosts>
          {new Array(3).fill(true).map((_, i) => (
            <FeaturedPostCardEmpty key={i} />
          ))}
        </FeaturedPosts>
      }
    >
      <PostView posts={posts} url={url} />
    </Suspense>
  );
};

const PostView = ({ posts, url = "" }: { posts: Post[]; url: string }) => (
  <FeaturedPosts>
    {posts.map((post, i) => (
      <FeaturedPostCard post={post} key={i} />
    ))}
    <div className="flex flex-row items-center justify-end grow w-full">
      {url && (
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
  </FeaturedPosts>
);
