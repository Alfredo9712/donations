import React from "react";
import { Box, Flex, Image, ListItem, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";

const NavBar = () => {
  return (
    <Box>
      <Flex alignItems={"center"} justifyContent="space-between">
        <Box>
          <Link href="/">Donations</Link>
        </Box>
        <Box>
          <UnorderedList
            display="flex"
            listStyleType={"none"}
            justifyContent="space-between"
          ></UnorderedList>
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar;
