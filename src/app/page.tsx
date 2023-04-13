import { Bio } from "@/components/Bio";
import Button, { Color } from "@/components/Button";
import WidthLimit from "@/components/WidthLimit";
import Image from "next/image";
import { DefaultFeaturedPosts } from "./featuredPostSection";
import { Newsletter } from "@/components/Newsletter";
import Link from "next/link";
import { Features, useFeatures } from "@/lib/useFeatures";

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
            className="rounded-full"
          />
        }
        extra={
          <Link href="/contact">
            <Button color={Color.Red}>Get in touch</Button>
          </Link>
        }
      ></Bio>
      {features.includes(Features.FeaturedPosts) && <DefaultFeaturedPosts />}
      {features.includes(Features.Newsletter) && <Newsletter />}
    </WidthLimit>
  );
};

export default Home;
