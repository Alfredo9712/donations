import React, { ReactNode } from "react";

import useGetUser from "../../src/hooks/useGetUser";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  // useGetUser();

  return <>{children}</>;
};

export default AuthWrapper;
