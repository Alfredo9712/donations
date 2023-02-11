import React from "react";
import { Box, Flex, ListItem, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";
import useGetUser from "../../src/hooks/useGetUser";

const NavBar = () => {
  const { user } = useGetUser();

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
          >
            {user?._id ? (
              <ListItem>Logout</ListItem>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </UnorderedList>
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar;
