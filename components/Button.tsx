import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
}

export default function Button({
  children,
  onClick,
  ariaLabel,
}: ButtonProps): JSX.Element {
  return (
    <button
      className="hover:bg-gray-200 py-2 px-4 rounded-md transition-colors"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
