"use client";

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Users,
  Ticket,
  UserCheck,
  Clock,
  Search,
  Filter,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import SupportDetailsModal from "./Components/SupportDetailsModal";
import EditTicketModal from "./Components/EditTicketModal";
import DashboardStatsCard from "@/components/Dashboard/DashboardStatsCard";
import { useGetAllTicketsQuery } from "@/store/Api/AdminApi/SupportApi";
import SupportTicketsSkeleton from "../../../../../common/Skeleton/SupportTicketsSkeleton";
// import { SupportTicket } from "@/types/SupportTypes";

// --- Mock Data ---

const overviewStats = [
  {
    title: "Opened Tickets",
    value: "520",
    growth: "+12%",
    growthType: "up",
    growthColor: "green",
    description: "355 ticket already solved in this month",
    descriptionType: "good",
    icon: <Ticket />,
    iconBgColor: "#0F947E",
  },
  {
    title: "Assigned Ticket",
    value: "150",
    growth: "+5%",
    growthType: "up",
    growthColor: "green",
    description: "34 ticket more then previous month",
    descriptionType: "good",
    icon: <UserCheck />,
    iconBgColor: "#7C5CFB",
  },
  {
    title: "Unassigned Ticket",
    value: "15",
    growth: "-5%",
    growthType: "down",
    growthColor: "green",
    description: "3 ticket lesser then previous month",
    descriptionType: "good",
    icon: <Ticket />,
    iconBgColor: "#2E82FD",
  },
  {
    title: "Average Response Time",
    value: "2h 15m",
    growth: "+12%",
    growthType: "up",
    growthColor: "red",
    description: "15 minutes slower then previous month",
    descriptionType: "bad",
    icon: <Clock />,
    iconBgColor: "#E04B59",
  },
];

