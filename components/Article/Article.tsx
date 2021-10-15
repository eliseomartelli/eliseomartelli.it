import React from "react";
import { Button } from "../Button/Button";
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
  const readMore = () => (
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

  const background = () => (
    <div
      className="-ml-8"
      style={{
        background:
          "linear-gradient(45deg, transparent 49%, #222 49% 51%, transparent 51%) , linear-gradient(-45deg, transparent 49%, #222 49% 51%, transparent 51%)",
        backgroundSize: "32px 32px",
        display: "block",
        position: "absolute",
        opacity: 0.25,
        width: "66%",
        height: "33%",
        zIndex: -1,
        top: 0,
      }}
    />
  );

  const Hero: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    if (props.hero) {
      return (
        <>
        <div className="pt-4 pl-8">
            {background()}
            <img
              src={
                props.image ||
                "https://eliseomartelli.it/static/aeb7d0061d695afcf54b40d74c79274f/f84cf/network-equipment-hardware-internet-data-server-communication-connection-datacenter.jpg"
              }
              className="max-h-80 w-full object-cover"
            />
          </div>
          <div>{children}</div>
          {readMore()}
        </>
      );
    } else {
      return <>{children}</>;
    }
  };

  const classList = ["prose relative"];

  return (
    <Link passHref href={props.href ?? "/"}>
      <a>
        <article className={classList.join(" ")}>
          <Hero>
            <h1>{props.title}</h1>
            <p>
              {props.date} - ⏳ {props.timeToRead} read
            </p>
            <p>{props.excerpt}</p>
          </Hero>
        </article>
      </a>
    </Link>
  );
};
