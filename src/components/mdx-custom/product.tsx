import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { Link } from "lucide-react";
import { Card } from "../ui/card";

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
      <div className="flex justify-between not-prose items-center">
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
      <section className="prose">{children}</section>
    </Card>
  );
};
