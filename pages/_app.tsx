import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ModalProvider } from "../providers/Modal";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>
  );
}

export default MyApp;
