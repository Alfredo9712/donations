import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "../src/context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthContextProvider>
  );
}
