import React from "react";
import { useUserContext } from "../src/context/UserContext";

import styles from "../styles/Home.module.css";

export default function Home() {
  const { user, dispatch } = useUserContext();
  console.log(user);
  return (
    <div className={styles.container}>
      <h1>Donations</h1>
      <h1>Test Context login here</h1>
    </div>
  );
}
