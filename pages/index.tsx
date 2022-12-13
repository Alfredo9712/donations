import React from "react";

import { Box, Flex, UnorderedList, ListItem } from "@chakra-ui/react";
import Image from "next/image";

import { useAuthContext } from "../src/hooks/useAuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const { user, isLoading } = useAuthContext();
  console.log(user);
  const router = useRouter();

  const handleHandleNavClick = () => {
    router.push("/login");
  };

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
            {!user._id ? (
              <ListItem marginX={3} pointerEvents="fill">
                <Link href={"/login"}>Login</Link>
              </ListItem>
            ) : (
              <ListItem marginX={3} onClick={handleHandleNavClick}>
                <Link href={"/"}>Logout</Link>
              </ListItem>
            )}
          </UnorderedList>
        </Box>
      </Flex>
    </Box>
  );
}
