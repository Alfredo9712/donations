import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

const baseUrl = "http://localhost:3000/api";
export const useAuthHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { dispatch } = useAuthContext();
  const signIn = async () => {
    const response = await axios.get(`${baseUrl}/public/user/register`);
    console.log(response);
  };
  return {
    signIn,
  };
};
