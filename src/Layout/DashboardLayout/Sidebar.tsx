import { useState } from "react";
import { Link, Navigate, NavLink, useLocation } from "react-router-dom";
import { adminRoutes } from "@/routes/AdminRoutes";
import { menuGenerator, MenuItem } from "@/utils/Generator/MenuGenerator";
import { Location } from "react-router-dom";
import UserProfile from "./UserProfile";
import { supporterRoute } from "@/routes/SupporterRoutes";
import { useAppSelector } from "@/hooks/useRedux";
import console from "console";
// Sub-component to handle recursive levels and isolated hover states
const NavItem = ({
  item,
  level,
  location,
  isCollapsed,
}: {
  item: MenuItem;
  level: number;
  location: Location;
  isCollapsed: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasChildren = !!item.children?.length;
  // Active route logic
  const isRouteActive = (item: MenuItem, currentPath: string): boolean => {
    if (item.index) {
      return currentPath === item.path;
    }
    if (item.path && currentPath.startsWith(item.path)) return true;
    if (item.children) {
      return item.children.some((child) => isRouteActive(child, currentPath));
    }

    return false;
  };

  const active = isRouteActive(item, location.pathname);
  const itemClasses = `flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-all duration-200 no-underline! text-gray-600 text-lg font-semibold
    ${
      active
        ? "bg-blue-500 text-white font-medium"
        : "text-blue-800 hover:bg-blue-50"
    } ${isCollapsed ? "justify-center px-2" : ""}`;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Parent / Leaf Link */}
      <NavLink
        to={item.path || "#"}
        title={isCollapsed ? item.label : ""}
        className={`${itemClasses} cursor-pointer whitespace-nowrap`}
      >
        <span
          className={`${
            isCollapsed ? "w-6 h-6 flex items-center justify-center" : ""
          }`}
        >
          {item.icon}
        </span>
        {!isCollapsed && (
          <span className="flex-1 uppercase no-underline!">{item.label}</span>
        )}
        {hasChildren && !isCollapsed && (
          <span
            className={`text-[10px] transition-transform duration-200 ${
              isHovered ? "rotate-90" : ""
            }`}
          >
            ▶
          </span>
        )}
      </NavLink>

      {/* Sub-menu: Renders only if hovered AND has children */}
      {hasChildren && isHovered && (
        <div
          className={`absolute left-full top-0 z-[100] pt-0 pl-2 animate-in fade-in slide-in-from-left-1 duration-150`}
          style={{ marginLeft: "-2px" }} // Slight overlap to prevent hover-gap flicker
        >
          {/* Invisible bridge */}
          <div className="absolute -left-2 top-0 h-full w-2" />

          <div className="w-52 p-1 bg-slate-50 border border-gray-200 shadow-2xl rounded-md">
            <div className="space-y-4">
              {item.children!.map((child) => (
                <NavItem
                  key={child.label + child.path}
                  item={child}
                  level={level + 1}
                  location={location}
                  isCollapsed={false} // Sub-menus are always expanded
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);
  const ROLE = ["ADMIN", "SUPERADMIN"]
  const menu = ROLE.includes(user?.role as string) && location.pathname.split("/")[1] === "admin" ? menuGenerator(adminRoutes, "/admin") : user?.role === "SUPPORTER" && location.pathname.split("/")[1] === "supporter" ? menuGenerator(supporterRoute, "/supporter") : [];
  if(menu.length === 0) return Navigate({to: "/unauthorized"});
  const groupedMenu = menu.reduce<Record<string, MenuItem[]>>((acc, item) => {
    const group = item.group || "General";
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
  return (
    <aside
      className={`h-screen bg-white text-gray-800 sticky top-0 z-40 flex flex-col transition-all duration-300 border-r border-gray-200 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div
        className={`p-4 h-24 text-xl font-bold flex items-center ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        <Link to="/" className="no-underline">
          {isCollapsed ? (
            <div className=" flex items-center justify-center text-white text-xs">
              <img src="/sitelogo.png" alt="" />
            </div>
          ) : (
            <img src="/sitelogo.png" alt="Logo" className="max-h-12" />
          )}
        </Link>
      </div>

      <nav
        className={`p-2 my-5 space-y-10 flex-1 overflow-y-visible overflow-x-visible ${
          isCollapsed ? "px-2" : ""
        }`}
      >
        {Object.entries(groupedMenu).map(([group, items], index, arr) => (
          <div key={group}>
            {!isCollapsed && (
              <p className="px-3 mb-2 text-xs font-semibold capitalize text-gray-500 tracking-widest">
                {group}
              </p>
            )}
            <div className="space-y-2">
              {items.map((item) => (
                <NavItem
                  key={item.label + item.path}
                  item={item}
                  level={0}
                  location={location}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
            {/* Divider */}
            {index !== arr.length - 1 && !isCollapsed && (
              <div className="my-6 border-t border-gray-200" />
            )}
            {index !== arr.length - 1 && isCollapsed && (
              <div className="my-4 border-t border-gray-100 mx-2" />
            )}
          </div>
        ))}
      </nav>
      <div
        className={`mt-auto p-4 border-t border-gray-200 ${
          isCollapsed ? "px-2" : ""
        }`}
      >
        <UserProfile isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
};

export default Sidebar;
