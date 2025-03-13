import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Link from "next/link";

export const Product = ({
  children,
  title,
  variation,
  link,
  linkText = "Buy",
}: {
  children?: ReactNode;
  title?: ReactNode;
  variation?: string;
  link?: string;
  linkText?: string;
}) => {
  return (
    <Card>
      <div className="flex justify-between not-prose items-center px-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">{title}</h1>
          {variation && (
            <span className="text-sm text-gray-500">{variation}</span>
          )}
        </div>
        {link && (
          <Button asChild>
            <Link href={link}>{linkText}</Link>
          </Button>
        )}
      </div>
      <section className="prose px-4">{children}</section>
    </Card>
  );
};
