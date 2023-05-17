import WidthLimit from "@/components/WidthLimit";
import React from "react";
import * as typography from "@/components/Typography";

const PostLoading = () => {
  const seed =
    "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis."
      .split(" ")
      .map((e, i) => (
        <span key={i} className="bg-gray-500 animate-pulse rounded-md">
          {e}
        </span>
      ));
  return (
    <WidthLimit className="flex flex-col gap-4">
      <typography.h1 className="w-10/12 bg-gray-700 animate-pulse rounded-md text-center" />
      <article className="prose mx-auto">{seed}</article>
    </WidthLimit>
  );
};

export default PostLoading;
