import { allSnippets } from "@/.contentlayer/generated/index.mjs";
import { TagRow } from "@/components/BlogPostItem";
import { MDXComponent } from "@/components/MDX";
import { PageLayout } from "@/components/PageLayout";
import { Taglet } from "@/components/Taglet";
import WidthLimit from "@/components/WidthLimit";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import React from "react";

export async function generateStaticParams() {
  return allSnippets.map((post) => ({
    slug: post._raw.sourceFileName.split(".")[0],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  const snippet = allSnippets.find(
    (post) => post._raw.flattenedPath === `snippets/${params.slug}`
  );
  if (!snippet) {
    return;
  }
  const { title } = snippet;

  return {
    title: `${title} - Eliseo Martelli`,
    openGraph: {
      title,
      type: "article",
      url: `https://eliseomartelli.it/${snippet._raw.flattenedPath}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
    },
  };
}

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const snippet = allSnippets.find(
    (post) => post._raw.flattenedPath === `snippets/${params.slug}`
  );

  if (!snippet) {
    notFound();
  }

  return (
    <PageLayout
      routes={[
        { name: "Snippets", href: "/snippets" },
        { name: snippet.title, href: snippet._raw.flattenedPath },
      ]}
    >
      <WidthLimit>
        <article className="prose mx-auto">
          <p className="justify-center flex gap-2">
            {snippet.tags.map((tag) => (
              <Taglet key={tag}>{tag}</Taglet>
            ))}
          </p>
          <MDXComponent code={snippet.body.code} />
        </article>
      </WidthLimit>
    </PageLayout>
  );
};

export default PostPage;
