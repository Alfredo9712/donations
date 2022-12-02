import React from "react";
import { useUserContext } from "../src/context/AuthContext";

import styles from "../styles/Home.module.css";

export default function Home() {
  const { dispatch } = useUserContext();

  return (
    <div className={styles.container}>
      <h1>Donations</h1>
      <h1>Test Context login here</h1>
      <button onClick={() => dispatch({ type: "login" })}>Login</button>
    </div>
  );
}
