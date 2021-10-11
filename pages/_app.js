import "tailwindcss/tailwind.css";
import { Toolbar } from "../components/toolbar.tsx";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Toolbar />
      <div className="max-w-6xl px-4 mx-auto">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
