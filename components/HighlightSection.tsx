import React from "react";

export const HighlightSection = ({
  text,
  number,
}: {
  text: string;
  number: string;
}) => {
  return (
    <div className="flex justify-start items-center not-prose">
      <h3 className="absolute text-2xl font-extrabold translate-x-8">{text}</h3>
      <p className="font-mono font-bold opacity-30 text-8xl">{number}</p>
    </div>
  );
};
