import React, { createContext, useReducer } from "react";
import {
  Action,
  Children,
  Dispatch,
  UserContext,
} from "../../types/ContextTypes";

const AuthContext = createContext<
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
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });
  console.log(state);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
