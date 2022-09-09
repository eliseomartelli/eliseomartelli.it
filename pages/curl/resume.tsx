import { GetServerSidePropsContext } from "next";
import { BOLD, HIGHLIGHT, ITALIC, RESET } from ".";
import { studies, TimelineElementProps, workExperiences } from "../about";

const buildExperienceString = (experience: TimelineElementProps) =>
  ` - ${experience.from} - ${experience.to}
   ${BOLD}${experience.what}${RESET}
   ${ITALIC}${experience.where}${RESET}
${RESET}
`;

export async function getServerSideProps({
  res,
  req,
}: GetServerSidePropsContext) {
  if (!req.headers["user-agent"]?.includes("curl")) {
    res.writeHead(301, { Location: "/about" });
  }
  res.setHeader("Content-Type", "text");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );

  const workString = workExperiences
    .map((work) => buildExperienceString(work))
    .reduce((prev, curr) => prev + curr);

  const studiesString = studies
    .map((work) => buildExperienceString(work))
    .reduce((prev, curr) => prev + curr);

  const response = `
Eliseo Martelli ${RESET}${HIGHLIGHT} Resumé ${RESET}

${BOLD}Work Experience${RESET}

${workString}
${BOLD}Studies${RESET}

${studiesString}
${RESET}`;

  res.write(response);
  res.end();

  return {
    props: {},
  };
}

export default function RSSFeed() {
  return null;
}
