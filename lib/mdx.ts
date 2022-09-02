import { serialize } from "next-mdx-remote/serialize";
import { parseDate } from "./posts";

export async function mdxToHTML(source: string) {
  const mdxSource = await serialize(source, { parseFrontmatter: true });
  mdxSource.frontmatter!.date! = parseDate(mdxSource.frontmatter!.date!);
  return {
    html: mdxSource,
  };
}
