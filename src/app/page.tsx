import WidthLimit from "@/components/WidthLimit";
import Link from "next/link";

export const metadata = { title: "Home - Eliseo Martelli" };

const Home = () => {
  return (
    <>
      <WidthLimit className="prose prose-p:text-4xl font-serif px-8 py-4">
        <p>
          I&apos;m Eliseo Martelli, a <b>Software Developer</b> &
          <b>Visual Artist</b> based in Turin, Italy.
        </p>
        <p>
          I&apos;m currently engaged in building a reproducible computing
          platform for bioinformatics research.
        </p>
        <p>I love handcrafting human experiences and building communities.</p>
      </WidthLimit>
      <WidthLimit className="prose font-serif px-8">
        <Link
          href={
            "http://github.com/eliseomartelli/cv/releases/latest/download/cv.pdf"
          }
        >
          cv
        </Link>{" "}
        <Link href={"/about"}>about</Link>
      </WidthLimit>
    </>
  );
};

export default Home;
