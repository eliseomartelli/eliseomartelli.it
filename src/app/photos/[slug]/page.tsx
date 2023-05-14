import React from "react";
import { Photos, allPhotos } from "contentlayer/generated";
import PhotoComponent from "../PhotoTile";
import WidthLimit from "@/components/WidthLimit";
import { SegmentedNav } from "@/components/SegmentedNav";

const PhotoPage = ({ params }: { params: { slug: string } }) => {
  const photoGallery = allPhotos.find(
    (photo) => photo._raw.flattenedPath === `photos/${params.slug}`
  );
  return (
    <div>
      <WidthLimit>
        <h1 className="text-4xl font-bold mb-4">
          <SegmentedNav
            routes={[
              { href: "/photos", name: "Photos" },
              { href: `/photos/${params.slug}`, name: photoGallery?.title! },
            ]}
          />
        </h1>
      </WidthLimit>
      {phSection(photoGallery!)}
    </div>
  );
};

const phSection = (photoGallery: Photos) => (
  <section>
    <div className="columns-2 md:columns-3 lg:columns-4 p-4">
      {photoGallery.photos!.map((photo, i) => (
        <PhotoComponent {...photo} key={i} />
      ))}
    </div>
  </section>
);

export default PhotoPage;
