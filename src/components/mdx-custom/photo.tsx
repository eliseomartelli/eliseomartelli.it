"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "./image-lightbox";

interface PhotoProps {
  url: string;
  title: string;
}

export const Photo = ({ url, title }: PhotoProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="relative object-contain max-w-full max-h-full w-full h-full cursor-zoom-in"
        onClick={() => setOpen(true)}
      >
        <Image
          src={url!}
          fill
          loading="lazy"
          alt={title}
          sizes="(min-width: 640px) 50vw,
                (min-width: 768px) 33vw,
                25vw"
          className="z-0! object-contain"
        />
      </div>
      {open && <Lightbox src={url} alt={title} onClose={() => setOpen(false)} />}
    </>
  );
};
