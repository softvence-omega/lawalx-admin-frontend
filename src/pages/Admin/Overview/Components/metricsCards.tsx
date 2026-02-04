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
import DashboardStatsCardSkeleton from "@/common/Skeleton/DashboardStatsCardSkeleton";
import { useGetPaymentsDashboardSummaryQuery } from "@/store/Api/PaymentApi/PaymentApi";

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
  const { data, isLoading } = useGetPaymentsDashboardSummaryQuery({});
  const summaryData = data?.data;
  const metricsData = [
    {
      id: 1,
      title: "Total Sales",
      value: summaryData?.totalSales?.value,
      growth: summaryData?.totalSales?.growth,
      growth_type: `${parseFloat(summaryData?.totalSales?.growth) > 0 ? "up" : "down"}`,
      description: `${summaryData?.totalSales?.value} Sales growth`,
      icon: "Chart",
      icon_bg_color: "#0266F3",
      link_text: "View report",
    },
    {
      id: 2,
      title: "Monthly Recurring Revenue",
      value: summaryData?.monthlyRecurringRevenue?.value,
      growth: summaryData?.monthlyRecurringRevenue?.growth,
      growth_type: `${parseFloat(summaryData?.monthlyRecurringRevenue?.growth) > 0 ? "up" : "down"}`,
      description: `${summaryData?.monthlyRecurringRevenue?.value} New user joined`,
      icon: "LiveProject",
      icon_bg_color: "#169E7B",
      link_text: "View report",
    },
    {
      id: 3,
      title: "Client Retention Rate",
      value: summaryData?.clientRetentionRate.value,
      growth: summaryData?.clientRetentionRate.growth,
      growth_type: `${parseFloat(summaryData?.clientRetentionRate.growth) > 0 ? "up" : "down"}`,
      description: `${summaryData?.clientRetentionRate.value} Client retention rate`,
      icon: "Users",
      icon_bg_color: "#7E3AF2",
      link_text: "View report",
    },
    {
      id: 4,
      title: "Client Churn Rate",
      value: summaryData?.clientChurnRate.value,
      growth: summaryData?.clientChurnRate.growth,
      growth_type: `${parseFloat(summaryData?.clientChurnRate.growth) > 0 ? "up" : "down"}`,
      description: `${summaryData?.clientChurnRate.value} Client churn rate`,
      icon: "SubmissionOverdue",
      icon_bg_color: "#DC2626",
      link_text: "View report",
    },
    {
      id: 5,
      title: "Net Promoter Score",
      value: summaryData?.netPromoterScore?.value,
      growth: summaryData?.netPromoterScore?.growth,
      growth_type: `${parseFloat(summaryData?.netPromoterScore?.growth) > 0 ? "up" : "down"}`,
      description: `${summaryData?.netPromoterScore?.value} Net promoter score`,
      icon: "Check",
      icon_bg_color: "#D97706",
      link_text: "View report",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {metricsData?.map((item) => (
          <DashboardStatsCardSkeleton
            key={item.id}
            className={
              item.title === "Net Promoter Score"
                ? "md:col-span-2 lg:col-span-2 xl:col-span-1"
                : ""
            }
          />
        ))}
      </div>
    );
  }

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
