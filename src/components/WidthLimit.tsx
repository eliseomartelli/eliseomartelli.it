import React, { ReactNode } from "react";

const WidthLimit = ({
  children,
  className,
}: {
  children?: ReactNode | ReactNode[];
  className?: string;
}) => {
  return (
    <div className={["max-w-4xl mx-auto w-full px-4", className].join(" ")}>
      {children}
    </div>
  );
};

export default WidthLimit;
