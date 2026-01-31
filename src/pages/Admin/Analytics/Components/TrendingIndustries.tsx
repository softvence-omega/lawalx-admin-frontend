import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { TrendingIndustry } from "./dataService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TrendingIndustriesProps {
  data: TrendingIndustry[];
}

const TrendingIndustries: React.FC<TrendingIndustriesProps> = ({ data }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Reviewing":
        return "bg-yellow-100 text-yellow-800";
      case "Deprecated":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Trending Industries
          </h2>
          <div className="relative">
            <Select defaultValue="usage">
              <SelectTrigger className="w-[150px] h-8">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usage">By Usage</SelectItem>
                <SelectItem value="growth">By Growth</SelectItem>
                <SelectItem value="status">By Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="p-6">
        <table className="w-full">
          <thead>
            <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="text-left pb-3">Employee Name</th>
              <th className="text-left pb-3">Usage</th>
              <th className="text-left pb-3">Monthly Comp.</th>
              <th className="text-left pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="space-y-3">
            {data.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {item.name}
                    </span>
                  </div>
                </td>
                <td className="py-3">
                  <span className="text-sm text-gray-900">{item.usage}</span>
                </td>
                <td className="py-3">
                  <div className="flex items-center space-x-1">
                    {item.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                    <span
                      className={`text-sm ${
                        item.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.trend === "up" ? "+" : ""}
                      {item.monthlyComp}%
                    </span>
                  </div>
                </td>
                <td className="py-3">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      item.status,
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrendingIndustries;
