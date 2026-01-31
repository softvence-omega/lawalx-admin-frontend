import React from "react";
import { User } from "lucide-react";
import { LoginData } from "./dataService";
import AreaChart from "./AnalyticsChart/AreaChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LoginsOverTimeProps {
  data: LoginData;
}

const LoginsOverTime: React.FC<LoginsOverTimeProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Logins Over Time
          </h2>
          <Select defaultValue="all">
            <SelectTrigger className="w-[200px] h-8 bg-white">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <SelectValue placeholder="Select Company" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              <SelectItem value="softvence">Softvence</SelectItem>
              <SelectItem value="omega">Omega Ltd</SelectItem>
              <SelectItem value="alpha">Alpha Inc</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="p-6">
        <AreaChart data={data} />
      </div>
    </div>
  );
};

export default LoginsOverTime;
