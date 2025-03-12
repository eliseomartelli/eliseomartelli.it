import { Card } from "@/components/ui/card";
import { allPhotos } from "content-collections";
import Image from "next/image";
import Link from "next/link";

export default function PhotosPage() {
  return (
    <ul className="grid grid-cols-2 gap-2">
      {allPhotos.map(({ slug, title, thumbnail }) => (
        <li key={slug}>
          <Link href={`/photos/${slug}`}>
            <Card className="relative overflow-clip aspect-video">
              <Image
                src={thumbnail}
                alt={title}
                fill
                sizes="(min-width: 640px) 50vw,
              (min-width: 768px) 33vw,
              25vw"
                className="z-0! object-cover object-top"
              />
              <h2 className="bg-black/40 text-white h-full w-full relative -my-6 p-8 text-center font-bold text-xl flex items-center justify-center">
                {title}
              </h2>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
