import { ReactNode } from "react";

export interface TimelineElementProps {
  from: string;
  to: string;
  what: string;
  where: string;
  key?: number;
}

export function TimelineElement({
  from,
  to,
  what,
  where,
}: TimelineElementProps): JSX.Element {
  return (
    <li className="relative">
      <div className="absolute w-4 h-4 bg-stone-800 rounded-full -left-2 border border-white top-1/2 -translate-y-1/2"></div>
      <div className="ml-6">
        <time className="text-xs">
          {from} - {to}
        </time>
        <p className="font-bold text-lg">{what}</p>
        <p>{where}</p>
      </div>
    </li>
  );
}

export const Timeline = ({
  children,
}: {
  children?: ReactNode[] | ReactNode;
}) => (
  <ul className="border-l border-gray-800 relative flex flex-col gap-4 not-prose list-none p-0 ml-4">
    {children}
  </ul>
);
