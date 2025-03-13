import { ImageResponse } from "next/og";
import { allPosts } from "content-collections";
import { notFound } from "next/navigation";
import { colorClassFromPostTag } from "@/lib/color-from-tag";

export const alt = "Image for post";
export const size = {
  width: 1200,
  height: 630,
};

export async function generateStaticParams() {
  return allPosts.map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const view = (
    <div tw="flex flex-col w-full h-full p-24 bg-stone-100">
      <div tw="flex flex-col">
        <p tw="mt-0 text-xl">{post.formattedDate}</p>
        <h2 tw="text-6xl font-bold text-gray-900 text-left tracking-tight max-w-2/3">
          {post.title}
        </h2>
        <p tw="text-xl max-w-1/2">{post.excerpt}</p>
        <div tw="flex">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              tw={`${colorClassFromPostTag(tag)} py-2 px-4 rounded-full`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div tw="flex grow"></div>
      <div tw="absolute flex flex-row items-center justify-end bottom-10 right-10">
        <h1 tw="text-3xl">Eliseo Martelli</h1>
        <img
          src="https://eliseomartelli.it/icon.png"
          tw="w-24 ml-4"
          alt="Logo"
        />
      </div>
    </div>
  );

  return new ImageResponse(view, { ...size });
}
