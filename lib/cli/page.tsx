import { BOLD, HIGHLIGHT, RESET } from "./colors";

export function page(
  content: string,
  title?: string,
  siteTitle = "Eliseo Martelli"
) {
  const header = title
    ? `${BOLD}${siteTitle} ${HIGHLIGHT + BOLD} ${title} ${RESET}`
    : `${HIGHLIGHT + BOLD} Eliseo Martelli ${RESET}`;
  return `${header}

${content}
${RESET}`;
}
