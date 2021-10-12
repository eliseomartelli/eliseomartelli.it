import "tailwindcss/tailwind.css";
import { Toolbar } from "../components/Toolbar.tsx";
import { Footer } from "../components/Footer.tsx";
import useDarkMode from "../utils/useDarkMode.tsx";

const links = [
	{ title: "GitHub", href: "https://github.com/eliseomartelli" },
	{ title: "Twitter", href: "https://twitter.com/eliseomartelli" }
];

function MyApp({ Component, pageProps }) {
  const [theme, toggleTheme] = useDarkMode();
  return (
    <div className={theme}>
      <div className="flex flex-col min-h-screen">
        <Toolbar toggleTheme={toggleTheme} theme={theme} />
        <div className="max-w-6xl w-full px-4 mx-auto min-h-screen flex-grow">
          <Component {...pageProps} />
        </div>
        <Footer startYear="2015" title="Eliseo Martelli" links={links} />
      </div>
    </div>
  );
}

export default MyApp;
