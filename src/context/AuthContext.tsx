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
    }
  | undefined
>(undefined);

const AuthContextProvider = ({ children }: Children) => {
  const { data: user, refetch, error } = useQuery("user", getUser);
  console.log(user);
  return (
    <AuthContext.Provider value={{ user, refetch, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export { AuthContext };
