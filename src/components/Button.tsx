import moo from "@eliseomartelli/moo/dist";
import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  color?: Color;
  small?: boolean;
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

export const getButtonClassNames = ({
  color,
  small,
  className: passedClassNames,
  noBold,
  noRounded,
}: ButtonProps) => {
  const className = moo(
    "transition-colors",
    ["rounded-md", !noRounded],
    ["hover:bg-stone-200", color == Color.Transparent],
    ["text-white bg-red-800 hover:bg-red-600", color == Color.Red],
    ["text-white bg-green-800 hover:bg-green-600", color == Color.Green],
    ["text-white bg-stone-500 hover:bg-stone-800", color == Color.DarkGray],
    ["text-white bg-sky-500 hover:bg-sky-800", color == Color.Sky],
    ["text-white bg-purple-800 hover:bg-pink-900", color == Color.Purple],
    ["text-white bg-stone-700 hover:bg-stone-800", color == Color.Black],
    "disabled:bg-stone-500", // Disabled
    ["px-4 py-1", small],
    ["py-2 px-4", !small],
    ["font-bold", !noBold],
    passedClassNames!,
  );
  return className;
};

export default function Button(props: ButtonProps): JSX.Element {
  return (
    <button
      disabled={props.disabled}
      className={getButtonClassNames(props)}
      onClick={props.onClick}
      aria-label={props.ariaLabel}
    >
      {props.children}
    </button>
  );
}
