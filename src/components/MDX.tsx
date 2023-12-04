import { useMDXComponent } from "next-contentlayer/hooks";
import dynamic from "next/dynamic";
import { Toot } from "./Toot";
import { IngredientsComponent } from "./Ingredients";
import PhotoComponent from "@/app/photos/PhotoTile";

const Product = dynamic(() => import("./Product").then((mod) => mod.Product));
const YouTube = dynamic(() => import("./YouTube").then((mod) => mod.YouTube));
const BaseToot = dynamic(() => import("./Toot").then((mod) => mod.BaseToot));
const AffiliateDisclosure = dynamic(() =>
  import("./AffiliateDisclosure").then((mod) => mod.AffiliateDisclosure),
);

const BaseComponents = {
  Product,
  YouTube,
  PhotoComponent,
  Toot: BaseToot,
  AffiliateDisclosure,
  IngredientsComponent,
};
const AsyncComponets = { ...BaseComponents, Toot };
export const MDXComponent = ({
  code,
  globals,
}: {
  code: string;
  globals?: Record<string, unknown> | undefined;
}) => {
  const MDX = useMDXComponent(code, globals);
  return <MDX components={AsyncComponets} />;
};
