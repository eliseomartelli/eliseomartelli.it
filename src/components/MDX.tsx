import { useMDXComponent } from "next-contentlayer/hooks";

export const MDXComponent = ({ code }: { code: string }) => {
  const MDX = useMDXComponent(code);
  return <MDX />;
};
