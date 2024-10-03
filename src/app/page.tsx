import { PageLayout } from "@/components/PageLayout";
import WidthLimit from "@/components/WidthLimit";
import Link from "next/link";

export const metadata = { title: "Home - Eliseo Martelli" };

const Home = () => {
  return (
    <PageLayout>
      <WidthLimit className="prose mx-auto">
        <p>
          I’m a software developer and visual artist based in Turin, balancing my
          passion for technology and creativity.
          As a community builder, I enjoy collaboration and sharing knowledge
          within my networks.
          My current focus is on developing a reproducible computing platform for
          bioinformatics research.
        </p>
        <p>
          Outside of work, I’m interested in art, photography, and music.<br />
          I value growth and enjoy contributing to the communities I’m part of,
          both locally and globally.
        </p>
        <Link href={"/about"}>about</Link>{" "}
        <Link
          href={
            "http://github.com/eliseomartelli/cv/releases/latest/download/cv.pdf"
          }
        >
          cv
        </Link>
      </WidthLimit>
    </PageLayout >
  );
};

export default Home;
