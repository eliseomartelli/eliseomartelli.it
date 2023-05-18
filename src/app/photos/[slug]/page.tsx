import React from "react";
import { Photos, allPhotos } from "contentlayer/generated";
import PhotoComponent from "../PhotoTile";
import WidthLimit from "@/components/WidthLimit";
import { SegmentedNav } from "@/components/SegmentedNav";
import { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  const photoGallery = allPhotos.find(
    (photo) => photo._raw.flattenedPath === `photos/${params.slug}`
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
    (photo) => photo._raw.flattenedPath === `photos/${params.slug}`
  );
  return (
    <PageLayout
      routes={[
        {
          name: "Photos",
          href: "/photos",
        },
        {
          name: photoGallery!.title,
          href: `/photos/${params.slug}`,
        },
      ]}
    >
      {phSection(photoGallery!)}
    </PageLayout>
  );
};

const phSection = (photoGallery: Photos) => (
  <section>
    <div className="columns-2 md:columns-3 lg:columns-4 px-4">
      {photoGallery.photos!.map((photo, i) => (
        <PhotoComponent {...photo} key={i} />
      ))}
    </div>
  </section>
);

export default PhotoPage;
