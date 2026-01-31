import React, { useState, useEffect } from "react";
import {
  BounceRateData,
  ChartUsage,
  dataService,
  LoginData,
  RenderingStatus,
  TrendingIndustry,
} from "./Components/dataService";
import AnalyticsMetricsCards from "./Components/AnalyticsMetricsCards";
import TrendingIndustries from "./Components/TrendingIndustries";
import ChartUsages from "./Components/ChartUsages";
import LoginsOverTime from "./Components/LoginsOverTime";
import RenderingStatusComponent from "./Components/RenderingStatusComponent";
import UserBounceRate from "./Components/UserBounceRate";

const Analytics: React.FC = () => {
  const [showLivesOnly, setShowLivesOnly] = useState(true);
  const [trendingData, setTrendingData] = useState<TrendingIndustry[]>([]);
  const [chartUsageData, setChartUsageData] = useState<{
    chartUsages: ChartUsage[];
    totalUsage: number;
  }>({ chartUsages: [], totalUsage: 0 });
  const [loginData, setLoginData] = useState<LoginData>({
    months: [],
    series: [],
  });
  const [bounceRateData, setBounceRateData] = useState<BounceRateData[]>([]);
  const [renderingStatus, setRenderingStatus] = useState<RenderingStatus>({
    labels: [],
    values: [],
    colors: [],
    counts: [],
    totalRendered: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          trendingIndustries,
          chartUsages,
          loginDataRes,
          bounceRateDataRes,
          renderingStatusRes,
        ] = await Promise.all([
          dataService.getTrendingIndustries(),
          dataService.getChartUsages(),
          dataService.getLoginData(),
          dataService.getBounceRateData(),
          dataService.getRenderingStatus(),
        ]);

        setTrendingData(trendingIndustries);
        setChartUsageData(chartUsages);
        setLoginData(loginDataRes);
        setBounceRateData(bounceRateDataRes);
        setRenderingStatus(renderingStatusRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AnalyticsMetricsCards />
      <div className="grid grid-cols-12 gap-6">
        {/* Top Section - Trending & Chart Usages */}
        <div className="col-span-6">
          <TrendingIndustries data={trendingData} />
        </div>

        <div className="col-span-6">
          <ChartUsages
            chartUsageData={chartUsageData}
            showLivesOnly={showLivesOnly}
            setShowLivesOnly={setShowLivesOnly}
          />
        </div>

        {/* Middle Section - Logins Over Time */}
        <div className="col-span-8">
          <LoginsOverTime data={loginData} />
        </div>

        {/* Bottom Section - Rendering Status & Bounce Rate */}
        <div className="col-span-4 space-y-6">
          <RenderingStatusComponent data={renderingStatus} />
          <UserBounceRate data={bounceRateData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
