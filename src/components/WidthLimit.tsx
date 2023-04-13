import React, { ReactNode } from "react";

const WidthLimit = ({
  children,
  className,
}: {
  children?: ReactNode | ReactNode[];
  className?: string;
}) => {
  return (
    <div className={["max-w-4xl mx-auto w-full", className].join(" ")}>
      {children}
    </div>
  );
};

export default WidthLimit;
