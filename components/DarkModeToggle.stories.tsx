import "tailwindcss/tailwind.css";
import { DarkModeToggle } from "./DarkModeToggle";

export default {
  title: "Components/DarkModeToggle",
  component: DarkModeToggle,
};


export const Normal = () => <DarkModeToggle theme={"light"}/>
export const Dark = () => <DarkModeToggle theme={"dark"}/>
