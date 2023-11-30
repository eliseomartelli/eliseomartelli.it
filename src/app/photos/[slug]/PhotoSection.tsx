"use client";

import { Photos } from "@/.contentlayer/generated";
import { MDXComponent } from "@/components/MDX";

export const PhotoSection = ({ photoGallery }: { photoGallery: Photos }) => {
  return (
    <div
      className="bg-white w-screen md:h-[calc(100vh-4rem)] md:overflow-x-scroll flex md:flex-row flex-col -mt-16 gap-4 p-4 snap-x snap-proximity"
      onClick={(e) => {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          e.currentTarget.requestFullscreen();
        }
      }}
    >
      <MDXComponent code={photoGallery.body.code} />
    </div>
  );
};
