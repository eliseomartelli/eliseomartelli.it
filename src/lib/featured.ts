import { Post, allPosts } from "contentlayer/generated";

export const featuredPosts = async () => {
  const featuredPostsUrls = [
    "vyos-ospf-wireguard",
    "26-11-2022-cryptobros",
    "25-11-2022-cameras",
  ].map((slug) => `blog/${slug}`);

  const featuredPosts = featuredPostsUrls.map((postURL) =>
    allPosts.find((post) => post._raw.flattenedPath === postURL),
  );

  return featuredPosts.map((e) => {
    // Don't send whole post over network...
    return {
      url: e?.url,
      title: e?.title,
      date: e?.date,
    };
  }) as Post[];
};
