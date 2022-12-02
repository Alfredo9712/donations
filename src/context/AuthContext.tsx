import React, { createContext, useContext, useReducer } from "react";
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
    default: {
      return state;
    }
  }
};

const AuthContextProvider = ({ children }: Children) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUserContect must be used within a UserProvider");
  }
  return { user: context.state.user, dispatch: context.dispatch };
};

export { AuthContextProvider, useUserContext };
