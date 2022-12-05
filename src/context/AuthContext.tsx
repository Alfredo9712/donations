import React, { createContext, useReducer } from "react";
import {
  AuthAction,
  Children,
  Dispatch,
  AuthContextType,
} from "../../types/ContextTypes";
import { useQuery } from "react-query";
import { getUser } from "../fetchers/getUser";
import { IUser } from "../../types/IUser";

const AuthContext = createContext<{ user: IUser | undefined } | undefined>(
  undefined
);

const userReducer = (state: AuthContextType, action: AuthAction) => {
  switch (action.type) {
    case "login": {
      return {
        user: action.payload,
      };
    }
    case "signup": {
      return {
        user: action.payload,
      };
    }
    case "logout": {
      return {
        user: null,
      };
    }
    default: {
      return state;
    }
  }
};

const AuthContextProvider = ({ children }: Children) => {
  const { data: user, error: queryError } = useQuery("user", getUser);

  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });
  // console.log(state);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
export { AuthContext };
