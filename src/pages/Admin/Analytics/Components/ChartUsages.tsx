import React from "react";
import { ChartUsage } from "./dataService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChartUsagesProps {
  chartUsageData: {
    chartUsages: ChartUsage[];
    totalUsage: number;
  };
  showLivesOnly: boolean;
  setShowLivesOnly: (value: boolean) => void;
}

const ChartUsages: React.FC<ChartUsagesProps> = ({
  chartUsageData,
  showLivesOnly,
  setShowLivesOnly,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Chart Usages</h2>
          <div className="flex items-center space-x-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[130px] h-8">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Industries</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="health">Health</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="month">
              <SelectTrigger className="w-[130px] h-8">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">
              Total usage {Math.floor(chartUsageData.totalUsage / 1000)}k
            </span>
            <label className="flex items-center space-x-2 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={showLivesOnly}
                onChange={(e) => setShowLivesOnly(e.target.checked)}
                className="w-3 h-3 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span>Usage Data</span>
            </label>
          </div>
        </div>

        <div className="space-y-3">
          {chartUsageData.chartUsages.map((chart, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 w-24">{chart.name}</span>
              <div className="flex-1 mx-3">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-purple-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${chart.value}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900 w-8 text-right">
                {chart.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartUsages;
