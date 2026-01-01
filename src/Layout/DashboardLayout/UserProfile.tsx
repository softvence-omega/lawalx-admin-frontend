import { useState } from "react";
import { ChevronDown, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useRedux";
import { toast } from "sonner";
import { logOut } from "@/store/Slices/AuthSlice/authSlice";
import { useGetUser } from "@/hooks/useGetUser";

interface UserProfileButtonProps {
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  isCollapsed?: boolean;
}

export default function UserProfile({
  onProfileClick,
  onSettingsClick,
  isCollapsed,
}: UserProfileButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { name, role, profileImage } = useGetUser();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    try {
      dispatch(logOut());
      toast.success("Logout successful");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`h-auto mt-5 p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 focus:outline-none! focus-visible:outline-none! ${isCollapsed ? "w-12 px-1" : "p-3"}`}
        >
          <div className={`flex items-center justify-between w-full gap-3 ${isCollapsed ? "px-0 justify-center" : "px-3"}`}>
            {/* Profile Avatar */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={profileImage || "/placeholder.svg"}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User Info */}
              {!isCollapsed && (
                <div className="flex flex-col items-start text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-base font-medium text-gray-900 leading-none">
                      {name}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{role}</span>
                </div>
              )}
            </div>

            {/* Logout Icon */}
            {!isCollapsed && (
              <div className="ml-2 pl-2 border-l border-gray-400">
                <Power size={20} className="text-red-500" />
              </div>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56   mt-2 border border-[#E2E8F0] bg-white space-y-2 focus:outline-none focus-visible:outline-none"
      >
        <DropdownMenuItem
          onClick={onProfileClick}
          className="cursor-pointer focus:outline-none focus-visible:outline-none"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
              <img
                src={profileImage || "/placeholder.svg"}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{name}</span>
              <span className="text-xs text-gray-500">{role}</span>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="border border-[#E2E8F0] h-px" />

        <DropdownMenuItem onClick={onSettingsClick} className="cursor-pointer">
          Settings
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer">
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer">
          <Link to="/user-activity-log">Activity Log</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="border border-[#E2E8F0] " />

        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <Power className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
