"use client";

import { Photo } from "contentlayer/generated";
import Image from "next/image";
import { useState } from "react";

const PhotoComponent = ({ url, title, aspect }: Photo) => {
  const [loading, setLoading] = useState(true);
  return (
    <div
      className={`relative w-full ${
        aspect == "vertical" ? "aspect-vertical" : "aspect-horizontal"
      } bg-gray-400 ${
        loading && "animate-pulse"
      } rounded-md overflow-hidden mb-4`}
    >
      <Image
        src={url!}
        fill
        loading="lazy"
        alt={title!}
        sizes="
              (min-width: 640px) 50vw,
              (min-width: 768px) 33vw,
              (min-width: 1024px) 25vw,
              100vw"
        className="!relative"
        onLoad={() => {
          setLoading(false);
        }}
      />
    </div>
  );
};

export default PhotoComponent;
