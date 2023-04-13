import { Post } from "contentlayer/generated";
import Link from "next/link";
import { CategoryTaglet } from "./Taglet";
import { dateFormatter } from "@/lib/dateFormatter";
import { pluralize } from "@/lib/pluralize";

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
  <Link href={url}>
    <article className="hover:bg-gray-100 p-4 -m-4 rounded-md">
      <BlogPostTitle title={title} date={date} timeToRead={timeToRead} />
      <p className="mt-2">{excerpt}</p>
      <TagRow tags={tags} />
    </article>
  </Link>
);

export const BlogPostTitle = ({
  title,
  timeToRead,
  date,
}: {
  title: string;
  timeToRead?: number;
  date: string;
}) => {
  const dateBar = timeToRead ? (
    <>
      {dateFormatter(date)} - ⏱️ {formatMinutesToRead(timeToRead)}
    </>
  ) : (
    <>{dateFormatter(date)}</>
  );
  return (
    <>
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-gray-500">{dateBar}</p>
    </>
  );
};

export const TagRow = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-2 mt-4">
    {tags.map((tag, i) => (
      <CategoryTaglet category={tag} key={i} />
    ))}
  </div>
);
