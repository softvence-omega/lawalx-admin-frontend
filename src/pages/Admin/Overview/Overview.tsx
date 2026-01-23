import { ActivityLog } from "./Components/ActivityLog";
import { AlertCenter } from "./Components/AlertCenter";
import { CustomerInsights } from "./Components/CustomerInsight/CustomerInsight";
import { MetricsCards } from "./Components/MetricsCards";
import { SupportTicketsChart } from "./Components/SupportTicket";
import { TrendingIndustriesTable } from "./Components/TrendingIndustries";
import EarningReportsChart from "./Components/EarningReport";

const Overview = () => {
  return (
    <div className="container mx-auto space-y-10 pb-10 px-0">
      <MetricsCards />

      <CustomerInsights />
      <div className="grid grid-cols-12 gap-6">
        {/* Main Content Area */}
        <div className="col-span-12 xl:col-span-9 space-y-10">
          <EarningReportsChart />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SupportTicketsChart />
            {/* You can add another small chart or metric card here */}
          </div>

          <TrendingIndustriesTable />
        </div>

        {/* Sidebar Area - Stacks on bottom on mobile/tablet */}
        <div className="col-span-12 xl:col-span-3 space-y-6">
          <AlertCenter />
          <ActivityLog />
        </div>
      </div>
    </div>
  );
};

export default Overview;
