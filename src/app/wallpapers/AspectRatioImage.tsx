"use client";

import Image, { ImageProps } from "next/image";
import React, { useState } from "react";

export const AspectRatioImage = (props: ImageProps) => {
  const [aspectRatio, setAspectRatio] = useState(2 / 3);
  return (
    <div className="relative w-full" style={{ aspectRatio: aspectRatio }}>
      <Image
        {...props}
        alt={props.alt}
        fill
        className="object-cover"
        onLoadingComplete={({ naturalWidth, naturalHeight }) => {
          setAspectRatio(naturalWidth / naturalHeight);
        }}
      />
    </div>
  );
};
