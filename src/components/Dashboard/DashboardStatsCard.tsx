import { TrendingUp, TrendingDown } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface DashboardStatsCardProps {
  title: string;
  value: string | number;
  growth?: string;
  growthType?: "up" | "down";
  growthColor?: "green" | "red";
  description?: string;
  descriptionType?: "good" | "bad";
  icon: React.ReactNode;
  iconBgColor: string;
  link?: string;
  linkText?: string;
  className?: string;
}

const DashboardStatsCard: React.FC<DashboardStatsCardProps> = ({
  title,
  value,
  growth,
  growthType,
  growthColor = "green",
  description,
  descriptionType,
  icon,
  iconBgColor,
  link,
  linkText,
  className,
}) => {
  return (
    <div className={cn("h-full", className)}>
      <div
        className={cn(
          "h-full rounded-xl flex flex-col border border-[#CAD2DB] transform transition-transform duration-300 hover:scale-102",
          descriptionType === "good" ? "bg-[#EBFFF2]" : "bg-[#FDF4F5]"
        )}
      >
        <div className="bg-white shadow-xs shadow-gray-100 rounded-xl p-5">
          {/* Icon & Title */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="p-2.5 border border-[#CAD2DB] rounded-xl text-[24px] text-white flex items-center justify-center h-12 w-12"
              style={{ backgroundColor: iconBgColor }}
            >
              {icon}
            </div>
            <h3 className="text-gray-700 font-semibold leading-tight text-sm">
              {title}
            </h3>
          </div>

          {/* Value and growth */}
          <div className="flex items-center justify-between overflow-hidden">
            <span className="text-3xl font-semibold text-gray-900 overflow-hidden">
              {value}
            </span>

            {growth && (
              <span
                className={cn(
                  "flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded",
                  growthColor === "green"
                    ? "bg-[#D8F8E8] text-[#0F947E]"
                    : "bg-[#FDE7E9] text-[#E04B59]"
                )}
              >
                {growth}
                {growthType === "up" ? (
                  <TrendingUp className="size-3.5" />
                ) : (
                  <TrendingDown className="size-3.5" />
                )}
              </span>
            )}
          </div>
        </div>
        {/* Description & Link */}
        <div
          className={cn(
            "flex-grow flex items-center justify-between text-sm px-6 py-4",
            descriptionType === "good" ? "text-gray-500" : "text-gray-500"
          )}
        >
          <span className="font-medium text-[12px]">{description}</span>
          {link && (
            <Link to={link} className="text-blue-500 no-underline font-medium text-[12px]">
              {linkText || "View report"} &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStatsCard;
