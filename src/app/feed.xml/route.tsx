import RSS from "rss";
import { allSortedPosts } from "@/lib/data/allSortedPosts";
import { getMDXComponent } from "next-contentlayer/hooks";

export async function GET() {
  const feed = new RSS({
    title: "Eliseo Martelli",
    site_url: "https://eliseomartelli.it",
    feed_url: "https://eliseomartelli.it/feed.xml",
  });

  const posts = allSortedPosts.slice(0, 5); // Return latest 5 articles.

  const ReactDOMServer = (await import("react-dom/server")).default;

  posts.map((post) => {
    const Mdx = getMDXComponent(post.body.code);
    feed.item({
      title: post.title,
      url: `https://eliseomartelli.it/${post.url}`,
      date: post.date,
      description: ReactDOMServer.renderToStaticMarkup(<Mdx />),
      categories: post.tags,
    });
  });
  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
      "Content-Type": "text/xml",
    },
  });
}
