import React, { ReactNode } from "react";
import WidthLimit from "./WidthLimit";
import { SegmentedNav } from "./SegmentedNav";
import * as typography from "@/components/Typography";
import moo from "@eliseomartelli/moo/dist";

export const PageLayout = ({
  children,
  routes,
  center = false,
}: {
  children: ReactNode;
  routes: { href: string; name: string }[];
  center?: boolean;
}) => (
  <>
    <WidthLimit className="mb-8">
      <typography.h1 className={moo(["text-center", center])}>
        <SegmentedNav routes={routes} />
      </typography.h1>
    </WidthLimit>
    {children}
  </>
);
