import React from "react";
import { RenderingStatus } from "./dataService";
import DonutChart from "./AnalyticsChart/DonutChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RenderingStatusComponentProps {
  data: RenderingStatus;
}

const RenderingStatusComponent: React.FC<RenderingStatusComponentProps> = ({
  data,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Rendering Status
          </h2>
          <Select defaultValue="status">
            <SelectTrigger className="w-[130px] h-8">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="status">By Status</SelectItem>
              <SelectItem value="count">By Count</SelectItem>
              <SelectItem value="color">By Color</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <label className="flex items-center space-x-2 text-xs text-gray-600">
            <input
              type="checkbox"
              defaultChecked
              className="w-3 h-3 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span>Show Live Only</span>
          </label>
        </div>
        <div className="flex justify-center mb-4">
          <DonutChart data={data} />
        </div>
        <div className="space-y-2">
          {data.labels.map((label, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: data.colors[index],
                  }}
                ></div>
                <span className="text-gray-600">{label}</span>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {Math.floor(data.counts[index] / 1000)}k
                </div>
                <div className="text-xs text-gray-500">
                  {data.values[index]}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RenderingStatusComponent;
