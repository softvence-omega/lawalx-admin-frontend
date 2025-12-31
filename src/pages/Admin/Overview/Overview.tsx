import { ActivityLog } from "./Components/ActivityLog";
import { AlertCenter } from "./Components/AlertCenter";
import { CustomerInsights } from "./Components/CustomerInsight/CustomerInsight";
import { EarningReportsChart } from "./Components/earningReport";
import { MetricsCards } from "./Components/metricsCards";
import { SupportTicketsChart } from "./Components/supportTicket";
import { TopClientsChart } from "./Components/topClients";
import { TrendingIndustriesTable } from "./Components/trendingIndustries";

const Overview = () => {
  return (
    <>
      <MetricsCards />
      <CustomerInsights />
      <div className="grid grid-cols-12 gap-6 mx-auto mt-10">
        <div className="col-span-5">
          <TopClientsChart />
        </div>
        <div className="col-span-4">
          <SupportTicketsChart />
        </div>
        <div className="col-span-3">
          <AlertCenter />
        </div>
        <div className="col-span-9 -mt-32">
          <EarningReportsChart />
        </div>
        <div className="col-span-3">
          <ActivityLog />
        </div>
        <div className="col-span-9 -mt-112">
          <TrendingIndustriesTable />
        </div>
      </div>
    </>
  );
};

export default Overview;
