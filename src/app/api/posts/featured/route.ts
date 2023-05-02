import { NextResponse } from "next/server";
import { allPosts } from "contentlayer/generated";

export async function GET(): Promise<NextResponse> {
  const featuredPostsUrls = [
    "vyos-ospf-wireguard",
    "26-11-2022-cryptobros",
    "25-11-2022-cameras",
  ].map((slug) => `blog/${slug}`);

  const featuredPosts = featuredPostsUrls.map((postURL) =>
    allPosts.find((post) => post._raw.flattenedPath === postURL)
  );

  return NextResponse.json(
    featuredPosts.map((e) => {
      // Don't send whole post over network...
      return {
        url: e?.url,
        title: e?.title,
        date: e?.date,
      };
    })
  );
}
