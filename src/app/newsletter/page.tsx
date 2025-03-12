import { NewsletterSignup } from "@/components/custom/newsletter-signup";
import { Button } from "@/components/ui/button";
import { allSortedNewsletter } from "@/lib/sortedNewsletter";
import Link from "next/link";
import React from "react";

const NewsletterPage = () => {
  return (
    <>
      <section className="prose w-full mx-auto">
        <h1 className="font-serif">Newsletter</h1>
      </section>
      <NewsletterSignup />
      <ul>
        {allSortedNewsletter.map((newsletter, key) => (
          <Link href={`/newsletter/${newsletter.slug}`} key={key}>
            <Button
              asChild
              className="flex justify-between -mx-4"
              variant="ghost"
            >
              <li className="">
                <p className="font-bold">{newsletter.title}</p>
                <p>{newsletter.slug}</p>
              </li>
            </Button>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default NewsletterPage;
