import { useGetPaymentsDashboardSummaryQuery } from "@/store/Api/PaymentApi/PaymentApi";
import BillingStatsCard from "./BillingStatsCard";
import { FaChartPie, FaUsers } from "react-icons/fa";
import CardSkeleton from "@/common/Skeleton/CardSkeleton";

const BillingStats = () => {
  const { data, isLoading } = useGetPaymentsDashboardSummaryQuery(undefined);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <CardSkeleton key={i} />
          ))}
      </div>
    );
  }

  const summary = data?.data;
  const getGrowthType = (growth?: string): "up" | "down" | undefined => {
    if (!growth) return undefined;
    return growth.trim().startsWith("-") ? "down" : "up";
  };

  const cards = [
    {
      title: "Total Sales",
      value: summary?.totalSales?.value,
      growth: summary?.totalSales?.growth,
      growth_type: getGrowthType(summary?.totalSales?.growth),
      icon: <FaChartPie />,
      icon_bg_color: "#2563EB",
      description: "Overall sales performance",
    },
    {
      title: "Revenue",
      value: summary?.monthlyRecurringRevenue?.value,
      growth: summary?.monthlyRecurringRevenue?.growth,
      growth_type: getGrowthType(summary?.monthlyRecurringRevenue?.growth),
      icon: <FaChartPie />,
      icon_bg_color: "#7C3AED",
      description: "Monthly recurring revenue",
    },
    {
      title: "Retention Rate",
      value: summary?.clientRetentionRate?.value,
      growth: summary?.clientRetentionRate?.growth,
      growth_type: getGrowthType(summary?.clientRetentionRate?.growth),
      icon: <FaUsers />,
      icon_bg_color: "#16A34A",
      description: "Client retention health",
    },
    {
      title: "Churn Rate",
      value: summary?.clientChurnRate?.value,
      growth: summary?.clientChurnRate?.growth,
      growth_type: getGrowthType(summary?.clientChurnRate?.growth),
      icon: <FaUsers />,
      icon_bg_color: "#DC2626",
      description: "Clients lost over time",
    },
    {
      title: "NPS Score",
      value: summary?.netPromoterScore?.value,
      growth: summary?.netPromoterScore?.growth,
      growth_type: getGrowthType(summary?.netPromoterScore?.growth),
      icon: <FaChartPie />,
      icon_bg_color: "#F59E0B",
      description: "Customer satisfaction index",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {cards.map((item, index) => (
        <BillingStatsCard key={index} item={item} />
      ))}
    </div>
  );
};

export default BillingStats;
