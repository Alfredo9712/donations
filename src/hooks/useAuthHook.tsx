import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios, { AxiosError } from "axios";
import { IUser } from "../../types/IUser";

const baseUrl = "http://localhost:3000/api";
export const useAuthHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ message: string } | null>();
  const { dispatch } = useAuthContext();
  const signUp = async (body: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${baseUrl}/public/user/register`,
        body
      );
      const data: IUser = response.data;
      dispatch({ type: "login", payload: data });
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
