import Link from "next/link";
import Bio from "../components/Bio";
import Container from "../components/Container";
import { Newsletter } from "../components/Newsletter";
import { loadPostsByFile } from "../lib/posts";
import { Post } from "../types/post";

function Home({ featuredPosts }: { featuredPosts: Post[] }) {
  return (
    <Container>
      <Bio />
      <FeaturedPosts posts={featuredPosts} />
      <Newsletter />
    </Container>
  );
}

function FeaturedPosts({ posts }: FeaturedPostsProps): JSX.Element {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <h2 className="text-2xl font-bold">Featured Posts</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {posts.map((post, key) => (
          <Link href={`/blog/${post.slug}`} passHref key={key}>
            <a
              className="bg-gray-50 hover:bg-gray-200 rounded-md p-4 border"
              key={key}
            >
              <li className="flex flex-col justify-between gap-8 h-full">
                <h3 className="font-semibold">{post.frontmatter.title}</h3>
                <p>{post.frontmatter.date}</p>
              </li>
            </a>
          </Link>
        ))}
      </ul>
      <Link href="/blog" passHref>
        <a className="text-gray-400 hover:text-gray-900 transition-colors self-end">
          View all posts →
        </a>
      </Link>
    </div>
  );
}

export async function getStaticProps() {
  const featured = ["ipados_review.md", "nebula.md", "iot-vlan-edgeos.md"];
  return {
    props: {
      featuredPosts: loadPostsByFile(featured),
    },
  };
}

interface FeaturedPostsProps {
  posts: Post[];
}

export default Home;
