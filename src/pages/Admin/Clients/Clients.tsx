// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { LayoutGrid, Table, Filter } from "lucide-react";
import { ClientData2 } from "@/types/Client";
import CounterCard from "./Components/CounterCard";
// import BoardCustomerInsight from "../Overview/Components/CustomerInsight/BoardCustomerInsight";
import {
  // useGetAllClientByAdminQuery,
  useGetClientDashboardSummaryQuery,
} from "@/store/Api/ClientApi/ClientApi";
// import ClientInsightsTable from "../Overview/Components/CustomerInsight/TableCustomerInsight";
import CounterCardSkeleton from "@/common/Skeleton/CounterCardSkeleton";
// import ClientsSkeleton from "./Components/ClientsSkeleton";
import { CustomerInsights } from "../Overview/Components/CustomerInsight/CustomerInsight";

interface Clientdata {
  customer?: ClientData2;
}

const Clients: React.FC<Clientdata> = () => {
  const { data: summary, isLoading: summaryLoading } =
    useGetClientDashboardSummaryQuery({});
  // const { data, isLoading } = useGetAllClientByAdminQuery({});
  // const [viewMode, setViewMode] = useState("Boards");

  // const customers: ClientData2[] = data?.data || [];
  const summaryData = summary?.data || [];
  // // Pagination states
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 50;

  // // Calculate the total number of pages
  // const totalPages = Math.ceil(customers?.length / itemsPerPage);

  // // Calculate the customers to display on the current page
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentCustomers = customers?.slice(startIndex, endIndex);
  // if (isLoading) {
  //   return <ClientsSkeleton />;
  // }
  return (
    <>
      <div className="flex flex-wrap sm:flex-nowrap gap-5 mt-11">
        {summaryLoading ? (
          Array(4)
            .fill(0)
            .map((_, index) => <CounterCardSkeleton key={index} />)
        ) : (
          <>
            <CounterCard
              image="icon.png"
              title="Total Client"
              count={summaryData?.totalClients}
            />
            <CounterCard
              image="icon1.png"
              title="New Clients"
              count={summaryData?.newClients}
            />
            <CounterCard
              image="icon2.png"
              title="Active User"
              count={summaryData?.activeUsers}
            />
            <CounterCard
              image="icon3.png"
              title="Inactive Client"
              count={summaryData?.inactiveClients}
            />
          </>
        )}
      </div>
      <div className="space-y-6 mt-11">
        <CustomerInsights />
        {/* <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between">
          <h2 className="text-xl font-medium text-gray-900">
            Customer Insight
          </h2>

          <div className="flex items-center gap-3">
            <Button
              variant={viewMode === "Boards" ? "secondary" : "outline"}
              size="lg"
              className={
                viewMode === "Boards"
                  ? "bg-gray-800 text-white gap-2 cursor-pointer"
                  : "gap-2 cursor-pointer border border-gray-200"
              }
              onClick={() => setViewMode("Boards")}
            >
              <LayoutGrid className="h-4 w-4" />
              Boards
            </Button>
            <Button
              size="lg"
              className={
                viewMode === "Tables"
                  ? "bg-gray-800 text-white gap-2 cursor-pointer"
                  : "gap-2 cursor-pointer border border-gray-200"
              }
              onClick={() => setViewMode("Tables")}
            >
              <Table className="h-4 w-4" />
              Tables
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 bg-transparent"
            >
              <Filter className="h-4 w-4" />
              Filter By
            </Button>
          </div>
        </div>

        {viewMode === "Boards" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentCustomers.map((customer) => (
              <BoardCustomerInsight key={customer.id} customer={customer} />
            ))}
          </div>
        ) : (
          <ClientInsightsTable customers={currentCustomers} />
        )}

     
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
        </div> */}
      </div>
    </>
  );
};

export default Clients;
