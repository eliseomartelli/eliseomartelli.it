import { CustomMdx } from "@/components/mdx-custom/mdx";
import { HorizontalCarousel } from "@/components/mdx-custom/photos";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { allPhotos } from "content-collections";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { title, thumbnail } = allPhotos.find((post) => post.slug === slug)!;

  return {
    title,
    metadataBase: new URL(process.env.URL || "https://eliseomartelli.it/"),
    openGraph: {
      title,
      images: [
        `${process.env.URL || "https://eliseomartelli.it"}/${thumbnail}`,
      ],
    },
  };
}

export async function generateStaticParams() {
  return allPhotos.map(({ slug }) => ({ slug }));
}

export default async function PhotosSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const photoEntry = allPhotos.find((photo) => photo.slug === slug);

  if (!photoEntry) {
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
            <BreadcrumbLink href="/photos">Photos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/photos/${photoEntry.slug}`}>
              {photoEntry.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <HorizontalCarousel>
        <CustomMdx code={photoEntry.mdx} />
      </HorizontalCarousel>
    </>
  );
}
