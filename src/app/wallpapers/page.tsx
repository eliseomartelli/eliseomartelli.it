import { Card } from "@/components/Card";
import WidthLimit from "@/components/WidthLimit";
import React from "react";
import * as typography from "@/components/Typography";
import Link from "next/link";
import { AspectRatioImage } from "./AspectRatioImage";
import { allWallpapers } from "@/lib/data/allWallpapers";
import { notFound } from "next/navigation";

export interface Wallpaper {
  reference?: string;
  title: string;
  location: string;
  preview: string;
  urls?: { name: string; url: string }[];
}

const Wallpapers = async () => {
  try {
    const response = await allWallpapers();
    return (
      <>
        <WidthLimit className="flex flex-col gap-4 min-h-full">
          <typography.h1>Wallpapers</typography.h1>
        </WidthLimit>
        <div className="columns-2 md:columns-3 lg:columns-4 p-4 min-h-full gap-4">
          {response.map((e, i) => (
            <Link
              key={i}
              href={`/wallpapers/${e.reference}`}
              className="break-inside-avoid block py-2"
            >
              <Card className="!p-0 overflow-hidden">
                <AspectRatioImage src={e.preview} alt={e.title} />
                <div className="p-4">
                  <h2 className="text-lg font-bold">{e.title}</h2>
                  <p className="flex">{e.location}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </>
    );
  } catch (error) {
    notFound();
  }
};

export default Wallpapers;
