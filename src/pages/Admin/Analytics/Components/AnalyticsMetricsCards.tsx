import {
  BarChart3,
  LayoutGrid,
  LineChart,
  Gauge,
} from "lucide-react";
import DashboardStatsCard from "@/components/Dashboard/DashboardStatsCard";

const metricsData = [
  {
    id: 1,
    title: "Chart Library Usage Growth",
    value: "$576k",
    growth: "+5.7%",
    growth_type: "up",
    description: "200 Usage increased",
    icon: <BarChart3 />,
    icon_bg_color: "#0F947E",
  },
  {
    id: 2,
    title: "Total Clients",
    value: "175",
    growth: "+2%",
    growth_type: "up",
    description: "5 Instance in progress",
    icon: <LayoutGrid />,
    icon_bg_color: "#7C5CFB",
  },
  {
    id: 3,
    title: "Most Used Chart Type",
    value: "Column",
    growth: "+2%",
    growth_type: "up",
    description: "5720 Used in all Project",
    icon: <LineChart />,
    icon_bg_color: "#2E82FD",
  },
  {
    id: 4,
    title: "Avg. Dashboard Load Time",
    value: "8.9Sec",
    growth: "+5%",
    growth_type: "down",
    description: "+3.0s Increased",
    icon: <Gauge />,
    icon_bg_color: "#E04B59",
  },
];

const AnalyticsMetricsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-6">
      {metricsData.map((item) => (
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
        />
      ))}
    </div>
  );
};

export default AnalyticsMetricsCards;
