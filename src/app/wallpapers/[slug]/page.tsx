import WidthLimit from "@/components/WidthLimit";
import React from "react";
import * as typography from "@/components/Typography";
import { Color, getButtonClassNames } from "@/components/Button";
import { LinkIcon } from "@/components/Icons";
import Link from "next/link";
import { SegmentedNav } from "@/components/SegmentedNav";
import { AspectRatioImage } from "../AspectRatioImage";
import { wallpaper } from "@/lib/data/allWallpapers";
import { notFound } from "next/navigation";

const WallpaperInfo = async ({ params }: { params: { slug: string } }) => {
  try {
    const json = await wallpaper(params.slug);
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
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex flex-col w-full gap-4">
            <AspectRatioImage src={json.preview} alt={json.title} />
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
  } catch (error) {
    notFound();
  }
};

export default WallpaperInfo;
