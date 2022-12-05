import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios, { AxiosError } from "axios";
import { IUser } from "../../types/IUser";

const apiUrl = "http://localhost:3000/api";

export const useAuthHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ message: string } | null>();
  // const { dispatch } = useAuthContext();

  const signUp = async (
    body: {
      name: string;
      email: string;
      password: string;
    },
    method: "login" | "register"
  ) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${apiUrl}/public/user/${method}`,
        body
      );
      const data: IUser = response.data;
      // dispatch({ type: "login", payload: data });
      setIsLoading(false);
    } catch (err) {
      const errors = err as Error | AxiosError;
      if (axios.isAxiosError(errors)) {
        setError(errors.response?.data as { message: string });
      }
    }
  };
  return {
    signUp,
    error,
    setError,
    isLoading,
  };
};
