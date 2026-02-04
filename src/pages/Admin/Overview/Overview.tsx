import { ActivityLog } from "./Components/ActivityLog";
import { AlertCenter } from "./Components/AlertCenter";
import { CustomerInsights } from "./Components/CustomerInsight/CustomerInsight";
import EarningReportsChart from "./Components/earningReport";
import { MetricsCards } from "./Components/metricsCards";
import { SupportTicketsChart } from "./Components/supportTicket";
import TopClients from "./Components/topClients";
import { TrendingIndustriesTable } from "./Components/trendingIndustries";

const Overview = () => {
  return (
    <div className="space-y-10 mx-auto px-0 pb-10 ">
      <MetricsCards />

      <CustomerInsights />
      <div className="gap-6 grid grid-cols-12">
        {/* Main Content Area */}
        <div className="space-y-10 col-span-12 xl:col-span-9">
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <TopClients />
            <SupportTicketsChart />
            {/* You can add another small chart or metric card here */}
          </div>
          <EarningReportsChart />

          <TrendingIndustriesTable />
        </div>

        {/* Sidebar Area - Stacks on bottom on mobile/tablet */}
        <div className="space-y-6 col-span-12 xl:col-span-3">
          <AlertCenter />
          <ActivityLog />
        </div>
      </div>
    </div>
  );
};

export default Overview;
