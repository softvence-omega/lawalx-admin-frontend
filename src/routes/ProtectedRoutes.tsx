import { useAppSelector } from "@/hooks/useRedux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }: { role: string[] }) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!role.includes(user?.role as string)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
