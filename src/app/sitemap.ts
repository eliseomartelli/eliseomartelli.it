import { allWallpapers } from "@/lib/data/allWallpapers";
import { allTags } from "./blog/tags/allTags";
import { allRecipes, allSnippets, allPosts } from "contentlayer/generated";

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

  const recipes = allRecipes.map((recipe) => ({
    url: `https://eliseomartelli.it/${recipe._raw.flattenedPath}`,
  }));

  const snippets = allSnippets.map((snippet) => ({
    url: `https://eliseomartelli.it/${snippet._raw.flattenedPath}`,
  }));

  const wallpapers = (await allWallpapers()).map((wallpaper) => ({
    url: `https://eliseomartelli.it/wallpapers/${wallpaper.reference}`,
  }));

  const routes = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/feed.xml",
    "/feedback",
    "/photos",
    "/recipes",
    "/snippets",
    "/ssh",
    "/uses",
    "/wallpapers",
  ].map((route) => ({
    url: `https://eliseomartelli.it${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [
    ...routes,

    // Dynamic
    ...blogs,
    ...photos,
    ...recipes,
    ...snippets,
    ...tags,
    ...wallpapers,
  ];
}
