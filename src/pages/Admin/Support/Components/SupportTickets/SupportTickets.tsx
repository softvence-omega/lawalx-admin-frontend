"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Ticket,
  UserCheck,
  AlertCircle,
  Clock,
  Search,
  Filter,
  Eye,
  Pencil,
  ArrowUpRight,
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
  X,
  Building2,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// --- Mock Data ---

const overviewStats = [
  {
    title: "Opened Tickets",
    value: "520",
    change: "+12%",
    changeType: "up",
    footer: "355 ticket already solved in this month",
    icon: Ticket,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    footerBg: "bg-emerald-50",
  },
  {
    title: "Assigned Ticket",
    value: "150",
    change: "+5%",
    changeType: "up",
    footer: "34 ticket more then previous month",
    icon: UserCheck,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-100",
    footerBg: "bg-indigo-50",
  },
  {
    title: "Unassigned Ticket",
    value: "15",
    change: "-5%",
    changeType: "down",
    footer: "3 ticket lesser then previous month",
    icon: AlertCircle,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    footerBg: "bg-blue-50",
  },
  {
    title: "Average Response Time",
    value: "2h 15m",
    change: "+12%",
    changeType: "up",
    footer: "15 minutes slower then previous month",
    icon: Clock,
    iconColor: "text-rose-600",
    iconBg: "bg-rose-100",
    footerBg: "bg-rose-50",
  },
];

