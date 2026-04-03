import { allSortedPosts } from "@/lib/sortedPosts";
import { CustomMdx } from "@/components/mdx-custom/mdx";
import { StaticFilmCalculator } from "@/components/mdx-custom/static-film-calculator";
import { StaticImage } from "@/components/mdx-custom/static-image";
import { StaticPhoto } from "@/components/mdx-custom/static-photo";
import { YouTube } from "@/components/mdx-custom/youtube";
import { BaseToot } from "@/components/mdx-custom/toot";
import { Timeline, TimelineItem } from "@/components/mdx-custom/timeline";
import { BaseProduct } from "@/components/mdx-custom/product";
import { AffiliateDisclosure } from "@/components/mdx-custom/affiliate-disclosure";
import { CarouselPage, HorizontalCarousel } from "@/components/mdx-custom/photos";
import { LensSpec } from "@/components/mdx-custom/lens-spec";
import { RatingBar } from "@/components/mdx-custom/rating-bar";
import { ProsCons } from "@/components/mdx-custom/pros-cons";
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
              Photo: StaticPhoto,
              Product: BaseProduct,
              Toot: BaseToot,
              YouTube,
              FilmCalculator: StaticFilmCalculator,
              LensSpec,
              RatingBar,
              ProsCons,
              AffiliateDisclosure,
              CarouselPage,
              HorizontalCarousel,
              Timeline,
              TimelineItem,
              img: (props) => (
                <StaticImage
                  src={props.src!}
                  alt={props.alt || ""}
                  className={props.className}
                />
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
