import React, { ReactNode } from "react";

interface BioProps {
  name: String;
  description: String;
  image?: ReactNode;
  extra?: ReactNode;
}

export const Bio = ({ name, description, image, extra }: BioProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-2 items-start md:items-center">
      <span className="basis-1/3 flex items-center justify-center">
        {image}
      </span>
      <div className="flex flex-col gap-4 max-w-prose">
        <h1 className="text-4xl font-bold">{name}</h1>
        <p>{description}</p>
        <div className="mt-4">{extra}</div>
      </div>
    </div>
  );
};
