import { useMDXComponent } from "next-contentlayer/hooks";
import dynamic from "next/dynamic";
import { Toot } from "./Toot";

const Product = dynamic(() => import("./Product").then((mod) => mod.Product));
const YouTube = dynamic(() => import("./YouTube").then((mod) => mod.YouTube));
const BaseToot = dynamic(() => import("./Toot").then((mod) => mod.BaseToot));

const BaseComponents = { Product, YouTube, Toot: BaseToot };
const AsyncComponets = { ...BaseComponents, Toot };
export const MDXComponent = ({
  code,
  globals,
}: {
  code: string;
  globals?: Record<string, unknown> | undefined;
}) => {
  const MDX = useMDXComponent(code, globals);
  // Workaround for Toots, awaitin upstreaming of this change in TypeScript
  /* @ts-expect-error Async Server Component */
  return <MDX components={AsyncComponets} />;
};

export const FeedMDXComonent = ({
  code,
  globals,
}: {
  code: string;
  globals?: Record<string, unknown> | undefined;
}) => {
  const MDX = useMDXComponent(code, globals);
  return <MDX components={BaseComponents} />;
};
