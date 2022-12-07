import React, { createContext } from "react";
import { Children } from "../../types/ContextTypes";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from "react-query";
import { getUser } from "../fetchers/getUser";
import { IUser } from "../../types/IUser";

const AuthContext = createContext<
  | {
      user: IUser | undefined;
      refetch: <TPageData>(
        options?: RefetchOptions & RefetchQueryFilters<TPageData>
      ) => Promise<QueryObserverResult<any, unknown>>;
      error: unknown;
      isLoading: boolean;
    }
  | undefined
>(undefined);

const AuthContextProvider = ({ children }: Children) => {
  const { data: user, refetch, error, isLoading } = useQuery("user", getUser);
  console.log(user);
  return (
    <AuthContext.Provider value={{ user, refetch, error, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export { AuthContext };
