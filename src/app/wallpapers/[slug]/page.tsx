import WidthLimit from "@/components/WidthLimit";
import React from "react";
import { Wallpaper } from "../page";
import * as typography from "@/components/Typography";
import Image from "next/image";
import { Color, getButtonClassNames } from "@/components/Button";
import { LinkIcon } from "@/components/Icons";
import Link from "next/link";
import { SegmentedNav } from "@/components/SegmentedNav";
import { AspectRatioImage } from "../AspectRatioImage";

const WallpaperInfo = async ({ params }: { params: { slug: string } }) => {
  const address = `https://raw.githubusercontent.com/eliseomartelli/wallpapers-data/main/data/${params.slug}/info.json`;
  const response = await fetch(address);
  if (!response.ok) {
    return <WidthLimit>Error loading page.</WidthLimit>;
  }
  const json = (await response.json()) as Wallpaper;
  return (
    <WidthLimit className="flex flex-col gap-4">
      <typography.h1>
        <SegmentedNav
          routes={[
            { href: "/wallpapers", name: "Wallpapers" },
            { href: `/wallpapers/${params.slug}`, name: json.title },
          ]}
        />
      </typography.h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col w-full gap-4">
          <AspectRatioImage src={json.preview} alt={json.title} />
          <div>
            <h2 className="text-lg font-bold">{json.title}</h2>
            <p>{json.location}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <typography.h2>Download links</typography.h2>
          <div className="grid grid-cols-2 gap-4">
            {json.urls!.map((e, i) => (
              <Link
                key={i}
                href={e.url}
                className={getButtonClassNames({
                  color: Color.Purple,
                  className: "flex gap-2 items-center",
                })}
              >
                <LinkIcon /> {e.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </WidthLimit>
  );
};

export default WallpaperInfo;
