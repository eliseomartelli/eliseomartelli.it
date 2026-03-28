import Link from "next/link";
import SplatViewerLoader from "@/components/custom/splat-viewer-loader";

export default function Home() {
  return (
    <>
      <article className="prose">
        <div className="w-40 h-40 mb-8">
          <SplatViewerLoader />
        </div>
        <p>
          I&apos;m <b>Eliseo Martelli</b>, a Software Developer & Photographer
          based in Turin, Italy.
        </p>
        <p>I love handcrafting human experiences and building communities.</p>
        <p>
          I&apos;m currently engaged in building a reproducible computing
          platform for bioinformatics research.
        </p>
        <p>
          <Link href="/about">about</Link>{" "}
          <Link href="http://github.com/eliseomartelli/cv/releases/latest/download/cv.pdf">
            cv
          </Link>
        </p>
      </article>
    </>
  );
}
