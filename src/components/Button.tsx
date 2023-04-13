import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  color?: Color;
  small?: boolean;
  noCenter?: boolean;
  className?: string;
  disabled?: boolean;
  noBold?: boolean;
  noRounded?: boolean;
}

export enum Color {
  Transparent,
  Red,
  DarkGray,
  Green,
  Sky,
  Purple,
  Black,
}

export default function Button({
  children,
  onClick,
  ariaLabel,
  color,
  small,
  className: passedClassNames,
  disabled,
  noCenter,
  noBold,
  noRounded,
}: ButtonProps): JSX.Element {
  const className = [
    "transition-colors",
    !noRounded && "rounded-md",
    color == Color.Transparent && "hover:bg-gray-200",
    color == Color.Red &&
      "text-white bg-red-800 hover:bg-red-600 disabled:bg-gray-500",
    color == Color.Green && "text-white bg-green-800 hover:bg-green-600",
    color == Color.DarkGray && "text-white bg-gray-500 hover:bg-gray-800",
    color == Color.Sky && "text-white bg-sky-500 hover:bg-sky-800",
    color == Color.Purple && "text-white bg-purple-800 hover:bg-pink-900",
    color == Color.Black && "text-white bg-black hover:bg-gray-800",
    small ? "px-4 py-1" : "py-2 px-4",
    passedClassNames,
    noCenter ? "text-start" : "",
    noBold ? "" : "font-bold",
  ].join(" ");

  return (
    <button
      disabled={disabled}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
