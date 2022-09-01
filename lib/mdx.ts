import { serialize } from "next-mdx-remote/serialize";

export async function mdxToHTML(source: string) {
  const mdxSource = await serialize(source, { parseFrontmatter: true });
  return {
    html: mdxSource,
  };
}
