import { useQuery } from "react-query";
import { User } from "../../types/UserType";
import getUserFetcher from "../fetchers/getUser";

function useGetUser() {
  const {
    data: user,
    refetch,
    error,
    isLoading,
  } = useQuery<User>("user", getUserFetcher);

  if (user?._id) {
    return {
      user,
      refetch,
      error,
      isLoading,
    };
  }
}

export default useGetUser;
