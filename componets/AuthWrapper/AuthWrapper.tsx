import { ReactNode } from "react";

import useGetUser from "../../src/hooks/useGetUser";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { user } = useGetUser();
  console.log(user);
  return { children };
};

export default AuthWrapper;
