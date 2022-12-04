import { ReactNode } from "react";
import { IUser } from "./IUser";

export type Action = { type: "login"; payload: IUser } | { type: "logout" };
export type Children = { children: ReactNode };
export type Dispatch = (action: Action) => void;
export type AuthContextType = {
  user: IUser | null;
};
