import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const CustomSwitch = ({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={cn(
      "relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 focus:outline-none",
      checked
        ? "bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.3)]"
        : "bg-gray-200",
    )}
  >
    <span
      className={cn(
        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm",
        checked ? "translate-x-6" : "translate-x-1",
      )}
    />
  </button>
);

interface AssignTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketId?: string;
}

const employees = [
  {
    name: "Alex chen",
    role: "Senior support engineer",
    status: "Available",
    activeTickets: 3,
    tags: ["Authentication", "Performance", "Authentication"],
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
  {
    name: "Alex chen",
    role: "Senior support engineer",
    status: "Busy",
    activeTickets: 3,
    tags: ["Authentication", "Performance", "Authentication"],
    avatar: "https://i.pravatar.cc/150?u=alex2",
  },
  {
    name: "Alex chen",
    role: "Senior support engineer",
    status: "Available",
    activeTickets: 3,
    tags: ["Authentication", "Performance", "Authentication"],
    avatar: "https://i.pravatar.cc/150?u=alex3",
  },
];

export const AssignTicketModal: React.FC<AssignTicketModalProps> = ({
  open,
  onOpenChange,
  ticketId,
}) => {
  const [showAvailableOnly, setShowAvailableOnly] = useState(true);

  const filteredEmployees = showAvailableOnly
    ? employees.filter((e) => e.status === "Available")
    : employees;

  const handleAssign = (agentName: string) => {
    toast.success(`Ticket ${ticketId} assigned to ${agentName}`, {
      description: "Personnel has been notified and task added to workload.",
      className: "rounded-xl font-medium",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-none rounded-3xl shadow-2xl bg-[#F8FAFF]">
        <DialogHeader className="p-6 bg-white border-b border-gray-100 flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Team Workload
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </DialogHeader>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {/* Top Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-blue-50/50 shadow-sm flex flex-col gap-1 transition-all hover:border-blue-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Person Available
              </span>
              <span className="text-3xl font-bold text-gray-900 leading-none">
                3
              </span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-blue-50/50 shadow-sm flex flex-col gap-1 transition-all hover:border-blue-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Active Ticket
              </span>
              <span className="text-3xl font-bold text-gray-900 leading-none">
                6
              </span>
            </div>
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center space-x-3 bg-white/50 p-2 rounded-xl">
            <CustomSwitch
              checked={showAvailableOnly}
              onCheckedChange={setShowAvailableOnly}
            />
            <Label
              className="text-sm font-semibold text-gray-700 cursor-pointer"
              onClick={() => setShowAvailableOnly(!showAvailableOnly)}
            >
              Show available employee only
            </Label>
          </div>

          {/* Employee List */}
          <div className="space-y-4">
            {filteredEmployees.map((emp, index) => (
              <div
                key={index}
                className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-14 w-14 rounded-2xl shadow-inner border-2 border-white">
                        <AvatarImage src={emp.avatar} />
                        <AvatarFallback>{emp.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">
                          {emp.name}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">
                          {emp.role}
                        </span>
                      </div>
                    </div>
                    <Badge
                      className={cn(
                        "px-3 py-1 rounded-lg text-[11px] font-bold border-none",
                        emp.status === "Available"
                          ? "bg-emerald-50 text-emerald-500"
                          : "bg-amber-50 text-amber-500",
                      )}
                    >
                      {emp.status === "Available" ? "Avaialable" : "Busy"}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold">
                      <Clock className="h-4 w-4" />
                      {emp.activeTickets} active ticket
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {emp.tags.map((tag, tIndex) => (
                        <Badge
                          key={tIndex}
                          variant="secondary"
                          className="bg-blue-50/50 text-blue-600 hover:bg-blue-50 border-none px-3 py-1 text-[10px] font-bold rounded-lg"
                        >
                          {tag}
                        </Badge>
                      ))}
                      <Badge className="bg-gray-50 text-gray-400 border-none px-2 py-1 text-[10px] font-bold rounded-lg">
                        +1
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button
                      variant="outline"
                      className="rounded-xl h-11 border-gray-200 text-gray-600 font-bold text-xs"
                    >
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                    <Button
                      className={cn(
                        "rounded-xl h-11 font-bold text-xs shadow-lg transition-all active:scale-95",
                        emp.status === "Available"
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100/50"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100 shadow-none border-none",
                      )}
                      disabled={emp.status !== "Available"}
                      onClick={() => handleAssign(emp.name)}
                    >
                      Assign Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
