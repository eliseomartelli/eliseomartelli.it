import { allSortedPosts } from "@/lib/sortedPosts";
import { CustomMdx } from "@/components/mdx-custom/mdx";
import RSS from "rss";

export async function GET() {
  const feed = new RSS({
    title: "Eliseo Martelli",
    site_url: "https://eliseomartelli.it",
    feed_url: "https://eliseomartelli.it/feed.xml",
  });

  const posts = allSortedPosts.slice(0, 5); // Return latest 5 articles.

  const ReactDOMServer = (await import("react-dom/server")).default;

  posts.map((post) => {
    feed.item({
      title: post.title,
      url: `https://eliseomartelli.it/blog/${post.slug}`,
      date: post.date,
      description: ReactDOMServer.renderToStaticMarkup(
        <CustomMdx code={post.mdx} />,
      ),
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
