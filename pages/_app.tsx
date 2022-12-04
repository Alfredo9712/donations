import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "../src/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
