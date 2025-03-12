export const PostTags = {
  ai: "Ai",
  ansible: "Ansible",
  apple: "Apple",
  automation: "Automation",
  iot: "IoT",
  misc: "Misc",
  music: "Music",
  network: "Network",
  photography: "Photography",
  programming: "Programming",
  short: "Short",
  studies: "Studies",
} as const;

export type PostTagMap = typeof PostTags;
export type PostTagType = PostTagMap[keyof PostTagMap];

export const allTags = Object.values(PostTags);
export const getTagLabel = (key: keyof PostTagMap) => PostTags[key];
