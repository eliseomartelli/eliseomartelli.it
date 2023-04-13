import { Bio } from "@/components/Bio";
import Button, { Color } from "@/components/Button";
import WidthLimit from "@/components/WidthLimit";
import Image from "next/image";
import { DefaultFeaturedPosts } from "./featuredPostSection";
import { Newsletter } from "@/components/Newsletter";
import Link from "next/link";

export default function Home() {
  return (
    <WidthLimit className="p-4 flex flex-col gap-16">
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
          ></Image>
        }
        extra={
          <Link href="/contact">
            <Button color={Color.Red}>Get in touch</Button>
          </Link>
        }
      ></Bio>
      <DefaultFeaturedPosts />
      <Newsletter />
    </WidthLimit>
  );
}
