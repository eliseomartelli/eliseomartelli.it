import { Card } from "@/components/ui/card";
import { allPhotos } from "content-collections";
import Image from "next/image";
import Link from "next/link";

export default function PhotosPage() {
  const photos = allPhotos.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <section className="w-screen min-h-screen left-1/2 -translate-x-1/2 relative">
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 md:grid-rows-3 max-h-screen h-full min-h-screen p-4">
        {photos.map(({ slug, title, thumbnail }, index) => (
          <li
            key={slug}
            className={`${index === 0 ? "md:col-span-2 md:row-span-3" : "md:col-span-1 md:row-span-1"}`}
          >
            <Link href={`/photos/${slug}`}>
              <Card className="relative overflow-clip w-full h-full p-0 border-0">
                <Image
                  src={thumbnail}
                  alt={title}
                  fill
                  priority={index === 0}
                  sizes={
                    index === 0
                      ? "(min-width: 768px) 66vw, 100vw"
                      : "(min-width: 768px) 33vw, 100vw"
                  }
                  className="z-0! object-cover object-top"
                />
                <h2 className="bg-black/40 text-white h-full w-full relative text-center font-bold text-xl flex items-center justify-center">
                  {title}
                </h2>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
