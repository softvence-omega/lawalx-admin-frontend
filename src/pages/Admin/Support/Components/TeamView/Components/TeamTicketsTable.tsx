import { useState } from "react";
import { Search, UserPlus, ChevronLeft, ChevronRight } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { AssignTicketModal } from "./AssignTicketModal";

const tickets = [
  {
    id: "TI#252024",
    company: "Acme",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=Acme",
    summary: "Login authentication failing for...",
    priority: "High",
    status: "Opened",
    created: "2 hours ago",
    updated: "2 hours ago",
    assigned: null,
  },
  {
    id: "TI#252024",
    company: "Global Tech",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=GT",
    summary: "Dashboard loading performan...",
    priority: "High",
    status: "Opened",
    created: "4 hours ago",
    updated: "4 hours ago",
    assigned: {
      name: "Leslie Alexander",
      avatar: "https://i.pravatar.cc/150?u=leslie",
    },
  },
  {
    id: "TI#252024",
    company: "Tech Stark",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=TS",
    summary: "Export functionality not working",
    priority: "Medium",
    status: "Unassigned",
    created: "Yesterday",
    updated: "Yesterday",
    assigned: {
      name: "Annette Black",
      avatar: "https://i.pravatar.cc/150?u=annette",
    },
  },
  {
    id: "TI#252024",
    company: "Next Gen",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=NG",
    summary: "Email notifications not being sent",
    priority: "Low",
    status: "In Progress",
    created: "Jun 25, 10:20AM",
    updated: "Jun 25, 10:20AM",
    assigned: null,
  },
  {
    id: "TI#252024",
    company: "Softvence",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=SV",
    summary: "Email notifications not being sent",
    priority: "Normal",
    status: "In Progress",
    created: "Jun 25, 10:20AM",
    updated: "Jun 25, 10:20AM",
    assigned: {
      name: "Debian Junior",
      avatar: "https://i.pravatar.cc/150?u=debian",
    },
  },
  {
    id: "TI#252024",
    company: "Next Gen",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=NG",
    summary: "API rate limiting too aggressive",
    priority: "Low",
    status: "Solved",
    created: "Jun 25, 10:20AM",
    updated: "Jun 25, 10:20AM",
    assigned: {
      name: "Arlene McCoy",
      avatar: "https://i.pravatar.cc/150?u=arlene",
    },
  },
  {
    id: "TI#252024",
    company: "Acme",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=Acme",
    summary: "Chart render failed",
    priority: "Normal",
    status: "Solved",
    created: "Jun 25, 10:20AM",
    updated: "Jun 25, 10:20AM",
    assigned: {
      name: "Kathryn Murphy",
      avatar: "https://i.pravatar.cc/150?u=kathryn",
    },
  },
  {
    id: "TI#252024",
    company: "Global Tech",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=GT",
    summary: "Chart render failed",
    priority: "Low",
    status: "Solved",
    created: "Jun 25, 10:20AM",
    updated: "Jun 25, 10:20AM",
    assigned: null,
  },
];

const priorityStyles: Record<string, string> = {
  High: "bg-rose-50 text-rose-500 border-rose-100",
  Medium: "bg-amber-50 text-amber-500 border-amber-100",
  Low: "bg-emerald-50 text-emerald-500 border-emerald-100",
  Normal: "bg-indigo-50 text-indigo-500 border-indigo-100",
};

const statusStyles: Record<string, string> = {
  Opened: "bg-rose-50 text-rose-500 border-rose-100",
  Unassigned: "bg-amber-50 text-amber-500 border-amber-100",
  "In Progress": "bg-blue-50 text-blue-500 border-blue-100",
  Solved: "bg-emerald-50 text-emerald-500 border-emerald-100",
};

