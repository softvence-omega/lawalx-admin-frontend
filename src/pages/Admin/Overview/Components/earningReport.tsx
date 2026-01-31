"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ShoppingCart, CreditCard, DollarSign } from "lucide-react";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ordersData = [
  { month: "Jan", value: 18, percentage: "18%" },
  { month: "Feb", value: 23, percentage: "23%" },
  { month: "Mar", value: 25, percentage: "25%" },
  { month: "Apr", value: 32, percentage: "32%" },
  { month: "May", value: 38, percentage: "38%" },
  { month: "Jun", value: 42, percentage: "42%" },
  { month: "Jul", value: 50, percentage: "50%" },
  { month: "Aug", value: 70, percentage: "70%" },
  { month: "Sep", value: 48, percentage: "48%" },
  { month: "Oct", value: 45, percentage: "45%" },
  { month: "Nov", value: 47, percentage: "47%" },
  { month: "Dec", value: 60, percentage: "60%" },
];

const salesData = [
  { month: "Jan", value: 25, percentage: "25%" },
  { month: "Feb", value: 30, percentage: "30%" },
  { month: "Mar", value: 35, percentage: "35%" },
  { month: "Apr", value: 40, percentage: "40%" },
  { month: "May", value: 45, percentage: "45%" },
  { month: "Jun", value: 50, percentage: "50%" },
  { month: "Jul", value: 55, percentage: "55%" },
  { month: "Aug", value: 65, percentage: "65%" },
  { month: "Sep", value: 52, percentage: "52%" },
  { month: "Oct", value: 48, percentage: "48%" },
  { month: "Nov", value: 53, percentage: "53%" },
  { month: "Dec", value: 68, percentage: "68%" },
];

const incomeData = [
  { month: "Jan", value: 15, percentage: "15%" },
  { month: "Feb", value: 20, percentage: "20%" },
  { month: "Mar", value: 22, percentage: "22%" },
  { month: "Apr", value: 28, percentage: "28%" },
  { month: "May", value: 33, percentage: "33%" },
  { month: "Jun", value: 38, percentage: "38%" },
  { month: "Jul", value: 45, percentage: "45%" },
  { month: "Aug", value: 62, percentage: "62%" },
  { month: "Sep", value: 42, percentage: "42%" },
  { month: "Oct", value: 40, percentage: "40%" },
  { month: "Nov", value: 43, percentage: "43%" },
  { month: "Dec", value: 55, percentage: "55%" },
];

const EarningReportsChart = () => {
  const [activeTab, setActiveTab] = useState<"orders" | "sales" | "income">(
    "orders",
  );
  const [sortBy, setSortBy] = useState<"default" | "highest" | "lowest">(
    "default",
  );

  const currentData = useMemo(() => {
    let baseData;
    switch (activeTab) {
      case "orders":
        baseData = ordersData;
        break;
      case "sales":
        baseData = salesData;
        break;
      case "income":
        baseData = incomeData;
        break;
      default:
        baseData = ordersData;
    }

    const data = [...baseData];
    if (sortBy === "highest") {
      data.sort((a, b) => b.value - a.value);
    } else if (sortBy === "lowest") {
      data.sort((a, b) => a.value - b.value);
    }
    return data;
  }, [activeTab, sortBy]);

  return (
    <Card className="border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
        <div>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Earning Reports
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">Yearly Earnings Overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={sortBy}
            onValueChange={(value: any) => setSortBy(value)}
          >
            <SelectTrigger className="w-[150px] h-8 text-xs border border-gray-200 shadow-none focus:ring-0 text-gray-500 hover:text-gray-700 bg-transparent ">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="highest">Highest Earning</SelectItem>
              <SelectItem value="lowest">Lowest Earning</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 md:gap-4 mb-6">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex flex-col items-center gap-2 size-28 p-6 rounded-lg border transition-colors ${
              activeTab === "orders"
                ? " border-blue-200 text-blue-500"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="p-3 rounded-lg bg-slate-200">
              <ShoppingCart
                className={`size-6  ${
                  activeTab === "orders" ? "text-blue-500" : "text-gray-600"
                }`}
              />
            </div>
            <span className="text-sm font-medium">Orders</span>
          </button>
          <button
            onClick={() => setActiveTab("sales")}
            className={`flex flex-col items-center gap-2 size-28 p-6 rounded-lg border transition-colors ${
              activeTab === "sales"
                ? "border-blue-200 text-blue-500"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="p-3 rounded-lg bg-slate-200">
              <CreditCard
                className={`size-6  ${
                  activeTab === "sales" ? "text-blue-500" : "text-gray-600"
                }`}
              />
            </div>
            <span className="text-sm font-medium">Sales</span>
          </button>
          <button
            onClick={() => setActiveTab("income")}
            className={`flex flex-col items-center gap-2 size-28 p-6 rounded-lg border transition-colors ${
              activeTab === "income"
                ? "border-blue-200 text-blue-500"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="p-3 rounded-lg bg-slate-200">
              <DollarSign
                className={`size-6  ${
                  activeTab === "income" ? "text-blue-600" : "text-gray-600"
                }`}
              />
            </div>
            <span className="text-sm font-medium">Income</span>
          </button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={currentData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#666" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#666" }}
              domain={[0, 100]}
              ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            />
            <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default EarningReportsChart;
