import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  X,
  Building2,
  Calendar,
  Clock,
  AlertCircle,
  ChevronLeft,
} from "lucide-react";

// Status styles removed as they are now handled with direct hex codes or utility classes matching the design.

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-3xl p-0 border-none shadow-2xl rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Support Ticket Details
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors group"
          >
            <X className="h-6 w-6 text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>

        <div className="px-8 space-y-8 bg-white max-h-[85vh] overflow-y-auto">
          {/* Header Info Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className=" flex-1">
              <div className="flex flex-wrap items-center gap-3 pb-5">
                <span className="text-sm font-medium text-gray-500">
                  Ticket ID:{" "}
                  <span className="text-gray-900 font-semibold">
                    {ticket?.id}
                  </span>
                </span>
                <Badge
                  variant="outline"
                  className="bg-[#F1F4F9] text-[#5C6E91] border-none px-4 py-1.5 rounded-full text-[12px] font-semibold"
                >
                  {ticket?.status || "Opened"}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-[#FFF1F1] text-[#E05B5B] border-none px-4 py-1.5 rounded-full text-[12px] font-semibold"
                >
                  {ticket?.priority || "High"} Priority
                </Badge>
              </div>

              <h2 className="text-xl font-medium text-[#1E293B] leading-tight max-w-lg">
                {ticket?.subject || "Subject not available"}
              </h2>
            </div>
            {/* Assigned Section */}
            <div className="flex flex-col gap-3 min-w-[200px]">
              <span className="text-sm font-bold text-[#1E293B]">
                Assigned to:
              </span>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm ring-1 ring-gray-100">
                  <AvatarImage src={ticket?.assignedTo?.avatar} />
                  <AvatarFallback className="bg-indigo-50 text-indigo-600 font-bold">
                    {ticket?.assignedTo?.name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-[15px] font-medium text-[#1E293B]">
                    {ticket?.assignedTo?.name || "Kathryn Murphy"}
                  </span>
                  <span className="text-[13px] text-[#64748B] font-medium">
                    {ticket?.assignedTo?.role || "DevOPS Eng."}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <div className="flex items-center gap-2 text-[#475569] text-[13px] font-medium">
              <Building2 className="h-4 w-4 text-[#94A3B8]" />
              <span>
                {ticket?.companyFullName ||
                  ticket?.company ||
                  "Acme Corporation"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#475569] text-[13px] font-medium">
              <Calendar className="h-4 w-4 text-[#94A3B8]" />
              <span>Created: {ticket?.createdDate || "3-July-2025"}</span>
            </div>
            <div className="flex items-center gap-2 text-[#475569] text-[13px] font-medium">
              <Clock className="h-4 w-4 text-[#94A3B8]" />
              <span>Updated: {ticket?.updatedDate || "3-July-2025"}</span>
            </div>
          </div>
          {/* Issue Description Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-extrabold text-[#475569] uppercase tracking-wider">
                Issue Description
              </span>
              <AlertCircle className="h-3.5 w-3.5 text-[#94A3B8]" />
            </div>
            <div className="relative group">
              <div className="w-full bg-[#FAFBFF] border border-[#E2E8F0] rounded-xl p-6 min-h-[180px] transition-all hover:border-[#CBD5E1]">
                <p className="text-[#334155] text-[15px] leading-[1.6] whitespace-pre-wrap font-medium">
                  {ticket?.description ||
                    'Hello Support Team,\nI\'m trying to export our analytics data to CSV format but keep getting an error message. When I click on the "Export to CSV" button in the Reports section, the loading spinner appears for about 10 seconds and then displays "Export Failed: Unknown Error". I\'ve tried this on multiple browsers (Chrome, Firefox, and Edge) with the same result. This functionality was working fine last week.\nCould you please look into this issue as soon as possible? We need this data for our quarterly review.'}
                </p>
                <div className="absolute bottom-3 right-3 opacity-30">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 11L1 1M11 5L5 11M11 8L8 11"
                      stroke="#94A3B8"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex items-center justify-between bg-white">
          <Button
            variant="outline"
            className="h-12 px-6 rounded-xl text-[#475569] font-bold border-gray-200 hover:bg-gray-50 flex items-center gap-2"
            onClick={() => onOpenChange(false)}
          >
            <ChevronLeft className="h-5 w-5" />
            Back to Ticket list
          </Button>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="h-12 px-6 rounded-xl text-[#334155] font-bold border-gray-200 hover:bg-gray-50"
              onClick={() => handleResolve(ticket?.id)}
            >
              Mark as resolved
            </Button>
            <Button
              className="h-12 px-8 rounded-xl bg-[#1D6DEF] hover:bg-[#1559C7] text-white font-bold shadow-md shadow-blue-100 transition-all active:scale-[0.98]"
              onClick={() => toast.info("Opening message dialog...")}
            >
              Reply to Customer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportDetailsModal;
