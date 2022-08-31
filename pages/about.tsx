import Container from "../components/Container";

export default function About(): JSX.Element {
  return (
    <Container>
      <div>
        <h3 className="text-xl font-bold mb-4">Work</h3>
        <ol className="border-l border-gray-800 relative flex flex-col gap-4">
          <TimelineElement
            from="2011"
            to="Ongoing"
            what="Freelance software developer"
            where="Client projects ranging from websites to hardware devices"
          />
          <TimelineElement
            from="2013"
            to="2017"
            what="Android developer"
            where="~1M downloads on Google Play Store"
          />
          <TimelineElement
            from="2017"
            to="2018"
            what="Network Technician"
            where="Dedalonet SRL, Lanciano, Italy"
          />
        </ol>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Studies</h3>
        <ol className="border-l border-gray-800 relative flex flex-col gap-4">
          <TimelineElement
            from="2012"
            to="2017"
            what="Telecomunications and Computer Science Degree"
            where="IIS Da Vinci-De Giorgio, Lanciano, Italy"
          />
          <TimelineElement
            from="2019"
            to="Ongoing"
            what="Computer Science Bachelor Degree"
            where="Università degli Studi di Torino, Turin, Italy"
          />
        </ol>
      </div>
    </Container>
  );
}

interface TimelineElementProps {
  from: string;
  to: string;
  what: string;
  where: string;
}

function TimelineElement({
  from,
  to,
  what,
  where,
}: TimelineElementProps): JSX.Element {
  return (
    <li className="relative">
      <div className="absolute w-4 h-4 bg-gray-800 rounded-full -left-2 border border-white top-1/2 -translate-y-1/2"></div>
      <div className="ml-4">
        <time className="text-xs">
          {from} - {to}
        </time>
        <p className="font-bold text-lg">{what}</p>
        <p>{where}</p>
      </div>
    </li>
  );
}
