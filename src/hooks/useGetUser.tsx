import { useQuery } from "react-query";
import getUserFetcher from "../fetchers/getUser";

function useGetUser() {
  const {
    data: user,
    refetch,
    error,
    isLoading,
  } = useQuery("user", getUserFetcher);

  return {
    user,
    refetch,
    error,
    isLoading,
  };
}

export default useGetUser;
