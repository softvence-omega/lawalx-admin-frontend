import { useState, useMemo, memo } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Table, Filter } from "lucide-react";
import BoardCustomerInsight from "./BoardCustomerInsight";
import { useGetAllClientByAdminQuery } from "@/store/Api/ClientApi/ClientApi";
import BoardCustomerInsightSkeleton from "@/common/Skeleton/BoardCustomerInsightSkeleton";
import { ClientData2 } from "@/types/Client";
import ClientInsightsTable from "./TableCustomerInsight";
export const CustomerInsights = memo(function CustomerInsights() {
  const { data, isLoading } = useGetAllClientByAdminQuery({});
  const customers: ClientData2[] = useMemo(() => data?.data || [], [data]);
  const [viewMode, setViewMode] = useState("Boards");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Calculate the total number of pages
  const totalPages = useMemo(
    () => Math.ceil((customers?.length || 0) / itemsPerPage) || 1,
    [customers, itemsPerPage]
  );

  // Calculate the customers to display on the current page
  const currentCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return customers.slice(startIndex, startIndex + itemsPerPage);
  }, [customers, currentPage, itemsPerPage]);

  return (
    <div className="space-y-6 mt-11">
      {/* Section Header - Kept stable to prevent layout shifts */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Customer Insight
        </h2>

        <div className="flex items-center gap-3">
          <Button
            variant={viewMode === "Boards" ? "secondary" : "outline"}
            size="sm"
            className={
              viewMode === "Boards"
                ? "bg-gray-800 text-white gap-2 cursor-pointer"
                : "gap-2 cursor-pointer"
            }
            onClick={() => setViewMode("Boards")}
          >
            <LayoutGrid className="h-4 w-4" />
            Boards
          </Button>
          <Button
            size="sm"
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
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter By
          </Button>
        </div>
      </div>

      {isLoading ? (
        <BoardCustomerInsightSkeleton />
      ) : (
        <>
          {viewMode === "Boards" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentCustomers.map((customer) => (
                <BoardCustomerInsight key={customer.id} customer={customer} />
              ))}
            </div>
          ) : (
            <ClientInsightsTable customers={currentCustomers} />
          )}

          {/* Pagination Controls */}
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
        </>
      )}
    </div>
  );
});
