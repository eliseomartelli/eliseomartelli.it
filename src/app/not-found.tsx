import { Color, getButtonClassNames } from "@/components/Button";
import WidthLimit from "@/components/WidthLimit";
import Link from "next/link";
import React from "react";
import { DefaultFeaturedPosts } from "./featuredPostSection";

const NotFound = () => {
  return (
    <WidthLimit className="flex flex-col gap-8 items-start">
      <h1 className="text-4xl font-bold">Uh, oh</h1>
      <div className="prose">
        <p>I couldn&apos;t find that page...</p>
      </div>
      <iframe
        allow="autoplay *; encrypted-media *;"
        height="150"
        className="w-full max-w-2xl overflow-hidden bg-transparent"
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        src="https://embed.music.apple.com/it/album/i-still-havent-found-what-im-looking-for/1442950015?i=1442950019&l=en"
      />
      <Link
        href={"/"}
        className={getButtonClassNames({
          color: Color.Red,
        })}
      >
        Go home
      </Link>
      {/* @ts-expect-error Server Component */}
      <DefaultFeaturedPosts />
    </WidthLimit>
  );
};

export default NotFound;
