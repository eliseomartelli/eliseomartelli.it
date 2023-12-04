import { Metadata } from "next";
import { notFound } from "next/navigation";

import React from "react";
import { Newsletter, allNewsletters } from "@/.contentlayer/generated";
import { PageLayout } from "@/components/PageLayout";
import { Article } from "@/components/Article";
import { MDXComponent } from "@/components/MDX";

export async function generateStaticParams() {
  return allNewsletters.map((post) => ({
    slug: post._raw.sourceFileName,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  const post = allNewsletters.find(
    (post) => post._raw.sourceFileName === params.slug,
  );
  if (!post) {
    return;
  }

  const { title } = post;

  return {
    title: `${title} - Eliseo Martelli`,
    description: title,
    openGraph: {
      title,
      description: title,
      type: "article",
      url: `https://eliseomartelli.it/${post._raw.flattenedPath}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: title,
    },
  };
}

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const newsletter = allNewsletters.find(
    (post) => post._raw.sourceFileName === params.slug,
  ) as Newsletter;

  if (!newsletter) {
    notFound();
  }

  return (
    <PageLayout
      routes={[
        { name: "Newsletter", href: "/newsletter" },
        { name: newsletter.title, href: newsletter._raw.sourceFilePath },
      ]}
    >
      <Article>
        <span dangerouslySetInnerHTML={{ __html: newsletter.body.html }}></span>
        <p>{newsletter._id.split("/")[1].split(".")[0]}</p>
      </Article>
    </PageLayout>
  );
};

export default PostPage;
