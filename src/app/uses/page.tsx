import React from "react";
import { allUses } from "contentlayer/generated";
import { MDXComponent } from "@/components/MDX";
import { PageLayout } from "@/components/PageLayout";
import WidthLimit from "@/components/WidthLimit";

const Uses = () => {
  const [usesMd] = allUses;
  return (
    <PageLayout routes={[{ name: "Uses", href: "/uses" }]} center>
      <WidthLimit>
        <article className="prose mx-auto mb-8">
          <MDXComponent code={usesMd.body.code} />
        </article>
      </WidthLimit>
    </PageLayout>
  );
};

export default Uses;