// const initialTickets = [
//   {
//     id: "CN#252024",
//     company: "Acme",
//     logo: "https://api.dicebear.com/7.x/initials/svg?seed=Acme",
//     subject: "CSV file upload failed",
//     status: "Opened",
//     lastUpdated: "2 hours ago",
//     priority: "High",
//     assignedTo: {
//       name: "Kathryn Murphy",
//       avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Acme",
//       role: "DevOps Eng.",
//     },
//     description:
//       "Hello Support Team, I'm trying to export our analytics data to CSV format but keep getting an error message. When I click on the 'Export to CSV' button in the Reports section, the loading spinner appears for about 10 seconds and then displays 'Export Failed: Unknown Error'. I've tried this on multiple browsers (Chrome, Firefox, and Edge) with the same result. This functionality was working fine last week. Could you please look into this issue as soon as possible? We need this data for our quarterly review.",
//     createdDate: "3-July-2025",
//     updatedDate: "3-July-2025",
//     companyFullName: "Acme Corporation",
//   },
//   {
//     id: "CN#252025",
//     company: "Global Tech",
//     logo: "https://api.dicebear.com/7.x/initials/svg?seed=GT",
//     subject: "Chart render failed",
//     status: "Opened",
//     lastUpdated: "4 hours ago",
//     priority: "High",
//     assignedTo: {
//       name: "Leslie Alexander",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leslie",
//       role: "Support Specialist",
//     },
//   },
//   {
//     id: "CN#252026",
//     company: "Tech Stark",
//     logo: "https://api.dicebear.com/7.x/initials/svg?seed=TS",
//     subject: "I don't know what happen...",
//     status: "Unassigned",
//     lastUpdated: "Yesterday",
//     priority: "Medium",
//     assignedTo: {
//       name: "Annette Black",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Annette",
//       role: "Lead Support",
//     },
//   },
//   {
//     id: "CN#252027",
//     company: "Next Gen",
//     logo: "https://api.dicebear.com/7.x/initials/svg?seed=NG",
//     subject: "Chart render failed",
//     status: "In Progress",
//     lastUpdated: "Jun 25, 10:20AM",
//     priority: "Low",
//     assignedTo: {
//       name: "Arlene McCoy",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arlene",
//       role: "Frontend Dev",
//     },
//   },
//   {
//     id: "CN#252028",
//     company: "Softvence",
//     logo: "https://api.dicebear.com/7.x/initials/svg?seed=SV",
//     subject: "Chart render failed",
//     status: "In Progress",
//     lastUpdated: "Jun 25, 10:20AM",
//     priority: "Normal",
//     assignedTo: {
//       name: "Debian Junior",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Debian",
//       role: "Backend Dev",
//     },
//   },
//   {
//     id: "CN#252029",
//     company: "Next Gen",
//     logo: "https://api.dicebear.com/7.x/initials/svg?seed=NG",
//     subject: "Chart render failed",
//     status: "Solved",
//     lastUpdated: "Jun 25, 10:20AM",
//     priority: "Low",
//     assignedTo: {
//       name: "Arlene McCoy",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arlene",
//       role: "Frontend Dev",
//     },
//   },
//   {
//     id: "CN#252030",
//     company: "Acme",
//     logo: "https://api.dicebear.com/7.x/initials/svg?seed=Acme",
//     subject: "Chart render failed",
//     status: "Solved",
//     lastUpdated: "Jun 25, 10:20AM",
//     priority: "Normal",
//     assignedTo: {
//       name: "Kathryn Murphy",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kathryn",
//       role: "DevOps Eng.",
//     },
//   },
//   {
//     id: "CN#252031",
//     company: "Global Tech",
//     logo: "https://api.dicebear.com/7.x/initials/svg?seed=GT",
//     subject: "Chart render failed",
//     status: "Solved",
//     lastUpdated: "Jun 25, 10:20AM",
//     priority: "Low",
//     assignedTo: {
//       name: "Debian Junior",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Debian",
//       role: "Backend Dev",
//     },
//   },
//   {
//     id: "CN#252032",
//     company: "Tech Stark",
//     logo: "https://api.dicebear.com/7.x/initials/svg?seed=TS",
//     subject: "Chart render failed",
//     status: "In Progress",
//     lastUpdated: "Jun 25, 10:20AM",
//     priority: "Normal",
//     assignedTo: {
//       name: "Annette Black",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Annette",
//       role: "Lead Support",
//     },
//   },
//   {
//     id: "CN#252033",
//     company: "Softvence",
//     logo: "https://api.dicebear.com/7.x/initials/svg?seed=SV",
//     subject: "Chart render failed",
//     status: "Unassigned",
//     lastUpdated: "Jun 25, 10:20AM",
//     priority: "Low",
//     assignedTo: {
//       name: "Leslie Alexander",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leslie",
//       role: "Support Specialist",
//     },
//   },
//   {
//     id: "CN#252034",
//     company: "Acme",
//     logo: "https://api.dicebear.com/7.x/initials/svg?seed=Acme",
//     subject: "Chart render failed",
//     status: "In Progress",
//     lastUpdated: "Jun 25, 10:20AM",
//     priority: "Normal",
//     assignedTo: null,
//   },
// ];

const statusStyles: Record<string, string> = {
  Opened: "bg-rose-100 text-rose-600 border-rose-100",
  Unassigned: "bg-amber-100 text-amber-600 border-amber-100",
  "In Progress": "bg-blue-100 text-blue-600 border-blue-100",
  Solved: "bg-emerald-100 text-emerald-600 border-emerald-100",
};

const priorityStyles: Record<string, string> = {
  High: "bg-rose-100 text-rose-600 border-rose-100",
  Medium: "bg-amber-100 text-amber-600 border-amber-100",
  Low: "bg-emerald-100 text-emerald-600 border-emerald-100",
  Normal: "bg-indigo-100 text-indigo-600 border-indigo-100",
};

// --- Main Component ---

