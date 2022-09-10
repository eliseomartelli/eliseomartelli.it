import RSS from "rss";

import { GetServerSidePropsContext } from "next";
import { loadPosts } from "../lib/posts";
import path from "path";
import fs from "fs";
import { MDXRemote } from "next-mdx-remote";
import { mdxToHTML } from "../lib/mdx";
import { renderToString } from "react-dom/server";

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const feed = new RSS({
    title: "Eliseo Martelli",
    site_url: "https://eliseomartelli.it",
    feed_url: "https://eliseomartelli.it/feed.xml",
  });

  const posts = loadPosts().splice(0, 5); // Get latest 5 posts only.

  await Promise.all(
    posts.map(async (post) => {
      post.slug += ".md";
      const filePath = path.join("posts", post.slug);
      const file = fs.readFileSync(filePath, "utf-8");

      const { html } = await mdxToHTML(file);

      const content = renderToString(<MDXRemote {...html} />);

      feed.item({
        title: post.frontmatter.title,
        url: `https://eliseomartelli.it/blog/${post.slug}`,
        date: post.frontmatter.date,
        description: content,
      });
    })
  );

  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );

  res.write(feed.xml({ indent: true }));
  res.end();
  return { props: {} };
}

export default function _() {
  return null;
}