const initialTickets = [
  {
    id: "CN#252024",
    company: "Acme",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=Acme",
    subject: "CSV file upload failed",
    status: "Opened",
    lastUpdated: "2 hours ago",
    priority: "High",
    assignedTo: {
      name: "Kathryn Murphy",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Acme",
      role: "DevOps Eng.",
    },
    description:
      "Hello Support Team, I'm trying to export our analytics data to CSV format but keep getting an error message. When I click on the 'Export to CSV' button in the Reports section, the loading spinner appears for about 10 seconds and then displays 'Export Failed: Unknown Error'. I've tried this on multiple browsers (Chrome, Firefox, and Edge) with the same result. This functionality was working fine last week. Could you please look into this issue as soon as possible? We need this data for our quarterly review.",
    createdDate: "3-July-2025",
    updatedDate: "3-July-2025",
    companyFullName: "Acme Corporation",
  },
  {
    id: "CN#252025",
    company: "Global Tech",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=GT",
    subject: "Chart render failed",
    status: "Opened",
    lastUpdated: "4 hours ago",
    priority: "High",
    assignedTo: {
      name: "Leslie Alexander",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leslie",
      role: "Support Specialist",
    },
  },
  {
    id: "CN#252026",
    company: "Tech Stark",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=TS",
    subject: "I don't know what happen...",
    status: "Unassigned",
    lastUpdated: "Yesterday",
    priority: "Medium",
    assignedTo: {
      name: "Annette Black",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Annette",
      role: "Lead Support",
    },
  },
  {
    id: "CN#252027",
    company: "Next Gen",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=NG",
    subject: "Chart render failed",
    status: "In Progress",
    lastUpdated: "Jun 25, 10:20AM",
    priority: "Low",
    assignedTo: {
      name: "Arlene McCoy",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arlene",
      role: "Frontend Dev",
    },
  },
  {
    id: "CN#252028",
    company: "Softvence",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=SV",
    subject: "Chart render failed",
    status: "In Progress",
    lastUpdated: "Jun 25, 10:20AM",
    priority: "Normal",
    assignedTo: {
      name: "Debian Junior",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Debian",
      role: "Backend Dev",
    },
  },
  {
    id: "CN#252029",
    company: "Next Gen",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=NG",
    subject: "Chart render failed",
    status: "Solved",
    lastUpdated: "Jun 25, 10:20AM",
    priority: "Low",
    assignedTo: {
      name: "Arlene McCoy",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arlene",
      role: "Frontend Dev",
    },
  },
  {
    id: "CN#252030",
    company: "Acme",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=Acme",
    subject: "Chart render failed",
    status: "Solved",
    lastUpdated: "Jun 25, 10:20AM",
    priority: "Normal",
    assignedTo: {
      name: "Kathryn Murphy",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kathryn",
      role: "DevOps Eng.",
    },
  },
  {
    id: "CN#252031",
    company: "Global Tech",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=GT",
    subject: "Chart render failed",
    status: "Solved",
    lastUpdated: "Jun 25, 10:20AM",
    priority: "Low",
    assignedTo: {
      name: "Debian Junior",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Debian",
      role: "Backend Dev",
    },
  },
  {
    id: "CN#252032",
    company: "Tech Stark",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=TS",
    subject: "Chart render failed",
    status: "In Progress",
    lastUpdated: "Jun 25, 10:20AM",
    priority: "Normal",
    assignedTo: {
      name: "Annette Black",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Annette",
      role: "Lead Support",
    },
  },
  {
    id: "CN#252033",
    company: "Softvence",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=SV",
    subject: "Chart render failed",
    status: "Unassigned",
    lastUpdated: "Jun 25, 10:20AM",
    priority: "Low",
    assignedTo: {
      name: "Leslie Alexander",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leslie",
      role: "Support Specialist",
    },
  },
  {
    id: "CN#252034",
    company: "Acme",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=Acme",
    subject: "Chart render failed",
    status: "In Progress",
    lastUpdated: "Jun 25, 10:20AM",
    priority: "Normal",
    assignedTo: null,
  },
];

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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const filteredTickets = useMemo(() => {
    return initialTickets.filter((ticket) => {
      const matchesSearch =
        ticket.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || ticket.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filterStatus]);

  const handleAction = (type: "view" | "edit", ticket: any) => {
    setSelectedTicket(ticket);
    if (type === "view") setIsViewModalOpen(true);
    else setIsEditModalOpen(true);
  };

  const handleSave = () => {
    toast.success("Ticket updated successfully!");
    setIsEditModalOpen(false);
  };

  const handleResolve = () => {
    toast.success("Ticket marked as resolved!");
    setIsViewModalOpen(false);
  };

  return (
    <div className="space-y-8 p-6 bg-white min-h-screen">
      {/* Overview Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="overflow-hidden border-none shadow-sm">
            <CardContent className="p-0">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className={cn("p-2 rounded-lg", stat.iconBg)}>
                    <stat.icon className={cn("h-6 w-6", stat.iconColor)} />
                  </div>
                  <span className="text-sm font-medium text-gray-400">
                    {stat.title}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
                  <div
                    className={cn(
                      "flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border",
                      stat.changeType === "up"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : "bg-rose-50 text-rose-600 border-rose-100",
                    )}
                  >
                    {stat.change}
                    {stat.changeType === "up" ? (
                      <ArrowUpRight className="h-3 w-3 ml-0.5" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 ml-0.5" />
                    )}
                  </div>
                </div>
              </div>
              <div className={cn("px-6 py-3", stat.footerBg)}>
                <p className="text-xs text-gray-500 font-medium">
                  {stat.footer}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Support Tickets Section */}
      <div className="space-y-4 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">Support Tickets</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search user..."
                className="pl-10 h-10 w-[240px] border-gray-100 bg-gray-50/50 rounded-lg focus-visible:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[120px] h-10 border-gray-100 bg-gray-50/50 rounded-lg text-gray-500">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Opened">Opened</SelectItem>
                <SelectItem value="Unassigned">Unassigned</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Solved">Solved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-hidden border border-gray-50 rounded-xl">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="hover:bg-transparent border-gray-50">
                <TableHead className="w-[50px]">
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
              {filteredTickets.map((ticket, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50/50 border-gray-50"
                >
                  <TableCell>
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
                          <AvatarImage src={ticket.logo} />
                          <AvatarFallback>{ticket.company[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                      <span className="font-medium text-gray-700 text-sm">
                        {ticket.company}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm max-w-[200px] truncate">
                    {ticket.subject}
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
                    {ticket.lastUpdated}
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
                    {ticket.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7 border-2 border-white shadow-sm">
                          <AvatarImage src={ticket.assignedTo.avatar} />
                          <AvatarFallback>
                            {ticket.assignedTo.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-700 font-medium">
                          {ticket.assignedTo.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 italic">
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

        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-900">1 to 11</span>{" "}
            of <span className="font-semibold text-blue-600">500</span> client
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 text-gray-500 border-gray-200"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Prev
            </Button>
            <div className="flex items-center gap-1 mx-2">
              <Button
                variant="default"
                size="sm"
                className="h-9 w-9 p-0 bg-indigo-600 hover:bg-indigo-700"
              >
                1
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-gray-500"
              >
                2
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-gray-500"
              >
                3
              </Button>
              <span className="px-2 text-gray-400">...</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-gray-500"
              >
                30
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 text-gray-500 border-gray-200"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* --- Modals --- */}

      {/* View Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="min-w-2xl p-0 border-none shadow-2xl rounded-2xl">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Support Ticket Details
              </DialogTitle>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">
                    Ticket ID:{" "}
                    <span className="font-semibold text-gray-900">
                      {selectedTicket?.id}
                    </span>
                  </span>
                  <Badge
                    className={cn(
                      "px-3 py-1 rounded-full text-[11px] border-none font-medium",
                      statusStyles[selectedTicket?.status],
                    )}
                  >
                    {selectedTicket?.status}
                  </Badge>
                  <Badge
                    className={cn(
                      "px-3 py-1 rounded-full text-[11px] border-none font-medium bg-rose-50 text-rose-500",
                    )}
                  >
                    {selectedTicket?.priority} Priority
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedTicket?.subject}
                </h2>
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    <span className="">
                      {selectedTicket?.companyFullName ||
                        selectedTicket?.company}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Created: {selectedTicket?.createdDate || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>Updated: {selectedTicket?.updatedDate || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Assigned to:
                </span>
                {selectedTicket?.assignedTo ? (
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50">
                    <Avatar className="h-10 w-10 border border-gray-200">
                      {/* <AvatarImage src={selectedTicket.assignedTo.avatar} /> */}
                      <AvatarImage className="" />
                      <AvatarFallback>
                        {selectedTicket.assignedTo.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {selectedTicket.assignedTo.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedTicket.assignedTo.role}
                      </p>
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-gray-400 italic">
                    No one assigned
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">
                  Issue Description
                </span>
                <AlertCircle className="h-3.5 w-3.5 text-gray-400" />
              </div>
              <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/30">
                <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                  {selectedTicket?.description || "No description provided."}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <Button
                variant="outline"
                className="h-11 px-6 rounded-xl text-gray-600 hover:bg-gray-50"
                onClick={() => setIsViewModalOpen(false)}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Ticket list
              </Button>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="h-11 px-6 rounded-xl text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                  onClick={handleResolve}
                >
                  Mark as resolved
                </Button>
                <Button
                  className="h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={() => toast.info("Opening message dialog...")}
                >
                  Reply to Customer
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Ticket Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-xl p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-gray-900">
                Edit Support Ticket
              </DialogTitle>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="p-8 space-y-6 max-h-[80vh] overflow-y-auto bg-gray-50/10">
            <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-indigo-50/30 border border-indigo-50">
              <div className="space-y-1">
                <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                  Ticket ID:
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {selectedTicket?.id}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                  Subject:
                </p>
                <p className="text-sm font-bold text-gray-900 max-w-[150px] truncate">
                  {selectedTicket?.subject}
                </p>
              </div>
              <div className="space-y-1 mt-2">
                <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                  Requested By:
                </p>
                <div className="flex items-center gap-2">
                  <Building2 className="h-3 w-3 text-indigo-400" />
                  <p className="text-sm font-bold text-gray-900">
                    {selectedTicket?.company}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Ticket Status
                </label>
                <Select defaultValue={selectedTicket?.status}>
                  <SelectTrigger className="h-11 rounded-xl bg-white border-gray-200">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Opened">Opened</SelectItem>
                    <SelectItem value="Unassigned">Unassigned</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Solved">Solved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Priority
                </label>
                <Select defaultValue={selectedTicket?.priority}>
                  <SelectTrigger className="h-11 rounded-xl bg-white border-gray-200">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Normal">Normal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Assign to
                </label>
                <Select
                  defaultValue={
                    selectedTicket?.assignedTo?.name || "unassigned"
                  }
                >
                  <SelectTrigger className="h-11 rounded-xl bg-white border-gray-200">
                    <SelectValue placeholder="Select staff" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    <SelectItem value="Kathryn Murphy">
                      Kathryn Murphy
                    </SelectItem>
                    <SelectItem value="Leslie Alexander">
                      Leslie Alexander
                    </SelectItem>
                    <SelectItem value="Annette Black">Annette Black</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-bold text-gray-700">
                    Admin Note
                  </label>
                  <div className="group relative">
                    <AlertCircle className="h-3 w-3 text-gray-400" />
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    className="w-full min-h-[100px] p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all text-sm text-gray-600 resize-none"
                    placeholder="Customer reported this issue after the v2.4.0 deployment..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-7 bg-indigo-600 rounded-full relative">
                    <div className="absolute left-4 top-0.5 h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-widest text-[11px]">
                    Issue Description
                  </label>
                </div>
                <textarea
                  className="w-full min-h-[120px] p-4 rounded-2xl border border-gray-200 bg-gray-50/30 text-sm text-gray-500 cursor-not-allowed"
                  disabled
                  value={selectedTicket?.description}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <Button
                variant="outline"
                className="h-11 px-6 rounded-xl text-gray-600"
                onClick={() => setIsEditModalOpen(false)}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                className="h-11 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100"
                onClick={handleSave}
              >
                Save changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
