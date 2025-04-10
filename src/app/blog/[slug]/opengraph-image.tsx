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

const getRandomHex = (): string => {
  return "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
};

export default async function Image({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  // https://stackoverflow.com/questions/1152024/best-way-to-generate-a-random-color-in-javascript
  const view = (
    <div
      tw="flex flex-col w-full h-full p-24 bg-stone-100 text-white"
      style={{
        background: `
        linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)),
        linear-gradient(to top left, ${getRandomHex()}, ${getRandomHex()}, ${getRandomHex()}, ${getRandomHex()})`,
      }}
    >
      <div tw="flex flex-col">
        <p tw="mt-0 text-2xl">{post.formattedDate}</p>
        <h2 tw="text-7xl text-left tracking-tight">{post.title}</h2>
        <p tw="text-3xl">{post.excerpt}</p>
      </div>
      <div tw="absolute bottom-0 flex flex-row items-center w-full justify-between ml-24 mb-12">
        <div tw="flex">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              tw={`${colorClassFromPostTag(tag)} py-2 px-4 rounded-full text-2xl mr-2`}
            >
              {tag}
            </span>
          ))}
        </div>
        <span tw="flex items-center">
          <h1 tw="text-3xl mr-4 font-mono">Eliseo Martelli</h1>
          <img
            src="https://eliseomartelli.it/icon.png"
            tw="w-18 ml-4"
            alt="Logo"
          />
        </span>
      </div>
    </div>
  );

  return new ImageResponse(view, { ...size });
}
