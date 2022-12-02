import { ReactNode } from "react";
import { IUser } from "./IUser";

export type Action = { type: "login" } | { type: "logout" };
export type Children = { children: ReactNode };
export type Dispatch = (action: Action) => void;
export type UserContext = {
  user: IUser | null;
};
