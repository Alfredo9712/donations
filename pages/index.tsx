import React from "react";
import { useAuthContext } from "../src/hooks/useAuthContext";
import { Input, Box, Flex } from "@chakra-ui/react";

import styles from "../styles/Home.module.css";

export default function Home() {
  const { dispatch } = useAuthContext();

  return (
    <div className={styles.container}>
      <h1>Donations</h1>
      <h1>Test Context login here</h1>
      <Box>
        <Flex flexDirection={"column"}>
          <Box>
            <Input />
          </Box>
          <Box>
            <Input />
          </Box>
        </Flex>
      </Box>
    </div>
  );
}
