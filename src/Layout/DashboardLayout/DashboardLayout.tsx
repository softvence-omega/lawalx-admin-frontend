import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Breadcrumbs from "./Breadcrumbs";
import { adminRoutes } from "@/routes/AdminRoutes";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 1. Fixed Sidebar */}
      <div className="z-90 border-r border-gray-200">
        <Sidebar />
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col max-w-full">
        <Header />
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
