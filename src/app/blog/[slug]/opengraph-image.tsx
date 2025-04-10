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

  // https://stackoverflow.com/questions/1152024/best-way-to-generate-a-random-color-in-javascript
  const view = (
    <div
      tw="flex flex-col w-full h-full p-24 bg-stone-100 text-white"
      style={{
        background: `
        linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
        linear-gradient(to top left,${"#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)},${"#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)}),
`,
      }}
    >
      <div tw="flex flex-col">
        <p tw="mt-0 text-2xl">{post.formattedDate}</p>
        <h2 tw="text-6xl font-bold text-left tracking-tight max-w-2/3">
          {post.title}
        </h2>
        <p tw="text-2xl max-w-1/2">{post.excerpt}</p>
        <div tw="flex mt-8">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              tw={`${colorClassFromPostTag(tag)} py-2 px-4 rounded-full text-2xl mr-2`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div tw="flex grow"></div>
      <div tw="absolute flex flex-row items-center justify-end bottom-10 right-10">
        <h1 tw="text-3xl mr-4 font-bold">Eliseo Martelli</h1>
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
