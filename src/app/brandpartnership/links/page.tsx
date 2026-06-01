import { Button } from "@/components/ui/button";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import Image from "next/image";
import { CopyCoupon } from "@/components/custom/copy-coupon";

interface ReferralLink {
  title: string;
  url: string;
  description?: string;
  coupon?: string;
}

async function getLinks(): Promise<ReferralLink[]> {
  const filePath = path.join(process.cwd(), "data/referral-links.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  return JSON.parse(jsonData);
}

export const metadata = {
  title: "Links",
  description: "Referral and brand partnership links.",
};

export default async function LinksPage() {
  const links = await getLinks();

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-24 h-24 overflow-hidden rounded-full border-2 border-muted shadow-sm">
          <Image
            src="/portrait.jpg"
            alt="Eliseo Martelli"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold tracking-tight">
            Eliseo Martelli
          </h1>
          <p className="mt-2 text-muted-foreground text-sm max-w-[280px] mx-auto">
            Support my work and save money by using these referral links.
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full space-y-4">
        {links.map((link, index) => (
          <div
            key={index}
            className="relative group flex flex-col w-full rounded-xl border border-border bg-card shadow-sm transition-all hover:bg-accent/50 active:scale-[0.99]"
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-0 rounded-xl"
              aria-label={`Visit ${link.title}`}
            />
            <div className="relative z-10 flex flex-col w-full p-4 pointer-events-none">
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-lg font-semibold pointer-events-auto">
                  {link.title}
                </span>
                {link.coupon && (
                  <div className="pointer-events-auto">
                    <CopyCoupon code={link.coupon} />
                  </div>
                )}
              </div>
              {link.description && (
                <span className="text-sm text-muted-foreground pointer-events-auto">
                  {link.description}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/brandpartnership">About my partnerships</Link>
        </Button>
      </div>
    </div>
  );
}
