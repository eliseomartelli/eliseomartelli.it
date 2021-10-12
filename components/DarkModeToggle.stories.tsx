import "tailwindcss/tailwind.css";
import { DarkModeToggle } from "./DarkModeToggle";

export default {
  title: "Components/DarkModeToggle",
  component: DarkModeToggle,
};


var theme = "dark"

const toggleTheme = () => {
  theme = theme === 'dark' ? 'light' : 'dark' 
}

export const Normal = () => <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />;
