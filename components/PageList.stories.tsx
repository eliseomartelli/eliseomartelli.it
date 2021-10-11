import "tailwindcss/tailwind.css";
import { PageList } from "./PageList";

export default {
  title: "Components/PageList",
  component: PageList,
};


const pages = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "This is a long title", href: "/long" },
];

export const Normal = () => <PageList pages={pages} current="/" />
export const Long = () => <PageList pages={pages} current="/long" />
export const Vertical = () => <PageList isVertical pages={pages} current="/" />
