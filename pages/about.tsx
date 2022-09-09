import Container from "../components/Container";

export default function About(): JSX.Element {
  return (
    <Container customMeta={{ title: "About - Eliseo Martelli" }}>
      <h1>About</h1>
      <article className="prose">
        <h3>Links</h3>
        <ul>
          <li>
            <a
              href="https://twitter.com/eliseomartelli"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/eliseomartelli"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://github.com/eliseomartelli"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            E-mail:{" "}
            <a
              href="mailto:me@eliseomartelli.it"
              target="_blank"
              rel="noopener noreferrer"
            >
              me@eliseomartelli.it
            </a>
          </li>
        </ul>
        <h3 className="text-xl font-bold">Work</h3>
        <div className="pl-2">
          <ul className="border-l border-gray-800 relative flex flex-col gap-4 mb-8 list-none p-0 m-0 not-prose">
            {workExperiences.map((work, i) => (
              <TimelineElement {...work} key={i} />
            ))}
          </ul>
        </div>
        <h3 className="text-xl font-bold">Studies</h3>
        <div className="pl-2">
          <ul className="border-l border-gray-800 relative flex flex-col gap-4 not-prose list-none p-0">
            {studies.map((work, i) => (
              <TimelineElement {...work} key={i} />
            ))}
          </ul>
        </div>
      </article>
    </Container>
  );
}

export interface TimelineElementProps {
  from: string;
  to: string;
  what: string;
  where: string;
  key?: number;
}

export const workExperiences: TimelineElementProps[] = [
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

export const studies: TimelineElementProps[] = [
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
