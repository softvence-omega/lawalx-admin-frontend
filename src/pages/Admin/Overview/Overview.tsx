import { ActivityLog } from "./Components/ActivityLog";
import { AlertCenter } from "./Components/AlertCenter";
import { CustomerInsights } from "./Components/CustomerInsight/CustomerInsight";
import { MetricsCards } from "./Components/MetricsCards";
import { SupportTicketsChart } from "./Components/SupportTicket";
import { TrendingIndustriesTable } from "./Components/TrendingIndustries";

const Overview = () => {
  console.log("Inside Overview");
  return (
    <>
      <MetricsCards />
      <CustomerInsights />
      <div className="grid grid-cols-12 gap-6 mx-auto mt-10">
        <div className="col-span-12 lg:col-span-9 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="w-full h-full">{/* <TopClients /> */}</div>
            <div className="w-full h-full">
              <SupportTicketsChart />
            </div>
          </div>
          {/* <EarningReportsChart /> */}
          <TrendingIndustriesTable />
        </div>
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <AlertCenter />
          <ActivityLog />
        </div>
      </div>
    </>
  );
};

export default Overview;
