import React from "react";
import { MDXContentProps } from "mdx-bundler/client/index.js";
import { MDXContent } from "@content-collections/mdx/react";
import dynamic from "next/dynamic";
import { Toot } from "./toot";
import { Timeline, TimelineItem } from "@/components/mdx-custom/timeline";
import { YouTube } from "./youtube";
import { CarouselPage } from "./photos";
import { Photo } from "./photo";
import { Product } from "./product";
import { AffiliateDisclosure } from "./affiliate-disclosure";

type Props = MDXContentProps & {
  code: string;
};

const BaseToot = dynamic(() =>
  import("@/components/mdx-custom/toot").then((mod) => mod.BaseToot),
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
        Product,
        AffiliateDisclosure,
      }}
    />
  );
};
