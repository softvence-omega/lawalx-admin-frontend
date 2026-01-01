import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const ProtectedRoute = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  // Check if the user is logged in and is an admin
  if (!user || user.role !== "ADMIN" || "SUPERADMIN" || "Client") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
