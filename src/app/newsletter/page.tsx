import React from "react";
import WidthLimit from "@/components/WidthLimit";
import { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import Link from "next/link";
import { allNewsletters } from "@/.contentlayer/generated";
import { Newsletter } from "@/components/Newsletter";
import * as t from "@/components/Typography";

export const metadata: Metadata = {
  title: "Newsletter - Eliseo Martelli",
};

const Recipes = () => {
  return (
    <PageLayout routes={[{ name: "Newsletter", href: "/newsletter" }]}>
      <WidthLimit className="flex flex-col gap-4">
        <Newsletter showTitle={false} />
        <t.h2>Past issues</t.h2>
        {allNewsletters.length == 0 && "Nothing to see here."}
        {allNewsletters
          .sort((a, b) => {
            if (a._id < b._id) {
              return -1;
            }
            if (a._id > b._id) {
              return 1;
            }
            return 0;
          })
          .reverse()
          .map((n, i) => (
            <Link
              href={`/${n._id}`}
              key={i}
              className="flex flex-grow gap-4 hover:bg-stone-50 p-2 -m-2"
            >
              <p className="font-bold grow">{n.title}</p>
              {n._id.split("/")[1].split(".")[0]}
            </Link>
          ))}
      </WidthLimit>
    </PageLayout>
  );
};

export default Recipes;
