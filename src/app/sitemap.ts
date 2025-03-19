import { allTags } from "@/lib/tags";
import { allNewsletters, allPhotos, allPosts } from "content-collections";

export default async function sitemap() {
  const blogs = allPosts.map((post) => ({
    url: `https://eliseomartelli.it/blog/${post.slug}`,
    lastModified: post.date,
  }));

  const photos = allPhotos.map((photo) => ({
    url: `https://eliseomartelli.it/photos/${photo.slug}`,
  }));

  const tags = allTags.map((tag) => ({
    url: `https://eliseomartelli.it/blog/tags/${tag}`,
  }));

  const newsletter = allNewsletters.map((newsletter) => ({
    url: `https://eliseomartelli.it/newsletter/${newsletter.slug}`,
  }));

  const routes = [
    "/",
    "/about",
    "/blog",
    "/contact",
    "/feed.xml",
    "/feedback",
    "/newsletter",
    "/photos",
  ].map((route) => ({
    url: `https://eliseomartelli.it${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [
    ...routes,

    // Dynamic
    ...blogs,
    ...photos,
    ...tags,
    ...newsletter,
  ];
}
