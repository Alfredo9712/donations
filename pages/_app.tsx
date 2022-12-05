import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "../src/context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
