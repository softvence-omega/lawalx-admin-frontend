import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Breadcrumbs from "./Breadcrumbs";
import { adminRoutes } from "@/routes/AdminRoutes";
import { useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import { supporterRoute } from "@/routes/SupporterRoutes";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);

  const ROLE = ["ADMIN", "SUPERADMIN"];
  const isSupporter = user?.role === "SUPPORTER";
  const isAdmin = ROLE.includes(user?.role as string);

  const firstPath = location.pathname.split("/")[1];
  const basePath = `/${firstPath}`;

  const config =
    isAdmin && firstPath === "admin"
      ? adminRoutes
      : isSupporter && firstPath === "supporter"
        ? supporterRoute
        : [];

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* 1. Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 z-[70] w-64 lg:relative lg:z-40 transition-all duration-300 ease-in-out transform
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "lg:w-20" : "lg:w-64"}
        `}
      >
        <Sidebar
          isCollapsed={isCollapsed}
          closeMobile={() => setIsMobileOpen(false)}
        />
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <Header toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
        <main className="p-4 md:p-6">
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
