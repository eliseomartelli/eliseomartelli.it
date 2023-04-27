import { allPosts } from "contentlayer/generated";

export default async function sitemap() {
  const blogs = allPosts.map((post) => ({
    url: `https://eliseomartelli.it/blog/${post.url}`,
    lastModified: post.date,
  }));

  const routes = [
    "",
    "/about",
    "/api",
    "/blog",
    "/contact",
    "/feedback",
    "/photos",
  ].map((route) => ({
    url: `https://eliseomartelli.it${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}