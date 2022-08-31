import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Footer from "./Footer";
import Nav from "./Nav";

interface ContainerProps {
  children?: ReactNode;
  showTitle?: boolean;
}

interface MetaInformation {
  title?: string;
  description?: string;
  type?: string;
  date?: string;
}

export default function Container({ children }: ContainerProps): JSX.Element {
  const meta: MetaInformation = {
    title: "Eliseo Martelli - Developer",
    description:
      "Software developer, technology enthusiast, and photography lover.",
    type: "website",
  };
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8 min-h-screen">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <link
          rel="canonical"
          href={`https://eliseomartelli.it${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Eliseo Martelli" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        {/*<meta name="og:image" content={meta.image} />*/}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@leeerob" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        {/*<meta name="twitter:image" content={meta.image} />*/}
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <Nav />
      <main
        id="skip"
        className="flex flex-1 flex-col px-4 max-w-3xl w-full mx-auto gap-8"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
