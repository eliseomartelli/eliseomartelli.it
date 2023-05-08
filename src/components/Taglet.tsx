import React, { ReactNode } from "react";
import { tagletClassNames } from "@/tagletClassNames";
import moo from "@eliseomartelli/moo/dist";

export const Taglet = ({
  children,
  className,
}: {
  children?: ReactNode | ReactNode[];
  className?: string;
}) => {
  return (
    <span className={moo("rounded-full py-1 px-4 border", className!)}>
      {children}
    </span>
  );
};

export const CategoryTaglet = ({ category }: { category: string }) => (
  <Taglet
    className={
      tagletClassNames[category.toLowerCase()] || tagletClassNames["default"]
    }
  >
    {category}
  </Taglet>
);
