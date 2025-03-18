import { ReplyForm } from "@/components/custom/reply-form";
import { PostCard } from "@/components/custom/post-card";
import { allPosts } from "content-collections";
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { title } = allPosts.find((post) => post.slug === slug)!;

  return {
    title: `Reply to ${title}`,
    metadataBase: new URL(process.env.URL || "https://eliseomartelli.it/"),
    openGraph: {
      title: `Reply to ${title}`,
    },
  };
}

export async function generateStaticParams() {
  return allPosts.map(({ slug }) => ({ slug }));
}

const ReplyPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="prose">
        <h1 className="font-serif">Replying to:</h1>
      </div>
      <PostCard {...post} />
      <hr className="mt-4" />
      <ReplyForm postName={post.title} />
      <div className="prose">
        <h2>Want to say hi?</h2>
        <p>
          There&apos;s a form for that!{" "}
          <Link href={"/contact"}>Contact me</Link>.
        </p>
      </div>
    </>
  );
};

export default ReplyPage;
