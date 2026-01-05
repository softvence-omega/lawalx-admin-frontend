import { useAppSelector } from "@/hooks/useRedux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({role}: {role: string[]}) => {
  const user = useAppSelector((state) => state.auth.user);
  console.log(user)
  console.log(role)
  console.log("Inside Protected Route")
  // Check if the user is logged in and is an admin
  if (!user || !role.includes(user?.role as string)) {
    console.log("User is not logged in or is not an admin");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
