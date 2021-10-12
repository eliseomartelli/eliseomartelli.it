import React from "react";
import { Button } from "./Button";
import Link from "next/link";

interface ArticleProps {
  title: string;
  timeToRead: string;
  date: string;
  excerpt: string;
  href: string;
  image?: string;
  hero?: boolean;
}

export const Article: React.FC<ArticleProps> = (props) => {
  const hero = () => {
    if (props.hero) {
      return (
        <Button isRed>
          <div className="flex justify-center items-center space-x-2">
            <span>Read More</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </Button>
      );
    } else {
      return <></>;
    }
  };
  return (
    <Link passHref href={props.href ?? "/"}>
      <a>
        <article className="prose">
          <h1>{props.title}</h1>
          <p>
            {props.date} - {props.timeToRead}
          </p>
          <p>{props.excerpt}</p>
          {hero()} 
        </article>
      </a>
    </Link>
  );
};
