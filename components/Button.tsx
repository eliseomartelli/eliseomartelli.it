import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  color?: Color;
  small?: boolean;
  className?: string;
  disabled?: boolean;
}

export enum Color {
  Transparent,
  Red,
  DarkGray,
  Green,
  Sky,
}

export default function Button({
  children,
  onClick,
  ariaLabel,
  color,
  small,
  className: passedClassNames,
  disabled,
}: ButtonProps): JSX.Element {
  const className = [
    "rounded-md transition-colors font-bold",
    color == Color.Transparent && "hover:bg-gray-200",
    color == Color.Red &&
      "text-white bg-red-800 hover:bg-red-600 disabled:bg-gray-500",
    color == Color.Green && "text-white bg-green-800 hover:bg-green-600",
    color == Color.DarkGray && "text-white bg-gray-500 hover:bg-gray-800",
    color == Color.Sky && "text-white bg-sky-500 hover:bg-sky-800",
    small ? "px-4 py-1" : "py-2 px-4",
    passedClassNames,
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
