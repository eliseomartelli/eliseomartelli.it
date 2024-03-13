import moo from "@eliseomartelli/moo/dist";
import { ReactNode } from "react";

export const PostTitle = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => (
  <section
    className={moo("not-prose", "text-black", "flex", "flex-col", "mb-8")}
  >
    {children}
  </section>
);
