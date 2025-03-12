import { CustomMdx } from "@/components/mdx-custom/mdx";
import { allAbouts } from "content-collections";
import { notFound } from "next/navigation";
export default function AboutPage() {
  if (!allAbouts[0]) {
    notFound();
  }
  const about = allAbouts[0];
  return (
    <article className="prose w-full mx-auto">
      <h1 className="font-serif">About</h1>
      <CustomMdx code={about.mdx} />
    </article>
  );
}
