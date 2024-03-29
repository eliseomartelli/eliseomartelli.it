import WidthLimit from "@/components/WidthLimit";
import { allPhotos } from "contentlayer/generated";
import { Card } from "@/components/Card";
import Image from "next/image";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";

export const metadata = {
  title: "Photos - Eliseo Martelli",
  description: "Some pictures that I like",
};

const Photos = () => {
  const { SITE_HOST } = process.env;
  return (
    <PageLayout routes={[{ name: "Photos", href: "/photos" }]}>
      <WidthLimit className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {allPhotos.map((photo, i) => (
          <Link href={`/${photo._raw.flattenedPath}`} key={i}>
            <Card
              className="relative aspect-horizontal overflow-hidden group bg-stone-600"
              hoverable
            >
              <Image
                unoptimized
                src={
                  photo.thumbnail ??
                  `${SITE_HOST}/api/thumbnail/${photo._raw.flattenedPath}`
                }
                alt={photo.title}
                priority
                fill
                className="brightness-50 z-0 hover:brightness-[0.25] transition-all object-cover object-top"
              />
              <h2 className="text-white absolute text-2xl font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                {photo.title}
              </h2>
            </Card>
          </Link>
        ))}
      </WidthLimit>
    </PageLayout>
  );
};

export default Photos;
