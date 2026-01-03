import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Breadcrumbs from "./Breadcrumbs";
import { adminRoutes } from "@/routes/AdminRoutes";
import { useState } from "react";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 1. Fixed Sidebar */}
      <div
        className={`z-90 border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
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
              <Breadcrumbs config={adminRoutes} basePath="/admin" />
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
