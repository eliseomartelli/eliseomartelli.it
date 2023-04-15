import { allPosts } from "../../../.contentlayer/generated/index.mjs";
import RSS from "rss";
import { compareDesc } from "date-fns";

export async function GET() {
  const feed = new RSS({
    title: "Eliseo Martelli",
    site_url: "https://eliseomartelli.it",
    feed_url: "https://eliseomartelli.it/feed.xml",
  });

  const posts = allPosts
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    })
    .slice(0, 5); // Return latest 5 articles.

  await Promise.all(
    posts.map(async (post) => {
      feed.item({
        title: post.title,
        url: `https://eliseomartelli.it/blog/${post.url}`,
        date: post.date,
        description: post.body.code,
      });
    })
  );
  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
      "Content-Type": "text/xml",
    },
  });
}
