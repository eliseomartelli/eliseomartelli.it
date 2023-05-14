import { allPosts } from "@/.contentlayer/generated/index.mjs";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { postSlug: string[] };
  }
): Promise<NextResponse> {
  const article = allPosts.find((p) => p.url === params.postSlug.join("/"));
  if (!article) {
    return NextResponse.json({});
  }
  const list = allPosts.map((p) => `${p.url}: ${p.excerpt}`).join("\n");
  const prompt = `Pick 3 filenames from the possible filenames.

The files are about topics spanning music,
photography,
technology,
software development,
and life.

RULES:
- OUTPUT plain text ONLY.
- OUTPUT exact filename ONLY.
- OUTPUT one filename per line.
- MUST NOT include explanations.
- MUST NOT include current filename.
- MUST NOT include any other text.

Possible filenames:
${list}

Current filename: ${article.url}: ${article.url}`;
  const { AI_API_KEY } = process.env;

  const response = await fetch("https://aigateway.fly.dev/api", {
    method: "POST",
    body: JSON.stringify({ prompt: prompt }),
    headers: [["X-API-KEY", AI_API_KEY!]],
  });
  if (!response.ok) {
    return NextResponse.json([], { status: 404 });
  }
  const body = (await response.json()) as { output: string };
  const featuredPostsUrls: string[] = body.output
    .trim()
    .split("\n")
    .filter((e) => e.match("^blog/.*"));
  const featuredPosts = featuredPostsUrls.map((postURL) =>
    allPosts.find((post) => post._raw.flattenedPath === postURL.split(":")[0])
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
