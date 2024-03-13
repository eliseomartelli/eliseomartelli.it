import { allTimelines } from "@/.contentlayer/generated";
import { allSocials } from "@/.contentlayer/generated/index.mjs";
import { Article } from "@/components/Article";
import { Card } from "@/components/Card";
import { PageLayout } from "@/components/PageLayout";
import {
  Timeline,
  TimelineElement,
  TimelineElementProps,
} from "@/components/Timeline";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "About - Eliseo Martelli",
};

const About = () => {
  const [socialsJson] = allSocials;
  const [timelinesYaml] = allTimelines;
  const { timelines } = timelinesYaml;
  return (
    <PageLayout routes={[{ name: "About", href: "/about" }]}>
      <Article>
        <p>
          Hey, I&apos;m Eliseo. A computer science student passionate about
          networking and high performance computing.
          <br />
          I&apos;m also interested in art, photography, design and music.
        </p>
        <h2>Socials and Contacts</h2>
        <div className="not-prose grid grid-cols-2 md:grid-cols-3 gap-4 w-full mt-6">
          {socialsJson.socials.map((social, i) => (
            <Link href={social.url} key={i}>
              <Card hoverable>
                <h3 className="font-bold">{social.name}</h3>
                <p className="break-words text-sm">{social.user}</p>
              </Card>
            </Link>
          ))}
        </div>
        <section className="prose mt-12">
          <h2>Experiences</h2>
          <p>
            Here you can see a condensation of my work and study experiences.
            You can also find my ongoing personal projects on my GitHub profile
            or in my personal public-facing pages.
          </p>
          {timelines!.map((timeline) => (
            <>
              <h3>{timeline.title}</h3>
              <Timeline>
                {timeline!.events!.map((event, i) => {
                  return (
                    <TimelineElement
                      key={i}
                      {...(event as TimelineElementProps)}
                    />
                  );
                })}
              </Timeline>
            </>
          ))}
        </section>
      </Article>
    </PageLayout>
  );
};

export default About;
