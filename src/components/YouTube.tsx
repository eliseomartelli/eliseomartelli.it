import React from "react";

export const YouTube = ({ id }: { id: string }) => {
  return (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${id}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="mx-auto w-full aspect-video rounded-lg overflow-hidden"
    />
  );
};
