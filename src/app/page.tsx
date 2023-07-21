import { Bio } from "@/components/Bio";
import { Color, getButtonClassNames } from "@/components/Button";
import WidthLimit from "@/components/WidthLimit";
import Image from "next/image";
import { Newsletter } from "@/components/Newsletter";
import Link from "next/link";
import { Features, useFeatures } from "@/lib/useFeatures";
import { FeaturedPosts } from "@/components/FeaturedPosts";

export const metadata = { title: "Home - Eliseo Martelli" };

const Home = () => {
  const features = useFeatures();
  return (
    <WidthLimit className="flex flex-col gap-16">
      <Bio
        name="Eliseo Martelli"
        description="Hey, I'm Eliseo. I'm passionate about computers, photography & music."
        image={
          <Image
            src={"/profilePicture/colour.jpg"}
            width={128}
            height={128}
            alt="Logo"
            loading="eager"
            className="rounded-full"
          />
        }
        extra={
          <Link
            href="/contact"
            className={getButtonClassNames({ color: Color.Red })}
          >
            Get in touch
          </Link>
        }
      ></Bio>
      {features.includes(Features.FeaturedPosts) && <FeaturedPosts />}
      {features.includes(Features.Newsletter) && <Newsletter />}
    </WidthLimit>
  );
};

export default Home;
