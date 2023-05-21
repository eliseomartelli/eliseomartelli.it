import { MDXComponent } from "@/components/MDX";
import { Newsletter } from "@/components/Newsletter";
import { RSSSubscribe } from "@/components/RSSSubscribe";
import WidthLimit from "@/components/WidthLimit";
import { Features, useFeatures } from "@/lib/useFeatures";
import { allPosts, Post } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  AIFeaturedPostsProps,
  EmptyFeaturedPosts,
} from "@/components/FeaturedPosts";
import dynamic from "next/dynamic";
import React from "react";
import { BlogPostTitle } from "@/components/BlogPostTitle";
import { CategoryRow } from "@/components/CategoryRow";
import { PostTitle } from "@/components/PostTitle";

const AIFeaturedPosts = dynamic<AIFeaturedPostsProps>(
  () => import("@/components/FeaturedPosts").then((mod) => mod.AIFeaturedPosts),
  { ssr: false, loading: () => <EmptyFeaturedPosts ai /> }
);

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.url,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === `blog/${params.slug}`
  );
  if (!post) {
    return;
  }

  const { title, date: publishedTime, excerpt: description } = post;
  const ogImage = `https://eliseomartelli.it/api/og/${post.url}`;

  return {
    title: `${title} - Eliseo Martelli`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://eliseomartelli.it/${post._raw.flattenedPath}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const features = useFeatures();
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === `blog/${params.slug}`
  );

  if (!post) {
    notFound();
  }

  return (
    <>
      <article className="prose mx-auto px-4 w-full">
        <PostTitle>
          <BlogPostTitle {...post} big />
          <CategoryRow tags={post.tags} />
        </PostTitle>
        <MDXComponent code={post.body.code} />
      </article>
      <WidthLimit className="mt-16 gap-8 flex flex-col items-end">
        <RSSSubscribe />
        {features.includes(Features.FeaturedPosts) && (
          <AIFeaturedPosts post={post} />
        )}
        {features.includes(Features.Newsletter) && <Newsletter />}
      </WidthLimit>
    </>
  );
};

export default PostPage;
