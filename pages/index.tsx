import { Box } from "@chakra-ui/react";
import React from "react";
import { useAuthContext } from "../src/hooks/useAuthContext";

export default function Home() {
  const { user, isLoading } = useAuthContext();

  return <Box>Home</Box>;
}
