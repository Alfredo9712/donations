import { ReactNode } from "react";
import { IUser } from "./IUser";

export type AuthAction =
  | { type: "login"; payload: IUser }
  | { type: "logout" }
  | { type: "signup"; payload: IUser };
export type Children = { children: ReactNode };
export type Dispatch = (action: AuthAction) => void;
export type AuthContextType = {
  user: IUser | null;
};
