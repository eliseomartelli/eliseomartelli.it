import React from "react";
import { allUses } from "../../../.contentlayer/generated/index.mjs";
import { MDXComponent } from "@/components/MDX";
import WidthLimit from "@/components/WidthLimit";
import * as typography from "@/components/Typography";

const Uses = () => {
  const [usesMd] = allUses;
  return (
    <WidthLimit className="flex flex-col gap-4 items-end">
      <div className="flex justify-between items-center w-full flex-col">
        <typography.h1>Uses</typography.h1>
      </div>
      <article className="prose mx-auto px-4 w-full">
        <MDXComponent code={usesMd.body.code} />
      </article>
    </WidthLimit>
  );
};

export default Uses;
