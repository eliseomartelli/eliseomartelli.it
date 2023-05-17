import { Post } from "contentlayer/generated";
import Link from "next/link";
import { CategoryTaglet } from "./Taglet";
import { dateFormatter } from "@/lib/dateFormatter";
import { pluralize } from "@/lib/pluralize";
import { Balancer } from "react-wrap-balancer";
import moo from "@eliseomartelli/moo/dist";

const formatMinutesToRead = (minutes: number) =>
  pluralize(minutes, ["%d minute to read", "%d minutes to read"]);

export const BlogPostItem = ({
  title,
  date,
  timeToRead,
  tags,
  excerpt,
  url,
}: Post) => (
  <div className="hover:bg-gray-100 p-4 -m-4 rounded-md">
    <Link href={url}>
      <BlogPostTitle title={title} date={date} timeToRead={timeToRead} />
      <p className="mt-2">{excerpt}</p>
    </Link>
    <TagRow tags={tags} />
  </div>
);

export const BlogPostTitle = ({
  title,
  timeToRead,
  date,
  big,
}: {
  title: string;
  timeToRead?: number;
  date: string;
  big?: boolean;
}) => {
  const dateBar = timeToRead ? (
    <>
      {dateFormatter(date)} - ⏱️ {formatMinutesToRead(timeToRead)}
    </>
  ) : (
    <>{dateFormatter(date)}</>
  );
  return (
    <div>
      <h1 className={moo("font-bold", ["text-3xl", big], ["text-xl", !big])}>
        <Balancer>{title}</Balancer>
      </h1>
      <p className="text-gray-500">{dateBar}</p>
    </div>
  );
};

export const TagRow = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-2 mt-4">
    {tags.sort().map((tag, i) => (
      <Link href={`/blog/tags/${tag}`} key={i}>
        <CategoryTaglet category={tag} />
      </Link>
    ))}
  </div>
);
