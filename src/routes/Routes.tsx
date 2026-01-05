import { createBrowserRouter } from "react-router-dom";
// import App from "../App";
import Login from "@/pages/Auth/Login";
import { adminRoutes } from "./AdminRoutes";
import NotFound from "@/pages/NotFound";
import { routesGenerator } from "@/utils/Generator/RoutesGenerator";
import DashboardLayout from "@/Layout/DashboardLayout/DashboardLayout";
import Overview from "@/pages/Admin/Overview/Overview";
import TwoStepVerification from "@/pages/Auth/TwoStepVerification";
import ResetPassword from "@/pages/Auth/ResetPassword";
import { supporterRoute } from "./SupporterRoutes";
import ProtectedRoute from "./ProtectedRoutes";
const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "verification",
        element: <TwoStepVerification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    element:<ProtectedRoute role={["ADMIN" , "SUPERADMIN"]} />,
    children: [
      {
        path:"/admin",
        element:<DashboardLayout/>,
        children:[
          ...routesGenerator(adminRoutes),
        ]
      },
    ],
  },
  {
    element:<ProtectedRoute role={["SUPPORTER"]} />,
    children:[
      {
        path:"/supporter",
        element:<DashboardLayout/>,
        children:[
          ...supporterRoute,
        ]
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
