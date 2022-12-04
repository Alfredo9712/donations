import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios, { AxiosError } from "axios";

const baseUrl = "http://localhost:3000/api";
export const useAuthHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();
  const { dispatch } = useAuthContext();
  const signUp = async (body: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/public/user/register`,
        body
      );
      console.log(response);
      //   if (response.status === 404) {

      //   }
    } catch (err) {
      const errors = err as Error | AxiosError;
      if (axios.isAxiosError(errors)) {
        setError(errors.response?.data);
      }
    }
  };
  return {
    signUp,
    error,
  };
};