export const TeamTicketsTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<
    string | undefined
  >();

  const handleAssignClick = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setIsAssignModalOpen(true);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Support Tickets
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by ticket ID client or keywords..."
                className="pl-10 h-11 w-[320px] bg-gray-50/50 border-gray-100 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="h-11 w-[130px] bg-white border-gray-200 rounded-lg">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Opened</SelectItem>
                <SelectItem value="solved">Solved</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="h-11 w-[130px] bg-white border-gray-200 rounded-lg">
                <SelectValue placeholder="All Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="h-11 w-[130px] bg-white border-gray-200 rounded-lg">
                <SelectValue placeholder="All Staff" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Staff</SelectItem>
                <SelectItem value="staff1">Staff 1</SelectItem>
              </SelectContent>
            </Select>
            <Button className="h-11 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
              Staff List
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-t-lg border border-gray-100 overflow-hidden">
          <Table className="border-collapse">
            <TableHeader className="bg-[#E2E8F0]/50 h-12 border-none [&_tr]:border-b-0">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[50px] px-4">
                  <Input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                  />
                </TableHead>
                <TableHead className="font-semibold text-gray-900 uppercase tracking-wider text-[11px]">
                  Ticket ID
                </TableHead>
                <TableHead className="font-semibold text-gray-900 uppercase tracking-wider text-[11px]">
                  Company Name
                </TableHead>
                <TableHead className="font-semibold text-gray-900 uppercase tracking-wider text-[11px]">
                  Issue Summary
                </TableHead>
                <TableHead className="font-semibold text-gray-900 uppercase tracking-wider text-[11px]">
                  Priority
                </TableHead>
                <TableHead className="font-semibold text-gray-900 uppercase tracking-wider text-[11px]">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-900 uppercase tracking-wider text-[11px]">
                  Created
                </TableHead>
                <TableHead className="font-semibold text-gray-900 uppercase tracking-wider text-[11px]">
                  Last Updated
                </TableHead>
                <TableHead className="font-semibold text-gray-900 uppercase tracking-wider text-[11px]">
                  Assigned Staff
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket, index) => (
                <TableRow
                  key={index}
                  className="border-b border-gray-50/50 odd:bg-white even:bg-gray-50/30 hover:bg-gray-100/50 transition-colors"
                >
                  <TableCell className="py-4 px-4">
                    <Input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 text-sm whitespace-nowrap py-4">
                    {ticket.id}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 rounded-lg border">
                        <AvatarImage src={ticket.logo} />
                        <AvatarFallback>{ticket.company[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-gray-900">
                        {ticket.company}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500 max-w-[200px] truncate py-4">
                    {ticket.summary}
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        "px-3 py-1 rounded-md text-[11px] font-semibold border-none",
                        priorityStyles[ticket.priority],
                      )}
                    >
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        "px-3 py-1 rounded-full text-[11px] font-semibold border-none",
                        statusStyles[ticket.status],
                      )}
                    >
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500 whitespace-nowrap py-4">
                    {ticket.created}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500 whitespace-nowrap py-4">
                    {ticket.updated}
                  </TableCell>
                  <TableCell className="py-4">
                    {ticket.assigned ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={ticket.assigned.avatar} />
                          <AvatarFallback>
                            {ticket.assigned.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                          {ticket.assigned.name}
                        </span>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="lg"
                        className="h-10 px-4 cursor-pointer hover:shadow-lg rounded-lg text-gray-500 flex items-center gap-2 border-gray-200"
                        onClick={() => handleAssignClick(ticket.id)}
                      >
                        <UserPlus size={24} />
                        Assign
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-50">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-900">1 to 11</span>{" "}
            of <span className="font-semibold text-blue-600">500</span> client
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="h-10 px-4 text-gray-500 gap-2 font-medium"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <div className="flex items-center gap-1 mx-2">
              <Button
                variant="default"
                className="h-10 w-10 p-0 bg-blue-600 rounded-lg"
              >
                1
              </Button>
              <Button
                variant="ghost"
                className="h-10 w-10 p-0 text-gray-500 rounded-lg"
              >
                2
              </Button>
              <Button
                variant="ghost"
                className="h-10 w-10 p-0 text-gray-500 rounded-lg"
              >
                3
              </Button>
              <span className="px-2 text-gray-300">...</span>
              <Button
                variant="ghost"
                className="h-10 w-10 p-0 text-gray-500 rounded-lg"
              >
                30
              </Button>
            </div>
            <Button
              variant="ghost"
              className="h-10 px-4 text-gray-500 gap-2 font-medium"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <AssignTicketModal
        open={isAssignModalOpen}
        onOpenChange={setIsAssignModalOpen}
        ticketId={selectedTicketId}
      />
    </div>
  );
};
