import { allPosts } from "contentlayer/generated";
import { allTags } from "./blog/tags/allTags";

export default async function sitemap() {
  const blogs = allPosts.map((post) => ({
    url: `https://eliseomartelli.it/${post.url}`,
    lastModified: post.date,
  }));

  const photos = allPosts.map((photo) => ({
    url: `https://eliseomartelli.it/${photo.url}`,
  }));

  const tags = allTags.map((tag) => ({
    url: `https://eliseomartelli.it/blog/tags/${tag}`,
  }));

  const routes = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/feedback",
    "/photos",
    "/wallpapers",
    "/uses",
    "/ssh",
    "/feed.xml",
  ].map((route) => ({
    url: `https://eliseomartelli.it${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...photos, ...tags];
}
