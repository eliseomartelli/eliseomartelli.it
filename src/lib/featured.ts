import { allPosts } from "contentlayer/generated";

export const featuredPosts = async () => {
  const featuredPostsUrls = [
    "vyos-ospf-wireguard",
    "26-11-2022-cryptobros",
    "25-11-2022-cameras",
  ].map((slug) => `blog/${slug}`);

  const featuredPosts = featuredPostsUrls.map((postURL) =>
    allPosts.find((post) => post._raw.flattenedPath === postURL)
  );

  return featuredPosts.map((e) => {
    // Don't send whole post over network...
    return {
      url: e?.url,
      title: e?.title,
      date: e?.date,
    };
  });
};

export const featuredPostsFromSlug = async (postSlug: string) => {
  await new Promise((r) => setTimeout(r, 2000));

  const article = allPosts.find((p) => p.url === postSlug);
  if (!article) {
    return [];
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
    return [];
  }
  const body = (await response.json()) as { output: string };
  const featuredPostsUrls: string[] = body.output
    .trim()
    .split("\n")
    .filter((e) => e.match("^blog/.*"));
  const featuredPosts = featuredPostsUrls.map((postURL) =>
    allPosts.find((post) => post._raw.flattenedPath === postURL.split(":")[0])
  );
  return featuredPosts.map((e) => {
    // Don't send whole post over network...
    return {
      url: e?.url,
      title: e?.title,
      date: e?.date,
    };
  });
};
