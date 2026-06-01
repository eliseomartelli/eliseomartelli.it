import { CustomMdx } from "@/components/mdx-custom/mdx";
import { allPartnerships } from "content-collections";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PartnershipPage() {
  if (!allPartnerships[0]) {
    notFound();
  }
  const partnership = allPartnerships[0];
  return (
    <article className="prose w-full mx-auto">
      <h1 className="font-serif">Brand Partnerships</h1>
      <CustomMdx code={partnership.mdx} />
      <div className="mt-8 flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/brandpartnership/links">View all referral links</Link>
        </Button>
      </div>
    </article>
  );
}
