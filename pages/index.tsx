import React, { useState } from "react";
import { useAuthContext } from "../src/hooks/useAuthContext";
import { Input, Box, Flex } from "@chakra-ui/react";

import styles from "../styles/Home.module.css";

export default function Home() {
  const { dispatch } = useAuthContext();
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  console.log(user);
  return (
    <div className={styles.container}>
      <h1>Donations</h1>
      <h1>Test Context login here</h1>
      <Box>
        <Flex flexDirection={"column"}>
          <Box>
            <Input
              placeholder="Name"
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
            />
          </Box>
          <Box>
            <Input
              placeholder="Email"
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
            />
          </Box>
          <Box>
            <Input
              placeholder="Password"
              type={"password"}
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
            />
          </Box>
        </Flex>
      </Box>
    </div>
  );
}
