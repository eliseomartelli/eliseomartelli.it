import WidthLimit from "@/components/WidthLimit";
import { allPhotos } from "contentlayer/generated";
import { Card } from "@/components/Card";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Photos - Eliseo Martelli",
  description: "Some pictures that I like",
};

const Photos = () => {
  const { SITE_HOST } = process.env;
  return (
    <WidthLimit>
      <h1 className="text-4xl font-bold mb-4">Photos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {allPhotos.map((photo, i) => (
          <Link href={`/${photo._raw.flattenedPath}`} key={i}>
            <Card
              className="relative aspect-horizontal overflow-hidden group"
              hoverable
            >
              <Image
                src={`${SITE_HOST}/api/thumbnail/${photo._raw.flattenedPath}`}
                alt={photo.title}
                fill
                className="brightness-50 z-0 hover:brightness-[0.25]"
              />
              <h2 className="text-white absolute text-2xl font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                {photo.title}
              </h2>
            </Card>
          </Link>
        ))}
      </div>
    </WidthLimit>
  );
};

export default Photos;
