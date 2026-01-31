import {
  CircleCheckBig,
  ClockAlert,
  Files,
  FileWarning,
  Folders,
  Radio,
} from "lucide-react";
import * as React from "react";
import { FaChartPie, FaUsers } from "react-icons/fa";
import DashboardStatsCard from "@/components/Dashboard/DashboardStatsCard";

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
          <DashboardStatsCard
            key={item.id}
            className={
              isNetPromoter ? "md:col-span-2 lg:col-span-2 xl:col-span-1" : ""
            }
            title={title}
            value={value}
            growth={growth}
            growthType={growth_type as any}
            growthColor={growth_type === "up" ? "green" : "red"}
            description={description}
            descriptionType={growth_type === "up" ? "good" : "bad"}
            icon={IconElement}
            iconBgColor={icon_bg_color}
            link="#"
            linkText={link_text}
          />
        );
      })}
    </div>
  );
}
