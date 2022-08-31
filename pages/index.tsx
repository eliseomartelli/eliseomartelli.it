import type { NextPage } from "next";
import Link from "next/link";
import Bio from "../components/Bio";
import Container from "../components/Container";
import { Newsletter } from "../components/Newsletter";

const Home: NextPage = () => {
  return (
    <Container>
      <Bio />
      <FeaturedPosts
        posts={[
          { title: "Lorem Ipsum dolor sit amet" },
          { title: "Configuring Nebula, a simple overlay networking tool" },
          { title: "Wireguard VPN, welcome to the future" },
        ]}
      />
      <Newsletter />
    </Container>
  );
};

function FeaturedPosts({ posts }: FeaturedPostsProps): JSX.Element {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <h2 className="text-2xl font-bold">Featured Posts</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {posts.map((post, key) => (
          <li
            key={key}
            className="bg-gray-50 hover:bg-gray-200 rounded-md p-4 flex flex-col justify-between gap-8 border"
          >
            <h3 className="font-semibold">{post.title}</h3>
            <p>Aug 30, 2022</p>
          </li>
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

interface FeaturedPostsProps {
  posts: Post[];
}

interface Post {
  title: string;
}

export default Home;
