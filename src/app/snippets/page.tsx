import React from "react";
import WidthLimit from "@/components/WidthLimit";
import { allSnippets } from "contentlayer/generated";
import { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import Link from "next/link";
import { Taglet } from "@/components/Taglet";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Snippets - Eliseo Martelli",
};

const Snippets = () => {
  const snippets = allSnippets;

  return (
    <PageLayout routes={[{ name: "Snippets", href: "/snippets" }]}>
      <WidthLimit>
        {snippets.map((s) => (
          <Link href={s._raw.flattenedPath} key={s._raw.flattenedPath}>
            <Card
              className="flex justify-between md:flex-row flex-col -mx-4"
              noBackground
              noBorder
            >
              <h2 className="font-bold text-md">{s.title}</h2>
              <div className="flex gap-2">
                {s.tags!.map((tag) => (
                  <Taglet key={tag}>{tag}</Taglet>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </WidthLimit>
    </PageLayout>
  );
};

export default Snippets;
