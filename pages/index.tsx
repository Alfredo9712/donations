import { Box, Flex, UnorderedList, ListItem } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

import { useAuthContext } from "../src/hooks/useAuthContext";

const navItems = ["Login"];

export default function Home() {
  const { user, isLoading } = useAuthContext();

  return (
    <Box>
      <Flex alignItems={"center"} justifyContent="space-between">
        <Box>
          <Image
            src="/images/donations.png"
            alt="Donation logo"
            width={70}
            height={70}
          />
        </Box>

        <Box>
          <UnorderedList
            display="flex"
            listStyleType={"none"}
            justifyContent="space-between"
          >
            <ListItem>Home</ListItem>
            <ListItem marginX={3}>Login</ListItem>
            <ListItem>Logout</ListItem>
          </UnorderedList>
        </Box>
      </Flex>
    </Box>
  );
}
