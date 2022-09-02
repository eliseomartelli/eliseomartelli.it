import RSS from "rss";

import { GetServerSidePropsContext } from "next";
import { loadPosts } from "../lib/posts";

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const feed = new RSS({
    title: "Eliseo Martelli",
    site_url: "https://eliseomartelli.it",
    feed_url: "https://eliseomartelli.it/feed.xml",
  });

  const posts = loadPosts();
  posts.forEach((post) => {
    feed.item({
      title: post.frontmatter.title,
      url: `https://eliseomartelli.it/${post.slug}`,
      date: post.frontmatter.date,
      description: post.frontmatter.excerpt,
    });
  });

  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );

  res.write(feed.xml({ indent: true }));
  res.end();

  return {
    props: {},
  };
}

export default function RSSFeed() {
  return null;
}
