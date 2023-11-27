import { ImageResponse } from "next/server";
import { allPosts } from "contentlayer/generated";
import { dateFormatter } from "@/lib/dateFormatter";
import { NextResponse } from "next/server.js";
import { tagletClassNames } from "@/tagletClassNames";

export const runtime = "edge";

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { postSlug: string[] };
  },
) {
  const post = allPosts.find((p) => p.url === params.postSlug.join("/"));

  if (!post) {
    return NextResponse.json(
      { message: "Post not found." },
      {
        status: 404,
      },
    );
  }

  const view = (
    <div tw="flex flex-col w-full h-full p-24 bg-stone-100">
      <div tw="flex flex-col">
        <p tw="mt-0 text-xl">{dateFormatter(post.date)}</p>
        <h2 tw="text-6xl font-bold text-gray-900 text-left tracking-tight max-w-2/3">
          {post.title}
        </h2>
        <p tw="text-xl max-w-1/2">{post.excerpt}</p>
        <div tw="flex">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              tw={`${
                tagletClassNames[tag.toLowerCase()] ||
                tagletClassNames["default"]
              } py-2 px-4 rounded-full`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div tw="flex grow"></div>
      <div tw="flex flex-row items-center justify-end">
        <h1 tw="text-3xl">Eliseo Martelli</h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://eliseomartelli.it/icon.png"
          tw="w-24 ml-4"
          alt="Logo"
        />
      </div>
    </div>
  );

  try {
    return new ImageResponse(view, { width: 1200, height: 630 });
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to generate image" },
      {
        status: 500,
      },
    );
  }
}
