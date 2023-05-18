import React from "react";
import { allUses } from "contentlayer/generated";
import { MDXComponent } from "@/components/MDX";
import { PageLayout } from "@/components/PageLayout";

const Uses = () => {
  const [usesMd] = allUses;
  return (
    <PageLayout routes={[{ name: "Uses", href: "/uses" }]} center>
      <article className="prose mx-auto">
        <MDXComponent code={usesMd.body.code} />
      </article>
    </PageLayout>
  );
};

export default Uses;
