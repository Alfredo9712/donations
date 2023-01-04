import React from "react";
import { useQuery } from "react-query";
import { getUser } from "../src/fetchers/getUser";

export default function Home() {
  const { data: user, refetch, error, isLoading } = useQuery("user", getUser);

  return <h1>Donations</h1>;
}
