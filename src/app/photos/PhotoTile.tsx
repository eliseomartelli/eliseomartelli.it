"use client";

import { Photo } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PhotoComponent = ({ url, title, aspect, place }: Photo) => {
  const [loading, setLoading] = useState(true);
  return (
    <Link href={url!} className="break-before-column">
      <div
        className={`relative w-full ${
          aspect == "vertical" ? "aspect-vertical" : "aspect-horizontal"
        } bg-gray-400 ${
          loading && "animate-pulse"
        } rounded-md overflow-hidden z-0 mb-4`}
      >
        <Image
          src={url!}
          fill
          loading="lazy"
          alt={title!}
          sizes="
              (min-width: 640px) 50vw,
              (min-width: 768px) 33vw,
              25vw"
          className="!relative group-hover:brightness-50 z-0"
          onLoad={() => {
            setLoading(false);
          }}
        />
      </div>
    </Link>
  );
};

export default PhotoComponent;
