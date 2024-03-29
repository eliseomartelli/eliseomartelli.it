import { MDXComponent } from "@/components/MDX";
import { Newsletter } from "@/components/Newsletter";
import { RSSSubscribe } from "@/components/RSSSubscribe";
import WidthLimit from "@/components/WidthLimit";
import { Features, useFeatures } from "@/lib/useFeatures";
import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { FeaturedPosts } from "@/components/FeaturedPosts";
import React from "react";
import { BlogPostTitle } from "@/components/BlogPostTitle";
import { CategoryRow } from "@/components/CategoryRow";
import { PostTitle } from "@/components/PostTitle";
import { Article } from "@/components/Article";
import { PageLayout } from "@/components/PageLayout";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.url,
  }));
}

interface BlogPostParams {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: BlogPostParams;
}): Promise<Metadata | undefined> {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === `blog/${params.slug}`,
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

const PostPage = async ({ params }: { params: BlogPostParams }) => {
  const features = useFeatures();
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === `blog/${params.slug}`,
  );

  if (!post) {
    notFound();
  }

  return (
    <PageLayout>
      <Article>
        <PostTitle>
          <BlogPostTitle {...post} big />
          <CategoryRow tags={post.tags} />
        </PostTitle>
        <MDXComponent code={post.body.code} />
      </Article>
      <WidthLimit className="mt-16 gap-8 flex flex-col items-end">
        <RSSSubscribe />
        {features.includes(Features.FeaturedPosts) && <FeaturedPosts />}
        {features.includes(Features.Newsletter) && <Newsletter />}
      </WidthLimit>
    </PageLayout>
  );
};

export default PostPage;
