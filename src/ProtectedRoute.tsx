import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "./hooks/useAuth";

type Props = {
  // 
}

export const ProtectedRoute = ({ children }: PropsWithChildren<Props>) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};