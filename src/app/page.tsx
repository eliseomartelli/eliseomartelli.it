import * as t from "@/components/Typography";
import { FeaturedPosts } from "@/components/FeaturedPosts";
import { Newsletter } from "@/components/Newsletter";
import WidthLimit from "@/components/WidthLimit";
import { Features, useFeatures } from "@/lib/useFeatures";
import Image from "next/image";
import Link from "next/link";
import { Color, getButtonClassNames } from "@/components/Button";

export const metadata = { title: "Home - Eliseo Martelli" };

const Home = () => {
  const features = useFeatures();
  return (
    <>
      <section className="bg-stone-800 text-white font-bold p-8">
        <WidthLimit className="flex flex-col gap-4 animate-reveal">
          <p>Hi, I&apos;m Eliseo Martelli.</p>
          <section className="text-2xl gap-4 flex flex-col">
            <p>
              I&apos;m a Visual Artist & Software Developer based in Turin,
              Italy.
            </p>
            <p>
              I&apos;m also deeply passionate about design, music and cooking.
            </p>
            <p>This website is a collection of all the things I like.</p>
          </section>
          <div className="flex justify-end">
            <div
              className="relative aspect-square max-w-xs w-64 md:-mb-24
before:absolute before:top-2 before:left-2 before:w-full before:h-full before:bg-red-600"
            >
              <Image
                src="/profilePicture/colour.jpg"
                alt="A picture of me"
                fill
                sizes="(max-width: 350px)"
              />
            </div>
          </div>
        </WidthLimit>
      </section>
      <WidthLimit className="my-16 gap-8 flex flex-col items-end">
        {features.includes(Features.FeaturedPosts) && <FeaturedPosts />}
        {features.includes(Features.Newsletter) && <Newsletter />}
      </WidthLimit>
      <section className="border-s-red-600 border-s-4">
        <WidthLimit className="py-8 gap-8 flex flex-col">
          <t.h2>I&apos;d love to hear from you!</t.h2>
          <span>
            <Link
              href="/contact"
              className={getButtonClassNames({
                color: Color.Red,
              })}
            >
              Get in Touch
            </Link>
          </span>
        </WidthLimit>
      </section>
    </>
  );
};

export default Home;
