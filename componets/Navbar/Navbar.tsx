import { Box, Flex, Image, ListItem, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <Box>
      <Flex alignItems={"center"} justifyContent="space-between">
        <Box>
          <Link href="/">
            <Image
              src="/images/donations.png"
              alt="Donation logo"
              width={70}
              height={"auto"}
            />
          </Link>
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
