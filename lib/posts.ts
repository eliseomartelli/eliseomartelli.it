import fs from "fs";
import matter from "gray-matter";

export function loadPosts() {
  const files = loadPostSlugs();
  // get frontmatter & slug from each post
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontmatter, content } = matter(readFile);

    const [year, month, date] = fileName.split("-");

    return {
      slug,
      frontmatter,
      date: `${year}-${month}-${date}`,
      timeToRead: timeToRead(content),
    };
  });
  return posts;
}

const timeToRead = (content: string) => {
  return Math.round(content.split(" ").length / 200);
};

export function loadPostSlugs() {
  const files = fs.readdirSync("posts").reverse();
  return files;
}
