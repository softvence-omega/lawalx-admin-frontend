import { useState, useMemo, memo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Table, Filter } from "lucide-react";
import BoardCustomerInsight from "./BoardCustomerInsight";
import { useGetAllClientByAdminQuery } from "@/store/Api/ClientApi/ClientApi";
import BoardCustomerInsightSkeleton from "@/common/Skeleton/BoardCustomerInsightSkeleton";
import { ClientData2 } from "@/types/Client";
import ClientInsightsTable from "./TableCustomerInsight";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation } from "react-router-dom";
export const CustomerInsights = memo(function CustomerInsights() {
  const location = useLocation();
  const isClient = location.pathname.includes("/admin/clients");
  const { data, isLoading } = useGetAllClientByAdminQuery({});
  const customers: ClientData2[] = useMemo(() => data?.data || [], [data]);
  const [viewMode, setViewMode] = useState("Boards");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isClient ? 16 : 4;
  const [filterPlan, setFilterPlan] = useState<string>("all");

  // Filter customers based on plan
  const filteredCustomers = useMemo(() => {
    let result = customers;
    if (filterPlan !== "all") {
      result = result.filter((c) => c.subscriptionPlan === filterPlan);
    }
    return result;
  }, [customers, filterPlan]);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterPlan]);

  // Calculate the total number of pages
  const totalPages = useMemo(
    () => Math.ceil((filteredCustomers?.length || 0) / itemsPerPage) || 1,
    [filteredCustomers, itemsPerPage],
  );

  // Calculate the customers to display on the current page
  const currentCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCustomers, currentPage, itemsPerPage]);

  return (
    <div className="space-y-6 mt-11 min-h-[55vh]">
      {/* Section Header - Kept stable to prevent layout shifts */}
      <div className="space-y-4 md:space-y-0 md:flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Customer Insight
        </h2>

        <div className="flex items-center gap-3">
          <Button
            size="lg"
            variant={viewMode === "Boards" ? "secondary" : "outline"}
            className={`
              ${viewMode === "Boards" ? "bg-gray-800 text-white gap-2 cursor-pointer" : "gap-2 cursor-pointer"}
            `}
            onClick={() => setViewMode("Boards")}
          >
            <LayoutGrid className="h-4 w-4" />
            Boards
          </Button>
          <Button
            size="lg"
            variant={viewMode === "Tables" ? "secondary" : "outline"}
            className={
              viewMode === "Tables"
                ? "bg-gray-800 text-white gap-2 cursor-pointer"
                : "gap-2 cursor-pointer"
            }
            onClick={() => setViewMode("Tables")}
          >
            <Table className="h-4 w-4" />
            Tables
          </Button>
          <div className="flex items-center gap-2">
            <Select value={filterPlan} onValueChange={setFilterPlan}>
              <SelectTrigger className="w-[180px] h-10 text-sm border-gray-200 shadow-none focus:ring-0 text-gray-700 bg-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter By" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="starter">Starter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <BoardCustomerInsightSkeleton />
      ) : filteredCustomers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300 animate-in fade-in duration-500">
          <div className="text-4xl mb-2">🔍</div>
          <p className="text-gray-500 font-medium text-lg text-center px-4">
            No customers found matching the filter criteria
          </p>
          <Button
            variant="ghost"
            className="mt-4 text-blue-600 hover:text-blue-700"
            onClick={() => setFilterPlan("all")}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <>
          {viewMode === "Boards" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
              {currentCustomers.map((customer) => (
                <div className="">
                  <BoardCustomerInsight key={customer.id} customer={customer} />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[440px]">
              <ClientInsightsTable customers={currentCustomers} />
            </div>
          )}

          {/* Pagination Controls */}
          {currentCustomers.length > itemsPerPage && (
            <div className="flex justify-between items-center mt-6">
              <Button
                className="border border-green-500 text-green-500 cursor-pointer"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-blue-400">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                className="border border-blue-500 text-blue-500 cursor-pointer"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
});
