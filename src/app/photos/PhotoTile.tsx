"use client";

import moo from "@eliseomartelli/moo/dist";
import { Photo } from "contentlayer/generated";
import Image from "next/image";
import { useState } from "react";

const PhotoComponent = ({ url, title, aspect, place }: Photo) => {
  const [loading, setLoading] = useState(true);
  return (
    <div
      className={moo(
        "relative object-contain min-w-full min-h-full group",
        ["aspect-vertical", aspect == "vertical"],
        ["aspect-horizontal", aspect == "horizontal"],
        ["animate-reveal", !loading],
      )}
    >
      {title && (
        <div className="z-10 w-full bg-white absolute bottom-0 opacity-0 group-hover:opacity-100 transition-all p-4 group-hover:h-fit h-0">
          {title}
        </div>
      )}
      <Image
        src={url!}
        fill
        loading="lazy"
        alt={title!}
        sizes="(min-width: 640px) 50vw,
              (min-width: 768px) 33vw,
              25vw"
        className="!z-0 object-contain"
        onLoad={() => {
          setLoading(false);
        }}
      />
    </div>
  );
};

export default PhotoComponent;
