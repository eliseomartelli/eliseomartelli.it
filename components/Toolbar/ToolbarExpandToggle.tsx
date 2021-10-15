import React from "react";

export const ToolbarExpandToggle: React.FC<{ expanded: boolean }> = ({
  expanded,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={`${expanded ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}`}
      />
    </svg>
  );
};
