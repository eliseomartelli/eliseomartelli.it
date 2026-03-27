import React from "react";

interface RatingBarProps {
  label: string;
  value: number;
  featured?: boolean;
}

export const RatingBar = ({ label, value, featured = false }: RatingBarProps) => {
  const clampedValue = Math.min(10, Math.max(1, value));
  const widthPercent = (clampedValue / 10) * 100;

  let barColor: string;
  if (clampedValue >= 8) {
    barColor = "bg-emerald-500";
  } else if (clampedValue >= 5) {
    barColor = "bg-amber-500";
  } else {
    barColor = "bg-red-500";
  }

  return (
    <div className={`not-prose my-2 ${featured ? "my-4" : ""}`}>
      <div className="flex items-center justify-between mb-1">
        <span className={`font-medium ${featured ? "text-base" : "text-sm"}`}>
          {label}
        </span>
        <span className={`font-semibold tabular-nums ${featured ? "text-base" : "text-sm"}`}>
          {clampedValue}/10
        </span>
      </div>
      <div className={`w-full rounded-full bg-zinc-200 dark:bg-zinc-700 ${featured ? "h-3" : "h-2"}`}>
        <div
          className={`rounded-full ${barColor} ${featured ? "h-3" : "h-2"}`}
          style={{ width: `${widthPercent}%` }}
        />
      </div>
    </div>
  );
};
