import Link from "next/link";

export default function Home() {
  return (
    <article className="prose">
      <p>
        I&apos;m <b>Eliseo Martelli</b>, a Software Developer & Visual Artist
        based in Turin, Italy.
      </p>
      <p>
        I&apos;m currently engaged in building a reproducible computing platform
        for bioinformatics research.
      </p>
      <p>I love handcrafting human experiences and building communities.</p>
      <p>
        <Link href="/about">about</Link>{" "}
        <Link href="http://github.com/eliseomartelli/cv/releases/latest/download/cv.pdf">
          cv
        </Link>
      </p>
    </article>
  );
}
