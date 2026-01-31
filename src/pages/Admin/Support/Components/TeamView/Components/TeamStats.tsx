import { Ticket, Clock, UserCheck } from "lucide-react";
import DashboardStatsCard from "@/components/Dashboard/DashboardStatsCard";

const stats = [
  {
    title: "Total Tickets",
    value: "5",
    growth: "+12%",
    growthType: "up",
    growthColor: "green",
    description: "355 ticket already solved in this month",
    descriptionType: "good",
    icon: <Ticket />,
    iconBgColor: "#0F947E",
  },
  {
    title: "Opened Tickets",
    value: "2",
    growth: "+5%",
    growthType: "up",
    growthColor: "green",
    description: "2 ticket more than previous month",
    descriptionType: "good",
    icon: <Ticket />,
    iconBgColor: "#7C5CFB",
  },
  {
    title: "In Progress",
    value: "1",
    growth: "-2%",
    growthType: "down",
    growthColor: "green",
    description: "1 ticket lesser than previous month",
    descriptionType: "good",
    icon: <Clock />,
    iconBgColor: "#2E82FD",
  },
  {
    title: "Escalated",
    value: "1",
    growth: "+10%",
    growthType: "up",
    growthColor: "red",
    description: "Needs immediate attention",
    descriptionType: "bad",
    icon: <Ticket />,
    iconBgColor: "#E04B59",
  },
  {
    title: "Resolved Tickets",
    value: "1",
    growth: "+20%",
    growthType: "up",
    growthColor: "green",
    description: "Efficiency increased by 15%",
    descriptionType: "good",
    icon: <UserCheck />,
    iconBgColor: "#0F947E",
  },
];

export const TeamStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {stats.map((stat, index) => (
        <DashboardStatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          growth={stat.growth}
          growthType={stat.growthType as any}
          growthColor={stat.growthColor as any}
          description={stat.description}
          descriptionType={stat.descriptionType as any}
          icon={stat.icon}
          iconBgColor={stat.iconBgColor}
        />
      ))}
    </div>
  );
};
