import "tailwindcss/tailwind.css";
import { Toolbar } from "../components/Toolbar.tsx";
import useDarkMode from "../utils/useDarkMode.tsx";

function MyApp({ Component, pageProps }) {
  const [theme, toggleTheme] = useDarkMode();
  return (
    <div className={theme}>
      <div className="flex flex-col min-h-screen">
        <Toolbar toggleTheme={toggleTheme} theme={theme} />

        <div className="max-w-6xl w-full px-4 mx-auto min-h-screen flex-grow">
          <Component {...pageProps} />
        </div>
        <footer className="mt-4 py-4 px-4 w-screen bg-gray-100">
          <div className="max-w-6xl mx-auto flex">
            <p className="flex-grow">
              © 2015-{new Date().getFullYear()} - Eliseo Martelli
            </p>
            <a
              className="text-red-500 underline hover:text-red-800"
              href="https://github.com/eliseomartelli/eliseomartelli.it"
              target="_blank"
            >
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default MyApp;
