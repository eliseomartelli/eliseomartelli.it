import moo from "@eliseomartelli/moo/dist";
import React, { ReactNode } from "react";

const WidthLimit = ({
  children,
  className,
}: {
  children?: ReactNode | ReactNode[];
  className?: string;
}) => {
  return (
    <div className={moo("max-w-4xl mx-auto w-full px-4", className!)}>
      {children}
    </div>
  );
};

export default WidthLimit;
