import React from "react";
import { CheckIcon, XIcon } from "lucide-react";

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export const ProsCons = ({ pros, cons }: ProsConsProps) => {
  return (
    <div className="not-prose my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30 p-4">
        <p className="font-semibold text-emerald-800 dark:text-emerald-300 mb-3">Pros</p>
        <ul className="space-y-2">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30 p-4">
        <p className="font-semibold text-red-800 dark:text-red-300 mb-3">Cons</p>
        <ul className="space-y-2">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <XIcon className="mt-0.5 size-4 shrink-0 text-red-600 dark:text-red-400" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
