import { Color, getButtonClassNames } from "@/components/Button";
import { FeaturedPosts } from "@/components/FeaturedPosts";
import { PageLayout } from "@/components/PageLayout";
import WidthLimit from "@/components/WidthLimit";
import { Features, useFeatures } from "@/lib/useFeatures";
import Link from "next/link";

const NotFound = () => {
  const features = useFeatures();
  return (
    <PageLayout routes={[
      { href: "/404", name: "Uh, oh!" }]}>
      <WidthLimit className="flex flex-col gap-8 items-start mx-auto prose">
        <p>I couldn&apos;t find that page...</p>
        <iframe
          allow="autoplay *; encrypted-media *;"
          height="150"
          className="w-full max-w-2xl overflow-hidden bg-transparent"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          src="https://embed.music.apple.com/it/album/i-still-havent-found-what-im-looking-for/1442950015?i=1442950019&l=en"
        />
        <div className="not-prose mt-8 flex flex-col gap-8 justify-start">
          <Link
            href={"/"}
            className={getButtonClassNames({
              color: Color.Red,
            })}
          >
            Go home
          </Link>
          {features.includes(Features.FeaturedPosts) && <FeaturedPosts />}
        </div>
      </WidthLimit>
    </PageLayout >
  );
};

export default NotFound;
