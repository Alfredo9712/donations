import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../src/context/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
