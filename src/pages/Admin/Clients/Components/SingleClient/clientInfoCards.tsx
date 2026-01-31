import * as React from "react";
import { Users, TrendingUp, AlertTriangle, HardDrive } from "lucide-react";
import DashboardStatsCard from "@/components/Dashboard/DashboardStatsCard";

export interface Metrics {
  totalUsers: {
    current: number;
    total: number;
    percentage: number;
  };
  activePrograms: {
    current: number;
    newThisMonth: number;
  };
  criticalAlerts: {
    current: number;
    newIn24Hours: number;
  };
  storageUsage: {
    current: string;
    total: string;
    percentage: number;
  };
}

interface MetricsProps {
  metrics: Metrics;
}

const ClientInfoCards: React.FC<MetricsProps> = ({ metrics }) => {
  const cardsData = [
    {
      id: 1,
      title: "Total User",
      value: `${metrics?.totalUsers?.current || 0}/${metrics?.totalUsers?.total || 0}`,
      growth: `${metrics?.totalUsers?.percentage || 0}%`,
      growth_type: "up",
      description: "of capacity used",
      icon: <Users />,
      icon_bg_color: "#169E7B",
      link_text: "View Details",
    },
    {
      id: 2,
      title: "Active Program",
      value: `${metrics?.activePrograms?.current || 0}`,
      growth: `${metrics?.activePrograms?.newThisMonth || 0}`,
      growth_type: "up",
      description: "new Program in this month",
      icon: <TrendingUp />,
      icon_bg_color: "#0266F3",
      link_text: "View Details",
    },
    {
      id: 3,
      title: "Critical Alerts",
      value: `${metrics?.criticalAlerts?.current || 0}`,
      growth: `${metrics?.criticalAlerts?.newIn24Hours || 0}`,
      growth_type: "down",
      description: "new alerts in the last 24 hours",
      icon: <AlertTriangle />,
      icon_bg_color: "#DC2626",
      link_text: "View Details",
    },
    {
      id: 4,
      title: "Storage Usage",
      value: `${metrics?.storageUsage?.current || 0}/${metrics?.storageUsage?.total || 0}`,
      growth: `${metrics?.storageUsage?.percentage || 0}%`,
      growth_type: "down",
      description: "of storage used",
      icon: <HardDrive />,
      icon_bg_color: "#D97706",
      link_text: "View Details",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {cardsData.map((item) => (
        <DashboardStatsCard
          key={item.id}
          title={item.title}
          value={item.value}
          growth={item.growth}
          growthType={item.growth_type as any}
          growthColor={item.growth_type === "up" ? "green" : "red"}
          description={item.description}
          descriptionType={item.growth_type === "up" ? "good" : "bad"}
          icon={item.icon}
          iconBgColor={item.icon_bg_color}
          // link="#" // Commented out in original as well
          // linkText={item.link_text}
        />
      ))}
    </div>
  );
};

export default ClientInfoCards;
