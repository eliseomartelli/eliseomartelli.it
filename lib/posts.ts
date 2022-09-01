import fs from "fs";
import matter from "gray-matter";
import { Frontmatter } from "../types/frontmatter";
import { Post } from "../types/post";

export function loadPosts(): Post[] {
  const files = loadPostFiles();
  return loadPostsByFile(files);
}

export function loadPostsByFile(fileNames: string[]): Post[] {
  const posts = fileNames.map((fileName) => {
    const slug = fileName.split(".")[0];
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontmatter, content } = matter(readFile);

    frontmatter.date = parseDate(frontmatter.date);

    return {
      slug,
      frontmatter: <Frontmatter>frontmatter,
      timeToRead: timeToRead(content),
    };
  });
  return posts.sort(
    ({ frontmatter }, { frontmatter: frontmatterB }) =>
      new Date(frontmatterB.date).getTime() -
      new Date(frontmatter.date).getTime()
  );
}

const WPM_READ = 200;

const timeToRead = (content: string): string => {
  return Math.round(content.split(" ").length / WPM_READ).toString();
};

export function loadPostFiles() {
  return fs.readdirSync("posts");
}

export function loadPostSlugs() {
  const files = loadPostFiles();
  return files.map((file) => file.split(".")[0]);
}

export function parseDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
