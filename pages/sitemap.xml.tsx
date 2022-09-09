import { GetServerSidePropsContext } from "next";
import { loadPostSlugs } from "../lib/posts";

const createSitemap = (
  slugs: string[]
) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${slugs
  .map((slug) => {
    return `<url><loc>${`https://eliseomartelli.it/${slug}`}</loc></url>`;
  })
  .join("")}
</urlset>`;

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const allPosts = loadPostSlugs();
  const pages = [
    ...allPosts.map((slug) => `blog/${slug}`),
    "",
    "about",
    "blog",
    "newsletter",
  ];

  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );
  res.write(createSitemap(pages));
  res.end();

  return { props: {} };
}

export default function _() {
  return null;
}
