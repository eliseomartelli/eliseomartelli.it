import React, { ReactNode } from "react";

interface BioProps {
  name: String;
  description: String;
  image?: ReactNode;
  extra?: ReactNode;
}

export const Bio = ({ name, description, image, extra }: BioProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
      <span>{image}</span>
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">{name}</h1>
        <p>{description}</p>
        <div className="mt-4">{extra}</div>
      </div>
    </div>
  );
};
