import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "./hooks/useAuth";

export const LoginLayout = () => {
  const { user } = useAuth();
  if (user?.email) {
    return <Navigate to="/home" />;
  }
  return <div><Outlet /></div>;
};