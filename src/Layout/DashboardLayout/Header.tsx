import { useRef, useEffect, useState } from "react";
import { Search, Bell, X, Plus, PanelLeftClose, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router-dom";
import { useGetUser } from "@/hooks/useGetUser";

interface HeaderProps {
  toggleSidebar: () => void;
  isCollapsed: boolean;
}

const Header = ({ toggleSidebar, isCollapsed }: HeaderProps) => {
  const { name } = useGetUser();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mockNotifications = [
    {
      id: 1,
      title: "New client registered",
      message: "Acme Corp has joined your platform",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "System maintenance",
      message: "Scheduled maintenance tonight at 2 AM",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Payment received",
      message: "$2,500 payment from TechStart Inc",
      time: "3 hours ago",
      unread: true,
    },
    {
      id: 4,
      title: "Alert resolved",
      message: "Server performance issue has been fixed",
      time: "1 day ago",
      unread: false,
    },
  ];
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      )
        setShowNotifications(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, unread: false } : notif,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, unread: false })),
    );
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="top-0 z-50 sticky flex justify-between items-center gap-2 md:gap-6 bg-white px-4 md:px-6 border-gray-200 border-b h-16 md:h-24">
      {/* Left Side: Search */}
      <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="flex-shrink-0 hover:bg-gray-100 text-gray-500 transition-colors"
        >
          {isCollapsed ? (
            <PanelLeft className="w-5 md:w-6 h-5 md:h-6" />
          ) : (
            <PanelLeftClose className="w-5 md:w-6 h-5 md:h-6" />
          )}
        </Button>
        <div className="min-w-0">
          <h1 className="font-semibold text-gray-900 text-lg md:text-2xl truncate">
            Hi, {name} 👋
          </h1>
          <p className="hidden md:block mt-1 text-gray-600 text-sm truncate">
            This is dashboard overview of your Theta analyzers
          </p>
        </div>
      </div>

      <div className="hidden lg:block relative w-64 xl:w-96">
        <span className="left-0 absolute inset-y-0 flex items-center pl-3">
          <Search className="w-4 h-4 text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-50 py-2 pr-4 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 w-full text-sm transition-all"
        />
      </div>

      {/* Right Side: Actions & Profile */}
      <div className="flex flex-shrink-0 items-center gap-1 md:gap-4">
        <div className="lg:hidden">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Search className="w-5 h-5" />
          </Button>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative hover:bg-gray-100 p-2 md:p-3 border border-gray-200 rounded-lg text-gray-500 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="-top-1 -right-1 absolute flex justify-center items-center bg-red-500 rounded-full w-4 md:w-5 h-4 md:h-5 text-[10px] text-white md:text-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <Card className="top-12 md:top-20 right-0 md:right-0 z-50 absolute bg-white shadow-xl border border-gray-200 rounded-lg w-[calc(100vw-2rem)] md:w-96">
              <CardContent className="p-0">
                {/* Header */}
                <div className="flex justify-between items-center px-4 md:px-6 py-4 border-gray-200 border-b">
                  <h3 className="font-semibold text-gray-800 text-base md:text-lg">
                    Notifications
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-[10px] text-gray-500 hover:text-gray-700 md:text-xs"
                    >
                      Mark all read
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowNotifications(false)}
                      className="w-8 h-8"
                    >
                      <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                    </Button>
                  </div>
                </div>

                {/* Notification List */}
                <div className="divide-y divide-gray-200 max-h-[60vh] md:max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex flex-col p-4 cursor-pointer transition-colors duration-200 rounded-lg mx-2 my-1 ${
                        notification.unread ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-800 text-sm">
                          {notification.title}
                        </p>
                        {notification.unread && (
                          <Badge
                            variant="secondary"
                            className="bg-blue-500 p-0 rounded-full w-2 h-2"
                          />
                        )}
                      </div>
                      <p className="mt-1 text-gray-600 text-sm">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-gray-400 text-xs">
                        {notification.time}
                      </p>
                    </div>
                  ))}

                  {notifications.length === 0 && (
                    <p className="py-4 text-gray-400 text-sm text-center">
                      No notifications
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <div className="block bg-gray-200 mx-1 md:mx-2 w-[1px] h-8"></div>
        <NavLink to="/admin/clients/addClient" className="block">
          <Button
            variant="default"
            size="lg"
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-[300ms] cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white" />
            <span className="hidden xl:inline">Add Client</span>
          </Button>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
