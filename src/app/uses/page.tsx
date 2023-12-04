import React from "react";
import { allUses } from "contentlayer/generated";
import { MDXComponent } from "@/components/MDX";
import { PageLayout } from "@/components/PageLayout";
import WidthLimit from "@/components/WidthLimit";
import { Article } from "@/components/Article";

const Uses = () => {
  const [usesMd] = allUses;
  return (
    <PageLayout routes={[{ name: "Uses", href: "/uses" }]} center>
      <WidthLimit>
        <Article>
          <MDXComponent code={usesMd.body.code} />
        </Article>
      </WidthLimit>
    </PageLayout>
  );
};

export default Uses;
