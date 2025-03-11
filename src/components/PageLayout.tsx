import React, { ReactNode } from "react";
import WidthLimit from "./WidthLimit";
import { SegmentedNav } from "./SegmentedNav";
import * as typography from "@/components/Typography";

export const PageLayout = ({
  children,
  routes,
}: {
  children: ReactNode;
  routes?: { href: string; name: string }[];
  center?: boolean;
}) => (
  <main className="my-8 mx-auto w-full">
    {routes && (
      <WidthLimit className="mb-8">
        <typography.h1>
          <SegmentedNav routes={routes} />
        </typography.h1>
      </WidthLimit>
    )}
    {children}
  </main>
);
