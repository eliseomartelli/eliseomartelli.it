import React from "react";
import { MDXContentProps } from "mdx-bundler/client/index.js";
import { MDXContent } from "@content-collections/mdx/react";
import dynamic from "next/dynamic";
import { Toot } from "@/components/mdx-custom/Toot";
import { Timeline, TimelineItem } from "@/components/mdx-custom/timeline";
import { YouTube } from "./YouTube";
import { CarouselPage } from "./photos";
import { Photo } from "./Photo";

type Props = MDXContentProps & {
  code: string;
};

const BaseToot = dynamic(() =>
  import("@/components/mdx-custom/Toot").then((mod) => mod.BaseToot),
);

const BaseComponents = {
  Toot: BaseToot,
  YouTube,
};
export const CustomMdx = (props: Props) => {
  return (
    <MDXContent
      {...props}
      components={{
        ...BaseComponents,
        Toot,
        Timeline,
        TimelineItem,
        CarouselPage,
        Photo,
      }}
    />
  );
};
