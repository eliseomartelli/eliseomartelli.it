import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  isActive?: boolean;
  isBig?: boolean;
  isRed?: boolean;
  isTransparent?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isActive,
  isBig,
  isRed,
  isTransparent,
  className,
}) => {
  const classes = [
    "border font-bold px-4 py-2 hover:bg-gray-100 rounded-lg", // Base
    isBig ? "text-xl px-8" : "",
    isActive ? "text-red-500 border-red-200" : "",
    isTransparent ? "border-transparent" : "",
    isRed ? "hover:bg-red-500 hover:text-white hover:border-transparent" : "",
    className,
  ];
  return <div className={classes.join(" ")}>{children}</div>;
};
