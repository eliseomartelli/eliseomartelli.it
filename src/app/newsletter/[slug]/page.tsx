import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { allNewsletters } from "content-collections";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = allNewsletters.find((post) => post.slug === slug)!;

  if (!post) {
    notFound();
  }

  const { title } = post;

  return {
    title,
    metadataBase: new URL(process.env.URL || "https://eliseomartelli.it/"),
    openGraph: {
      title,
    },
  };
}

export async function generateStaticParams() {
  return allNewsletters.map(({ slug }) => ({ slug }));
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = allNewsletters.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/newsletter">Newsletter</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/newsletter/${slug}`}>{slug}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <hr />
      <article
        className="prose w-full mx-auto"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </>
  );
}
