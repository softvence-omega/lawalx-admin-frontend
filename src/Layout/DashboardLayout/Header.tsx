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
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, unread: false }))
    );
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="h-24 border-b bg-white border-gray-200 flex items-center justify-between px-6 gap-6 sticky top-0 z-50">
      {/* Left Side: Search */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-gray-500 hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <PanelLeft className="w-6 h-6" />
          ) : (
            <PanelLeftClose className="w-6 h-6" />
          )}
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Good Morning, {name} 👋
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            This is dashboard overview of your Theta analyzers
          </p>
        </div>
      </div>
      <div className="relative w-96">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="w-4 h-4 text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="Search for products, orders..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
        />
      </div>

      {/* Right Side: Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-3 border border-gray-200 text-gray-500 hover:bg-gray-100 rounded-lg relative transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <Card className="absolute right-20 top-20 w-96 z-50 shadow-xl border border-gray-200 rounded-lg bg-white">
              <CardContent className="p-0">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <h3 className="font-semibold text-lg text-gray-800">
                    Notifications
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Mark all read
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowNotifications(false)}
                    >
                      <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    </Button>
                  </div>
                </div>

                {/* Notification List */}
                <div className="max-h-96 overflow-y-auto divide-y divide-gray-200">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex flex-col p-4 cursor-pointer transition-colors duration-200 rounded-lg mx-2 my-1 ${
                        notification.unread ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm text-gray-800">
                          {notification.title}
                        </p>
                        {notification.unread && (
                          <Badge
                            variant="secondary"
                            className="h-2 w-2 p-0 rounded-full bg-blue-500"
                          />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  ))}

                  {notifications.length === 0 && (
                    <p className="text-center text-gray-400 text-sm py-4">
                      No notifications
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        {<div className="h-8 w-[1px] bg-gray-200 mx-2"></div>}
        {
          <NavLink to="/admin/clients/addClient">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-[300ms]">
              <Plus className="h-4 w-4 text-white" />
              Add Client
            </Button>
          </NavLink>
        }
      </div>
    </header>
  );
};

export default Header;
