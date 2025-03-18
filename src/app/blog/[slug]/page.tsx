import { PostCard } from "@/components/custom/post-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { allPosts } from "content-collections";
import { notFound } from "next/navigation";
import { NewsletterSignup } from "@/components/custom/newsletter-signup";
import { Metadata } from "next";
import { embeddingSystem } from "@/lib/embeddings/embeddingSystem";
import { CustomMdx } from "@/components/mdx-custom/mdx";
import { PostList } from "@/components/custom/post-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MailIcon, ReplyIcon } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { title, excerpt: description } = allPosts.find(
    (post) => post.slug === slug,
  )!;

  return {
    title,
    description,
    metadataBase: new URL(process.env.URL || "https://eliseomartelli.it/"),
    openGraph: {
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  return allPosts.map(({ slug }) => ({ slug }));
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const similarPosts = embeddingSystem
    .getSimilarPosts(post.slug, 3)
    .map(({ post }) => post);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/blog/${slug}`}>
              Post from {post.formattedDate}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="text-center mt-12">
        <PostCard {...post} />
      </section>
      <hr />
      <article className="prose w-full mx-auto">
        <CustomMdx code={post.mdx} />
      </article>
      <hr />
      <section className="flex justify-end flex-row">
        <Button variant="secondary" asChild>
          <Link href={`/blog/${post.slug}/reply`}>
            <>
              <span>
                <ReplyIcon />
              </span>
              Reply
            </>
          </Link>
        </Button>
      </section>
      <hr />
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Suggested Articles</h2>
          <p>Here are some of my thoughts you might also like.</p>
        </div>
        <div>
          <PostList postlist={similarPosts} />
        </div>
      </section>
      <hr />
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Newsletter</h2>
          <p>Stay in the loop and get news about what I have my eyes on!</p>
        </div>
        <NewsletterSignup />
        <div className="mt-4">
          <Button asChild className="w-full">
            <Link
              href="/newsletter/"
              className="flex items-center justify-center gap-2"
            >
              <MailIcon className="h-4 w-4 text-primary" />
              Browse Past Issues
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
