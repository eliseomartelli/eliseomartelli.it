"use client";

import { Photos } from "@/.contentlayer/generated";
import { MDXComponent } from "@/components/MDX";

export const PhotoSection = ({ photoGallery }: { photoGallery: Photos }) => {
  return (
    <div className="flex md:flex-row flex-col h-screen overflow-x-scroll min-w-full p-4 gap-4 snap-proximity sticky top-0 -mt-20 pb-20 pt-20 photogallery">
      <MDXComponent code={photoGallery.body.code} />
    </div>
  );
};
