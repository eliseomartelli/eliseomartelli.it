import { DefaultFeaturedPosts } from "@/app/featuredPostSection";
import { BlogPostTitle, TagRow } from "@/components/BlogPostItem";
import { MDXComponent } from "@/components/MDX";
import { Newsletter } from "@/components/Newsletter";
import { RSSSubscribe } from "@/components/RSSSubscribe";
import WidthLimit from "@/components/WidthLimit";
import { Features, useFeatures } from "@/lib/useFeatures";
import moo from "@eliseomartelli/moo/dist";
import { Post, allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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

const PostPage = ({ params }: { params: { slug: string } }) => {
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
        <PostTitle post={post} />
        <MDXComponent code={post.body.code} />
      </article>
      <WidthLimit className="mt-16 gap-8 flex flex-col items-end">
        <RSSSubscribe />
        {features.includes(Features.FeaturedPosts) && (
          <DefaultFeaturedPosts url={post.url} />
        )}
        {features.includes(Features.Newsletter) && <Newsletter />}
      </WidthLimit>
    </>
  );
};

const PostTitle = ({ post }: { post: Post }) => (
  <section
    className={moo(
      "not-prose",
      "text-black",
      "text-center",
      "flex",
      "flex-col",
      "items-center",
      "align-middle",
      "mb-8"
    )}
  >
    <BlogPostTitle {...post} big />
    <TagRow tags={post.tags} />
  </section>
);

export default PostPage;
