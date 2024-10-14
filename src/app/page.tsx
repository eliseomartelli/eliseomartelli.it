import moo from "@eliseomartelli/moo/dist";
import Link from "next/link";
import { ReactNode } from "react";
import { AspectRatioImage } from "./wallpapers/AspectRatioImage";
import Button, { Color, getButtonClassNames } from "@/components/Button";

export const metadata = { title: "Home - Eliseo Martelli" };

interface IHomeSection {
  children: JSX.Element | ReactNode;
  className?: string;
}

const HomeSection = ({ children, className }: IHomeSection) =>
  <section className={moo("min-h-screen relative", className!)}>{children}</section>

interface IHomeSectionTitle {
  children: JSX.Element | ReactNode;
  className?: string;
}

const HomeSectionTitle = ({ children, className }: IHomeSectionTitle) =>
  <h1 className={moo(
    "text-6xl font-bold font-serif italic mix-blend-difference text-white max-w-md py-2",
    className!)}>{children}</h1>

const Home = () => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <HomeSection>
        <HomeSectionTitle className="self-end sticky top-1/2 z-10 ms-auto text-end">
          Visual Arts
        </HomeSectionTitle>
        <div className="w-full flex flex-col gap-4">
          <div className="w-1/3 self-center">
            <AspectRatioImage src="/photoPortfolio/street/IMG_0040.jpg" alt="Photography of condensation" />
          </div>
          <div className="w-1/3 ms-auto">
            <AspectRatioImage src="/photoPortfolio/street/IMG_6356.jpg" alt="Photography of condensation" />
          </div>
          <div className="w-2/3 self-start">
            <AspectRatioImage src="/photoPortfolio/concerts/IMG_0461.jpg" alt="Photography of condensation" />
          </div>
        </div>
      </HomeSection>
      <HomeSection className="bg-emerald-800 -mx-4 px-4">
        <HomeSectionTitle className="self-end sticky top-1/2 z-10">
          Software Development
        </HomeSectionTitle>
        <div className="flex flex-col gap-4 prose p-4 font-serif max-w-prose ms-auto w-full prose-xl text-white prose-a:text-pink-300">
          <p>
            My work focuses on building robust systems that support
            bioinformatics research. Currently, I'm developing a reproducible
            computing platform aimed at advancing bioinformatics by ensuring
            that research workflows are consistent, scalable, and efficient.
          </p>
          <p>
            Download my{" "}
            <Link href="http://github.com/eliseomartelli/cv/releases/latest/download/cv.pdf">
              CV
            </Link >
            {" "}or have a look at my{" "}
            <Link href="/about">
              about page.
            </Link >
          </p>
        </div>
      </HomeSection>
      <HomeSection className="items-end not-prose">
        <div className="sticky mt-auto mix-blend-difference font-serif text-white top-1/2 z-10 text-end py-2 leading-[0.99]">
          <p className="text-[16vw]">Eliseo Martelli</p>
          <div className="prose ml-auto text-white prose-xl">
            <p className="text-end">(this is me)</p>
            <p>
              P.S.: I love handcrafting human experiences and building communities.
            </p>
            <div className="pt-4">
              <Link href="/contact" className={getButtonClassNames({ color: Color.Red, className: "mt-8", noRounded: true })}>
                Get in touch
              </Link>
            </div>
          </div>
        </div>
        <div className="w-2/3 self-end">
          <AspectRatioImage src="/profilePicture/colour.jpg" alt="Photography of condensation" />
        </div>
      </HomeSection>
    </div>
  );
};

export default Home;
