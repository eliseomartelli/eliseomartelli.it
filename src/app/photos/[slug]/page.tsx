import React from "react";
import { Photos, allPhotos } from "contentlayer/generated";
import PhotoComponent from "../PhotoTile";
import WidthLimit from "@/components/WidthLimit";
import Link from "next/link";

const PhotoPage = ({ params }: { params: { slug: string } }) => {
  const photoGallery = allPhotos.find(
    (photo) => photo._raw.flattenedPath === `photos/${params.slug}`
  );
  return (
    <div>
      <WidthLimit>
        <h1 className="text-4xl font-bold mb-4">
          <Link className="opacity-50" href={"/photos"}>
            Photos/
          </Link>
          {photoGallery?.title}
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
