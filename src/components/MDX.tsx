import { useMDXComponent } from "next-contentlayer/hooks";
import { Product } from "./Product";
import { YouTube } from "./YouTube";
import { BaseToot, Toot } from "./Toot";

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
