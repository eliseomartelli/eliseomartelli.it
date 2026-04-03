import React from "react";

interface StaticImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const StaticImage: React.FC<StaticImageProps> = ({
  src,
  alt,
  className,
}) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} />;
};
