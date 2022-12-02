import React, { createContext, useContext, useReducer } from "react";
import {
  Action,
  Children,
  Dispatch,
  UserContext,
} from "../../types/ContextTypes";

const UserContext = createContext<
  { state: UserContext; dispatch: Dispatch } | undefined
>(undefined);

const userReducer = (state: UserContext, action: Action) => {
  switch (action.type) {
    case "login": {
      return {
        user: {
          name: "alfredo",
          email: "alfredo98.rm@gmail.com",
          password: "232",
        },
      };
    }
    default: {
      return state;
    }
  }
};

export const UserProvider = ({ children }: Children) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });
  console.log(state);
  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContect must be used within a UserProvider");
  }
  return context;
};

export default { UserProvider, useUserContext };
