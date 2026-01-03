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
const routes = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
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
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      ...routesGenerator(adminRoutes),
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
