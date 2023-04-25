import { useMDXComponent } from "next-contentlayer/hooks";
import { Product } from "./Product";

const components = { Product };

export const MDXComponent = ({ code }: { code: string }) => {
  const MDX = useMDXComponent(code);
  return <MDX components={components} />;
};
