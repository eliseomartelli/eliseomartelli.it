import { NextResponse } from "next/server";
import { allPosts } from "contentlayer/generated";

export async function GET() {
  const featuredPostsUrl = [
    "blog/vyos-ospf-wireguard",
    "blog/26-11-2022-cryptobros",
    "blog/25-11-2022-cameras",
  ];
  const featuredPosts = featuredPostsUrl.map((postURL) =>
    allPosts.find((post) => post._raw.flattenedPath === postURL)
  );
  return NextResponse.json(featuredPosts);
}