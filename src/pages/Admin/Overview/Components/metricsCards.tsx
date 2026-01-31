"use client";

import {
  CircleCheckBig,
  ClockAlert,
  Files,
  FileWarning,
  Folders,
  Radio,
  TrendingUp,
} from "lucide-react";
import * as React from "react";
import { FaChartPie, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const metricsData = [
  {
    id: 1,
    title: "Total Sales",
    value: "$2150k",
    growth: "+5%",
    growth_type: "up",
    description: "$80k+ Sales growth",
    icon: "Chart",
    icon_bg_color: "#0266F3",
    link_text: "View report",
  },
  {
    id: 2,
    title: "Monthly Recurring Revenue",
    value: "850",
    growth: "+2%",
    growth_type: "up",
    description: "150 New user joined",
    icon: "LiveProject",
    icon_bg_color: "#169E7B",
    link_text: "View report",
  },
  {
    id: 3,
    title: "Client Retention Rate",
    value: "92.2%",
    growth: "+11%",
    growth_type: "up",
    description: "5 new clients joined",
    icon: "Users",
    icon_bg_color: "#7E3AF2",
    link_text: "View report",
  },
  {
    id: 4,
    title: "Client Churn Rate",
    value: "7.8%",
    growth: "2%",
    growth_type: "down",
    description: "50 Clients left",
    icon: "SubmissionOverdue",
    icon_bg_color: "#DC2626",
    link_text: "View report",
  },
  {
    id: 5,
    title: "Net Promoter Score",
    value: "75",
    growth: "+5%",
    growth_type: "up",
    description: "25 score growth",
    icon: "Check",
    icon_bg_color: "#D97706",
    link_text: "View report",
  },
];

export function MetricsCards() {
  const IconCollection: Record<string, React.ReactNode> = {
    FolderIcon: <Folders />,
    LiveProject: <Radio />,
    PendingReview: <FileWarning />,
    SubmissionOverdue: <ClockAlert />,
    ProjectInDraft: <Files />,
    Check: <CircleCheckBig />,
    Users: <FaUsers />,
    Chart: <FaChartPie />,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
      {metricsData?.map((item) => {
        const {
          title,
          value,
          growth = "",
          description,
          growth_type,
          link_text,
          icon,
          icon_bg_color,
        } = item;

        const IconElement = Object.keys(IconCollection).includes(icon as string)
          ? IconCollection[icon as string]
          : null;

        const isNetPromoter = title === "Net Promoter Score";

        return (
          <div
            key={item.id}
            className={`${
              isNetPromoter ? "md:col-span-2 lg:col-span-2 xl:col-span-1" : ""
            }`}
          >
            <div
              className={`${
                growth_type === "up"
                  ? "bg-[#EBFFF2] text-green-600"
                  : "bg-[#FDF4F5] text-red-600"
              }  bg-[#EBFFF2] rounded-lg flex flex-col justify-between border border-[#CAD2DB] transform transition-transform duration-300 hover:scale-102`}
            >
              <div className="bg-white shadow-xs shadow-gray-100 rounded-lg p-5 ">
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="p-2 border border-[#CAD2DB] rounded-xl text-[28px] text-white flex items-center justify-center h-12 w-12"
                    style={{ backgroundColor: icon_bg_color }}
                  >
                    {IconElement}
                  </div>

                  <h3 className="text-gray-700 font-semibold text-lg">
                    {title}
                  </h3>
                </div>

                {/* Value and growth */}
                <div className="flex items-center justify-between overflow-hidden">
                  <span className="text-3xl font-medium text-gray-900 w-2/3 overflow-hidden">
                    {value}
                    {title === "Overdue" && "%"}
                  </span>

                  {growth && (
                    <span
                      className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded ${
                        growth_type === "up"
                          ? "bg-green-100 text-[#169E7B]"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {growth}
                      <TrendingUp className=" size-4" />
                    </span>
                  )}
                </div>
              </div>
              {/* Description & Link */}
              <div className="flex items-center justify-between text-sm text-gray-700 px-6 py-4">
                <>
                  <span className="">{description && description}</span>
                  <Link
                    to={`#`}
                    className="text-blue-500 no-underline font-medium"
                  >
                    {link_text} &rarr;
                  </Link>
                </>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
