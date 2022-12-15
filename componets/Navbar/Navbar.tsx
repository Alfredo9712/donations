import { Box, Flex, Image, ListItem, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useAuthContext } from "../../src/hooks/useAuthContext";

const NavBar = () => {
  const { user } = useAuthContext();
  return (
    <Box>
      <Flex alignItems={"center"} justifyContent="space-between">
        <Box>
          <Image
            src="/images/donations.png"
            alt="Donation logo"
            width={70}
            height={"auto"}
          />
        </Box>
        <Box>
          <UnorderedList
            display="flex"
            listStyleType={"none"}
            justifyContent="space-between"
          >
            {!user?._id ? (
              <Link href="/login">
                <ListItem marginX={3}>Login</ListItem>
              </Link>
            ) : (
              <ListItem>Logout</ListItem>
            )}
          </UnorderedList>
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar;
