import { GetServerSidePropsContext } from "next";
import { BOLD, ITALIC, RESET } from "../../lib/cli/colors";
import { page } from "../../lib/cli/page";
import { studies, TimelineElementProps, workExperiences } from "../about";

const buildExperienceString = (experience: TimelineElementProps) =>
  `
 - ${experience.from} - ${experience.to}
   ${BOLD}${experience.what}${RESET}
   ${ITALIC}${experience.where}${RESET}
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
    .join("");

  const studiesString = studies
    .map((work) => buildExperienceString(work))
    .join("");

  const content = `
${BOLD}Work Experience${RESET}
${workString}

${BOLD}Studies${RESET}
${studiesString}
`;

  res.write(page(content, "Resumé"));
  res.end();
  return { props: {} };
}

export default function _() {
  return null;
}
