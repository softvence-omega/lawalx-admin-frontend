import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Breadcrumbs from "./Breadcrumbs";
import { useState } from "react";
import { adminRoutes } from "@/routes/AdminRoutes";
import { supporterRoute } from "@/routes/SupporterRoutes";
// import { adminRoutes } from "@/routes/AdminRoutes";
// import { useAppSelector } from "@/hooks/useRedux";
// import { supporterRoute } from "@/routes/SupporterRoutes";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  // const user = useAppSelector((state) => state.auth.user);
  // const ROLE = ["ADMIN", "SUPERADMIN"];
  // const isSupporter = user?.role === "SUPPORTER";
  // const isAdmin = ROLE.includes(user?.role as string);

  const firstPath = location.pathname.split("/")[1];
  const basePath = `/${firstPath}`;
  console.log(basePath);
  const config = basePath === "/admin" ? adminRoutes : supporterRoute;

  // const config =
  //   isAdmin && firstPath === "admin"
  //     ? adminRoutes
  //     : isSupporter && firstPath === "supporter"
  //     ? supporterRoute
  //     : [];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 1. Fixed Sidebar */}
      <div
        className={`z-90 border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      >
        <Sidebar isCollapsed={isCollapsed} />
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col max-w-full bg-white">
        <Header toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
        <main className="p-6 overflow-y-auto">
          {/* Breadcrumbs (Optional) */}
          <div className="mb-6">
            <div className="flex items-center gap-2 space-y-2">
              <Breadcrumbs config={config} basePath={basePath} />
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
