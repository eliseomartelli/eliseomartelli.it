import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { parseDate } from "./posts";

export async function mdxToHTML(source: string) {
  const mdxSource = await serialize(source, {
    parseFrontmatter: true,
    mdxOptions: { remarkPlugins: [remarkGfm] },
  });
  mdxSource.frontmatter!.date! = parseDate(
    mdxSource.frontmatter!.date! as string
  );
  return {
    html: mdxSource,
  };
}
