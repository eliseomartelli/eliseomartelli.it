import React from "react";
import WidthLimit from "@/components/WidthLimit";
import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/Card";
import { tagletClassNames } from "@/tagletClassNames";
import { allTags } from "./allTags";
import { PageLayout } from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "Tags - Eliseo Martelli",
};

const Tags = () => {
  return (
    <PageLayout
      routes={[
        { href: "/blog", name: "Blog" },
        { href: "/blog/tags", name: "Tags" },
      ]}
    >
      <WidthLimit className="not-prose grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {allTags.map((tag, i) => (
          <Link key={i} href={`/blog/tags/${tag}`}>
            <Card
              className={`${
                tagletClassNames[tag.toLowerCase()]
              } text-center font-bold`}
              hoverable
            >
              {tag}
            </Card>
          </Link>
        ))}
      </WidthLimit>
    </PageLayout>
  );
};

export default Tags;
