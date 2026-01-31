import React from "react";
import { BounceRateData } from "./dataService";
import BarChart from "./AnalyticsChart/BarChart";

interface UserBounceRateProps {
  data: BounceRateData[];
}

const UserBounceRate: React.FC<UserBounceRateProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          User Bounce Rate
        </h2>
      </div>
      <div className="p-6">
        <BarChart data={data} />
      </div>
    </div>
  );
};

export default UserBounceRate;
