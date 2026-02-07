import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  X,
  HelpCircle,
  Plus,
  ArrowLeft,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AssignConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeName?: string;
  onBack?: () => void;
  onConfirm?: () => void;
}

export const AssignConfirmModal: React.FC<AssignConfirmModalProps> = ({
  open,
  onOpenChange,
  employeeName = "Alex Chen",
  onBack,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-md xl:min-w-3xl p-0 overflow-hidden border-none rounded-xl shadow-2xl bg-white">
        {/* Header */}
        <DialogHeader className="p-6 flex flex-row items-center justify-between space-y-0 border-b border-gray-100">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Assign Ticket to {employeeName}
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </DialogHeader>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Ticket Meta */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold text-gray-500">
              Ticket ID: <span className="text-gray-900">#TI-35</span>
            </span>
            <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-none px-3 py-1.5 rounded-lg flex items-center gap-2 font-medium">
              Opened <ChevronDown className="h-3.5 w-3.5" />
            </Badge>
            <Badge className="bg-orange-50 text-orange-500 hover:bg-orange-50 border-none px-3 py-1.5 rounded-lg font-medium">
              Medium <ChevronDown className="h-3.5 w-3.5" />
            </Badge>
            <Badge className="bg-gray-50 text-gray-500 hover:bg-gray-50 border-none px-3 py-1.5 rounded-lg flex items-center gap-2 font-medium">
              <Calendar className="h-3.5 w-3.5" />
              July 10
            </Badge>
          </div>

          {/* Issue Description */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-bold text-gray-900">
                Issue Description
              </label>
              <HelpCircle className="h-4 w-4 text-gray-300" />
            </div>
            <div className="relative">
              <textarea
                className="w-full h-48 p-5 text-sm text-gray-600 border border-blue-100 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none leading-relaxed"
                defaultValue='Hello Support Team,
I&apos;m trying to export our analytics data to CSV format but keep getting an error message. When I click on the "Export to CSV" button in the Reports section, the loading spinner appears for about 10 seconds and then displays "Export Failed: Unknown Error". I&apos;ve tried this on multiple browsers (Chrome, Firefox, and Edge) with the same result'
              />
              <div className="absolute bottom-4 right-4 text-gray-300">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 11L11 1M11 1V11M11 1H1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Attached Files */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-bold text-gray-900">
                Attached File
              </label>
              <HelpCircle className="h-4 w-4 text-gray-300" />
            </div>
            <div className="flex gap-4">
              {/* File Item */}
              <div className="w-48 group cursor-pointer">
                <div className="aspect-[4/3] rounded-xl border border-gray-100 overflow-hidden bg-gray-50 relative">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                    alt="attachment"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="mt-3 space-y-0.5">
                  <p className="text-xs font-bold text-gray-900 truncate">
                    Business Analytics.png
                  </p>
                  <p className="text-[10px] font-bold text-gray-400">
                    23 Jul, 4 MB
                  </p>
                </div>
              </div>

              {/* Upload Placeholder */}
              <div className="w-48 aspect-[4/3] rounded-xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-200 hover:bg-blue-50/10 transition-all">
                <div className="p-2 rounded-full bg-white shadow-sm border border-gray-50">
                  <Plus className="h-5 w-5 text-gray-900" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 text-center leading-tight">
                  Drag & drop or
                  <br />
                  browse
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 flex items-center justify-between border-t border-gray-100 bg-white">
          <Button
            variant="outline"
            onClick={onBack}
            className="rounded-lg h-12 px-6 border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={onConfirm}
            className="rounded-lg h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-100"
          >
            Assign Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignConfirmModal;
