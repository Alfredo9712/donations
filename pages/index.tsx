import React from "react";
import { useAuthContext } from "../src/hooks/useAuthContext";

import styles from "../styles/Home.module.css";

export default function Home() {
  const { dispatch } = useAuthContext();

  return (
    <div className={styles.container}>
      <h1>Donations</h1>
      <h1>Test Context login here</h1>
      <button onClick={() => dispatch({ type: "login" })}>Login</button>
      <button onClick={() => dispatch({ type: "logout" })}>Logout</button>
    </div>
  );
}
