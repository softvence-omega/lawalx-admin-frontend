import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const supportTicketsData = [
  { name: "Opened", value: 338, percentage: 65, color: "#8b5cf6" },
  { name: "In Progress", value: 109, percentage: 21, color: "#06b6d4" },
  { name: "Resolved", value: 73, percentage: 14, color: "#10b981" },
];

export function SupportTicketsChart() {
  const [sortBy, setSortBy] = useState<"default" | "highest" | "lowest">(
    "default",
  );

  const sortedData = useMemo(() => {
    const data = [...supportTicketsData];
    if (sortBy === "highest") {
      return data.sort((a, b) => b.value - a.value);
    } else if (sortBy === "lowest") {
      return data.sort((a, b) => a.value - b.value);
    }
    return data;
  }, [sortBy]);

  const totalTickets = useMemo(() => {
    return sortedData.reduce((acc, curr) => acc + curr.value, 0);
  }, [sortedData]);
  return (
    <Card className="lg:col-span-1 border border-gray-200 h-[450px] p-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Support Tickets
        </CardTitle>
        <div className="flex items-center gap-2">
          <Select
            value={sortBy}
            onValueChange={(value: any) => setSortBy(value)}
          >
            <SelectTrigger className="w-[150px] h-8 text-xs border border-gray-200 shadow-none focus:ring-0 text-gray-500 hover:text-gray-700 bg-transparent">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="highest">Highest Value</SelectItem>
              <SelectItem value="lowest">Lowest Value</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={sortedData}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sortedData?.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-xs text-gray-500">Total Tickets</div>
              <div className="text-2xl font-bold text-gray-900">
                {totalTickets}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {sortedData?.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-600">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{item.value}</span>
                <span className="text-gray-500">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
