import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  X,
  Building2,
  Calendar,
  Clock,
  AlertCircle,
  ChevronLeft,
} from "lucide-react";

const statusStyles: Record<string, string> = {
  Opened: "bg-rose-100 text-rose-600 border-rose-100",
  Unassigned: "bg-amber-100 text-amber-600 border-amber-100",
  "In Progress": "bg-blue-100 text-blue-600 border-blue-100",
  Solved: "bg-emerald-100 text-emerald-600 border-emerald-100",
};

const SupportDetailsModal = ({
  open,
  onOpenChange,
  ticket,
  handleResolve,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: any;
  handleResolve: (id: string) => void;
}) => {
  return (
    <div className="">
      {/* View Details Modal */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="min-w-2xl p-0 border-none shadow-2xl rounded-2xl">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Support Ticket Details
              </DialogTitle>
              <button
                onClick={() => onOpenChange(false)}
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
                      {ticket?.id}
                    </span>
                  </span>
                  <Badge
                    className={cn(
                      "px-3 py-1 rounded-full text-[11px] border-none font-medium",
                      statusStyles[ticket?.status],
                    )}
                  >
                    {ticket?.status}
                  </Badge>
                  <Badge
                    className={cn(
                      "px-3 py-1 rounded-full text-[11px] border-none font-medium bg-rose-50 text-rose-500",
                    )}
                  >
                    {ticket?.priority} Priority
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {ticket?.subject}
                </h2>
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    <span className="">
                      {ticket?.companyFullName || ticket?.company}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Created: {ticket?.createdDate || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>Updated: {ticket?.updatedDate || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Assigned to:
                </span>
                {ticket?.assignedTo ? (
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50">
                    <Avatar className="h-10 w-10 border border-gray-200">
                      {/* <AvatarImage src={ticket.assignedTo.avatar} /> */}
                      <AvatarImage className="" />
                      <AvatarFallback>
                        {ticket.assignedTo.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {ticket.assignedTo.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {ticket.assignedTo.role}
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
                  {ticket?.description || "No description provided."}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <Button
                variant="outline"
                className="h-11 px-6 rounded-xl text-gray-600 hover:bg-gray-50"
                onClick={() => onOpenChange(false)}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Ticket list
              </Button>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="h-11 px-6 rounded-xl text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                  onClick={() => handleResolve(ticket?.id)}
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
    </div>
  );
};

export default SupportDetailsModal;
