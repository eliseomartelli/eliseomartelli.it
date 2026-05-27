import { CustomMdx } from "@/components/mdx-custom/mdx";
import { allPartnerships } from "content-collections";
import { notFound } from "next/navigation";

export default function PartnershipPage() {
  if (!allPartnerships[0]) {
    notFound();
  }
  const partnership = allPartnerships[0];
  return (
    <article className="prose w-full mx-auto">
      <h1 className="font-serif">Brand Partnerships</h1>
      <CustomMdx code={partnership.mdx} />
    </article>
  );
}
