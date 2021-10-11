import "tailwindcss/tailwind.css";
import { Toolbar } from "../components/toolbar.tsx";
import useDarkMode from "../utils/useDarkMode.tsx";

function MyApp({ Component, pageProps }) {
  const [theme, toggleTheme] = useDarkMode();
  return (
    <div className={`${theme}`}>
      <Toolbar toggleTheme={toggleTheme} theme={theme} />
      <div className="max-w-6xl px-4 mx-auto">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
