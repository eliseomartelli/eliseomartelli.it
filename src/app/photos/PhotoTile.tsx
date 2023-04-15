"use client";

import { Photo } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PhotoComponent = ({ url, title, aspect }: Photo) => {
  const [loading, setLoading] = useState(true);
  return (
    <div
      className={`relative w-full ${
        aspect == "vertical" ? "aspect-vertical" : "aspect-horizontal"
      } bg-gray-400 ${
        loading && "animate-pulse"
      } rounded-md overflow-hidden z-0 mb-4`}
    >
      <Link href={url!}>
        <Image
          src={url!}
          fill
          loading="lazy"
          alt={title!}
          sizes="
              (min-width: 640px) 50vw,
              (min-width: 768px) 33vw,
              25vw"
          className="!relative "
          onLoad={() => {
            setLoading(false);
          }}
        />
      </Link>
    </div>
  );
};

export default PhotoComponent;