export function SupportTickets() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { data, isLoading } = useGetAllTicketsQuery();
  const allTickets = data?.data;
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredTickets = useMemo(() => {
    return allTickets?.filter((ticket) => {
      const matchesSearch =
        ticket.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.issueType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || ticket.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filterStatus, allTickets]);
  const totalPages = Math.ceil(filteredTickets?.length || 0 / itemsPerPage);
  const paginatedTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTickets?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTickets, currentPage, itemsPerPage]);

  if (isLoading) {
    return <SupportTicketsSkeleton />;
  }
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAction = (type: "view" | "edit", ticket: any) => {
    setSelectedTicket(ticket);
    if (type === "view") setIsViewModalOpen(true);
    else setIsEditModalOpen(true);
  };

  const handleSave = () => {
    toast.success("Ticket updated successfully!");
    setIsEditModalOpen(false);
  };

  const handleResolve = (id: string) => {
    toast.success("Ticket marked as resolved!" + id);
    setIsViewModalOpen(false);
  };

  return (
    <div className="space-y-14 min-h-screen">
      {/* Overview Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <DashboardStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            growth={stat.growth}
            growthType={stat.growthType as any}
            growthColor={stat.growthColor as any}
            description={stat.description}
            descriptionType={stat.descriptionType as any}
            icon={stat.icon}
            iconBgColor={stat.iconBgColor}
          />
        ))}
      </div>

      {/* Support Tickets Table Section */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Ticket Records
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by ticket ID or subject..."
                  className="pl-10 h-11 w-full md:w-[320px] bg-gray-50/50 border-gray-100 rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="h-11 w-full md:w-[160px] border-gray-100 bg-white rounded-lg text-gray-500">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Opened">Opened</SelectItem>
                  <SelectItem value="Unassigned">Unassigned</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Solved">Solved</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className="h-11 px-6 rounded-lg bg-[#1D4ED8] hover:bg-blue-800 text-white font-medium shadow-md shadow-blue-100 transition-all active:scale-[0.98]"
                onClick={() => navigate("/admin/support/team-view")}
              >
                <Users className="mr-2 h-4 w-4" />
                Team View
              </Button>
            </div>
          </div>

          <div className="overflow-hidden border border-gray-50 rounded-xl">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow className="hover:bg-transparent border-gray-50">
                  <TableHead className="w-[50px] p-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 text-sm">
                    Ticket ID
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 text-sm">
                    Company Name
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 text-sm">
                    Subject
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 text-sm">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 text-sm">
                    Last Updated
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 text-sm text-center">
                    Priority
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 text-sm">
                    Assigned To
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 text-sm text-right pr-6">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTickets?.map((ticket, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50/50 border-gray-50"
                  >
                    <TableCell className="p-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                    </TableCell>
                    <TableCell className="text-gray-900 font-medium text-sm">
                      {ticket.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg border border-gray-100 bg-white shadow-sm">
                          <Avatar className="h-6 w-6">
                            {/* <AvatarImage src={ticket} /> */}
                            <AvatarFallback>
                              {ticket.companyName}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <span className="font-medium text-gray-700 text-sm">
                          {ticket.companyName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm max-w-[200px] truncate">
                      {ticket.issueType}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-3 py-1 rounded-full text-[11px] border-none font-medium",
                          statusStyles[ticket.status],
                        )}
                      >
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm whitespace-nowrap">
                      {ticket.updatedAt}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-3 py-1 rounded-md text-[11px] border-none font-medium min-w-[60px] inline-block",
                          priorityStyles[ticket.priority] ||
                            priorityStyles.Normal,
                        )}
                      >
                        {ticket.priority || "Normal"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {ticket.assignments[0].user?.name ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7 border-2 border-white shadow-sm">
                            <AvatarImage
                              src={
                                import.meta.env.VITE_SOCKET_URL + ticket.assignments[0].user?.profileImage || ""
                              }
                            />
                            <AvatarFallback>
                              {ticket.assignments[0].user?.name || ""}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-700 font-medium">
                            {ticket.assignments[0].user?.name || ""}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 ">
                          Unassigned
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleAction("view", ticket)}
                          className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleAction("edit", ticket)}
                          className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 mb-5">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {Math.min(
                (currentPage - 1) * itemsPerPage + 1,
                filteredTickets?.length || 0,
              )}{" "}
              to{" "}
              {Math.min(
                currentPage * itemsPerPage,
                filteredTickets?.length || 0,
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-blue-600">
              {filteredTickets?.length}
            </span>{" "}
            tickets
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 text-gray-500 border-gray-200"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Prev
            </Button>
            <div className="flex items-center gap-1 mx-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "h-9 w-9 p-0 font-medium",
                      currentPage === page
                        ? "bg-blue-600 hover:bg-blue-700 text-white font-bold"
                        : "text-gray-400",
                    )}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                ),
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 text-gray-500 border-gray-200"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* --- Modals --- */}
      <SupportDetailsModal
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        ticket={selectedTicket}
        handleResolve={handleResolve}
      />
      <EditTicketModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        selectedTicket={selectedTicket}
        handleSave={handleSave}
      />
    </div>
  );
}
