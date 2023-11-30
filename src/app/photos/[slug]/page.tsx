import React from "react";
import { allPhotos } from "contentlayer/generated";
import { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import { PhotoSection } from "./PhotoSection";

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  const photoGallery = allPhotos.find(
    (photo) => photo._raw.flattenedPath === `photos/${params.slug}`,
  );
  if (!photoGallery) {
    return;
  }

  const { title } = photoGallery;
  const ogImage = `https://eliseomartelli.it/api/thumbnail/${params.slug}`;

  return {
    title: `${title} - Eliseo Martelli`,
    openGraph: {
      title,
      type: "article",
      url: `https://eliseomartelli.it/${photoGallery._raw.flattenedPath}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      images: [ogImage],
    },
  };
}

const PhotoPage = ({ params }: { params: { slug: string } }) => {
  const photoGallery = allPhotos.find(
    (photo) => photo._raw.flattenedPath === `photos/${params.slug}`,
  );
  return (
    <PageLayout routes={[]}>
      <PhotoSection photoGallery={photoGallery!} />
    </PageLayout>
  );
};

export default PhotoPage;
