import { allPhotos } from "contentlayer/generated";
import { ImageResponse, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { photoSlug: string[] };
  },
) {
  const photo = allPhotos.find(
    (p) => p._raw.flattenedPath === params.photoSlug.join("/"),
  );

  const { SITE_HOST } = process.env;

  if (!photo) {
    return NextResponse.json(
      { message: "Photos not found." },
      {
        status: 404,
      },
    );
  }

  const view = (
    <div tw="flex flex-wrap bg-stone-800">
      {[photo.thumbnail].map((p, i) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={`${SITE_HOST}${p}`}
          alt={p}
          key={i}
          width={600}
          height={402}
          style={{ objectFit: "cover" }}
        />
      ))}
    </div>
  );

  try {
    return new ImageResponse(view, { width: 600, height: 400 });
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to generate image" },
      {
        status: 500,
      },
    );
  }
}
