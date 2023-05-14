import React from "react";
import WidthLimit from "@/components/WidthLimit";
import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/Card";
import { tagletClassNames } from "@/tagletClassNames";
import { allTags } from "./allTags";
import { SegmentedNav } from "@/components/SegmentedNav";

export const metadata: Metadata = {
  title: "Tags - Eliseo Martelli",
};

const Tags = () => {
  return (
    <WidthLimit>
      <h1 className="text-4xl font-bold mb-4">
        <SegmentedNav
          routes={[
            { href: "/blog", name: "Blog" },
            { href: "/blog/tags", name: "Tags" },
          ]}
        />
      </h1>
      <div className="not-prose grid grid-cols-2 md:grid-cols-3 gap-4 w-full mt-6">
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
      </div>
    </WidthLimit>
  );
};

export default Tags;
