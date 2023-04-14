import { Card } from "@/components/Card";
import WidthLimit from "@/components/WidthLimit";
import { Metadata } from "next";
import Link from "next/link";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About - Eliseo Martelli",
};

interface Social {
  url: string;
  name: string;
  user: string;
}

const socials: Social[] = [
  {
    name: "Email",
    url: "mailto:me@eliseomartelli.it",
    user: "me@eliseomartelli.it",
  },
  {
    name: "GitHub",
    url: "https://github.com/eliseomartelli",
    user: "@eliseomartelli",
  },
  {
    name: "BeReal",
    url: "https://bere.al/eliseomartelli",
    user: "@eliseomartelli",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/eliseomartelli",
    user: "@eliseomartelli",
  },
  {
    name: "Mastodon",
    url: "https://mastodon.social/@eliseomartelli",
    user: "me@eliseomartelli.it",
  },
  {
    name: "Telegram",
    url: "https://t.me/eliseomartelli",
    user: "@eliseomartelli",
  },
  {
    name: "TikTok",
    url: "https://TikTok.com/@eliseo.martelli",
    user: "@eliseo.martelli",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/eliseomartelli",
    user: "@eliseomartelli",
  },
  {
    name: "Keyoxide",
    url: "https://keyoxide.org/me@eliseomartelli.it",
    user: "9560E7AF90F0E1B9",
  },
];

const About = () => {
  return (
    <WidthLimit>
      <h1 className="text-4xl font-bold">About</h1>
      <span className="prose w-full">
        <p className="mt-8">
          Hey, I&apos;m Eliseo. A computer science student passionate about
          networking and high performance computing.
          <br />
          I&apos;m also interested in art, photography, design and music.
        </p>
        <h2>Socials and Contacts</h2>
      </span>
      <div className="not-prose grid grid-cols-2 md:grid-cols-3 gap-4 w-full mt-6">
        {socials.map((social, i) => (
          <Link href={social.url} key={i}>
            <Card hoverable>
              <h4 className="font-bold">{social.name}</h4>
              <p className="break-words">{social.user}</p>
            </Card>
          </Link>
        ))}
      </div>

      <section className="prose mt-12">
        <h2>Experiences</h2>
        <p>
          Here you can see a condensation of my work and study experiences. You
          can also find my ongoing personal projects on my GitHub profile or in
          my personal public-facing pages.
        </p>
        <h3>Work</h3>
        <Timeline>
          {workExperiences.map((work, i) => (
            <TimelineElement {...work} key={i} />
          ))}
        </Timeline>
        <h3>Studies</h3>
        <Timeline>
          {studies.map((study, i) => (
            <TimelineElement {...study} key={i} />
          ))}
        </Timeline>
      </section>
    </WidthLimit>
  );
};

export default About;

export interface TimelineElementProps {
  from: string;
  to: string;
  what: string;
  where: string;
  key?: number;
}

const workExperiences: TimelineElementProps[] = [
  {
    from: "2017",
    to: "2018",
    what: "Network Technician",
    where: "Dedalonet S.r.l, Lanciano, Italy",
  },
  {
    from: "2013",
    to: "2017",
    what: "Android Developer",
    where: "~1M downloads on Google Play Store",
  },
  {
    from: "2011",
    to: "Ongoing",
    what: "Freelance Software Developer",
    where: "Client projects ranging from websites to hardware devices",
  },
];

const studies: TimelineElementProps[] = [
  {
    from: "2019",
    to: "Ongoing",
    what: "Computer Science Bachelor Degree",
    where: "Università degli Studi di Torino, Turin, Italy",
  },
  {
    from: "2012",
    to: "2017",
    what: "Telecomunications and Computer Science Degree",
    where: "IIS Da Vinci-De Giorgio, Lanciano, Italy",
  },
];

function TimelineElement({
  from,
  to,
  what,
  where,
}: TimelineElementProps): JSX.Element {
  return (
    <li className="relative">
      <div className="absolute w-4 h-4 bg-gray-800 rounded-full -left-2 border border-white top-1/2 -translate-y-1/2"></div>
      <div className="ml-6">
        <time className="text-xs">
          {from} - {to}
        </time>
        <p className="font-bold text-lg">{what}</p>
        <p>{where}</p>
      </div>
    </li>
  );
}

const Timeline = ({ children }: { children?: ReactNode[] | ReactNode }) => (
  <ul className="border-l border-gray-800 relative flex flex-col gap-4 not-prose list-none p-0 ml-4">
    {children}
  </ul>
);
