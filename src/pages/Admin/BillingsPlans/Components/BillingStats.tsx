import { useGetPaymentsDashboardSummaryQuery } from "@/store/Api/PaymentApi/PaymentApi";

const BillingStats = () => {
  const { data, isLoading } = useGetPaymentsDashboardSummaryQuery({});
  console.log(data.data);
  if (isLoading) return <div>Loading...</div>;
  return <div className=""></div>;
};

export default BillingStats;
