import React, { createContext, useReducer } from "react";
import {
  AuthAction,
  Children,
  Dispatch,
  AuthContextType,
} from "../../types/ContextTypes";

const AuthContext = createContext<
  { state: AuthContextType; dispatch: Dispatch } | undefined
>(undefined);

const userReducer = (state: AuthContextType, action: AuthAction) => {
  switch (action.type) {
    case "login": {
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

export default AuthContextProvider;
export { AuthContext };
