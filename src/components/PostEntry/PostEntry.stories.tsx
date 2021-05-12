import React from "react";

import { Meta } from "@storybook/react";

import { PostEntry } from "./PostEntry";

export default {
  title: "Components/PostEntry",
  component: PostEntry,
} as Meta;

const post = {
  title: "Hello, world!",
  excerpt:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, similique. Quia quis maiores perferendis quas magni, sapiente vero architecto atque fugit similique eius provident nemo ipsum quae accusantium eveniet numquam?",
  timeToRead: 5,
  date: "October 20, 2020",
};

const noTimeToRead = { ...post };
noTimeToRead.timeToRead = null;

export const Primary: React.VFC<{}> = () => <PostEntry {...post} />;

export const NoTimeToRead: React.VFC<{}> = () => (
  <PostEntry {...noTimeToRead} />
);
