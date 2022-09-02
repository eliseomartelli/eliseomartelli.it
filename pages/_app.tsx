import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ModalProvider } from "../providers/Modal";
import { ThemeProvider } from "../providers/Theme";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </ThemeProvider>
  );
}

export default MyApp;
