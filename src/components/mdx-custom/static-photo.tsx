import React from "react";
import Image from "next/image";

interface PhotoProps {
  url: string;
  title: string;
}

export const StaticPhoto: React.FC<PhotoProps> = ({ url, title }) => {
  return (
    <div className="relative object-contain max-w-full max-h-full w-full h-full">
      <Image
        src={url}
        fill
        loading="lazy"
        alt={title}
        sizes="(min-width: 640px) 50vw,
              (min-width: 768px) 33vw,
              25vw"
        className="z-0! object-contain"
      />
    </div>
  );
};
