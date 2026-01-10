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
        <>
          <i>
            Posted on:{" "}
            {post.tags.map((tag, index) => {
              const tagLink = `https://eliseomartelli.it/blog/tags/${tag.toLowerCase()}`;
              return (
                <span key={tag}>
                  <a href={tagLink}>{tag}</a>
                  {index < post.tags.length - 1 ? ", " : "."}
                </span>
              );
            })}
          </i>
          <p>Tagline: {post.excerpt}</p>
          <hr />
          <CustomMdx
            code={post.mdx}
            components={{
              FilmCalculator: (props: {
                step?: string;
                time?: string;
                temp?: number;
              }) => (
                <div>
                  <h3>{props.step}</h3>
                  <p>
                    {props.time} @ {props.temp ?? 20}°C
                  </p>
                </div>
              ),
            }}
          />
        </>,
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
