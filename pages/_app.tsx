import React from "react";
import type { AppProps } from "next/app";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import Navbar from "../componets/Navbar";
import AuthWrapper from "../componets/AuthWrapper";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AuthWrapper>
          <Container maxW="1200px">
            <Navbar />
            <Component {...pageProps} />
          </Container>
        </AuthWrapper>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
