import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Button, { Color } from "./Button";

interface IProductsProps {
  title: string;
  link: string;
  description?: string;
  image: string;
  sitename?: string;
}

export const Product = ({
  title,
  link,
  description,
  image,
  sitename = "Amazon",
}: IProductsProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white shadow-md rounded-lg not-prose overflow-hidden mb-4">
      <div className="flex">
        <Image
          src={image}
          alt={title}
          fill
          className="!relative aspect-square !w-48 p-4 object-contain"
        />
        <div className="flex flex-col bg-gray-50 p-4 gap-4 align-top grow justify-between">
          <h3 className="font-bold text-2xl">{title}</h3>
          <div className="flex justify-between">
            <a href={link}>
              <Button small color={Color.Red}>
                Open on {sitename}
              </Button>
            </a>
            <Button onClick={() => setExpanded(!expanded)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 ${
                  expanded ? "rotate-180" : "rotate-0"
                } transition-all`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      <div className={`${expanded ? "h-auto p-4" : "h-0 -p-4"}`}>
        {description}
      </div>
    </div>
  );
};
