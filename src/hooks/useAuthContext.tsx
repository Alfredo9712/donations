import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUserContect must be used within a UserProvider");
  }
  return { user: context.state.user, dispatch: context.dispatch };
};
