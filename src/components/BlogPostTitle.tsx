import { Post } from "@/.contentlayer/generated";
import { dateFormatter } from "@/lib/dateFormatter";
import { pluralize } from "@/lib/pluralize";
import moo from "@eliseomartelli/moo/dist";
import Balancer from "react-wrap-balancer";

const formatMinutesToRead = (minutes: number) =>
  pluralize(minutes, ["%d minute to read", "%d minutes to read"]);

export const BlogPostTitle = ({
  title,
  timeToRead,
  date,
  big,
}: Post & { big?: boolean }) => {
  const dateBar = timeToRead ? (
    <>
      {dateFormatter(date)} - ⏱️ {formatMinutesToRead(timeToRead)}
    </>
  ) : (
    <>{dateFormatter(date)}</>
  );
  return (
    <div>
      <h1
        className={moo(
          "font-bold",
          ["text-3xl font-serif", big],
          ["text-xl font-sans", !big],
        )}
      >
        <Balancer>{title}</Balancer>
      </h1>
      <p className="text-gray-500">{dateBar}</p>
    </div>
  );
};
