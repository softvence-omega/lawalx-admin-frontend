import { useGetPaymentsStatsQuery } from "@/store/Api/PaymentApi/PaymentApi";
import BillingStatsCard from "./BillingStatsCard";
import { FaChartPie, FaUsers } from "react-icons/fa";
import CardSkeleton from "@/common/Skeleton/CardSkeleton";

const BillingStats = () => {
  const { data, isLoading } = useGetPaymentsStatsQuery({});

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <CardSkeleton key={i} />
          ))}
      </div>
    );
  }

  const summary = data?.data;

  const cards = [
    {
      title: "Trial Period",
      value: summary?.trial || 0,
      icon: <FaChartPie />,
      icon_bg_color: "#2563EB",
      description: "Users currently in trial",
      growth_type: "up" as const, // Defaulting to up for styling since growth is missiong
    },
    {
      title: "Starter Plan",
      value: summary?.starter || 0,
      icon: <FaChartPie />,
      icon_bg_color: "#7C3AED",
      description: "Active starter plan subscribers",
      growth_type: "up" as const,
    },
    {
      title: "Professional Plan",
      value: summary?.professional || 0,
      icon: <FaUsers />,
      icon_bg_color: "#16A34A",
      description: "Active professional subscribers",
      growth_type: "up" as const,
    },
    {
      title: "Business Plan",
      value: summary?.business || 0,
      icon: <FaUsers />,
      icon_bg_color: "#DC2626",
      description: "Active business subscribers",
      growth_type: "up" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {cards.map((item, index) => (
        <BillingStatsCard key={index} item={item} />
      ))}
    </div>
  );
};

export default BillingStats;
