import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, AlertCircle, ChevronLeft, X } from "lucide-react";
import { SupportTicket } from "@/types/SupportTypes";
import {
  useGetAllSupporterQuery,
  useUpdateTicketMutation,
} from "@/store/Api/AdminApi/SupportApi";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const EditTicketModal = ({
  open,
  onOpenChange,
  selectedTicket,
  handleSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTicket: SupportTicket;
  handleSave: () => void;
}) => {
  const [status, setStatus] = useState(selectedTicket?.status);
  const [priority, setPriority] = useState(selectedTicket?.priority);
  const [assignedSupporter, setAssignedSupporter] = useState<
    string | undefined
  >(selectedTicket?.assignments[0].user?.name || "unassigned");

  const [adminNote, setAdminNote] = useState(selectedTicket?.adminNote || "");
  console.log(selectedTicket?.assignments[0].user.name);
  useEffect(() => {
    if (selectedTicket) {
      setStatus(selectedTicket.status);
      setPriority(selectedTicket.priority);
      setAdminNote(selectedTicket.adminNote || "");

      const assignmentId = Array.isArray(selectedTicket.assignments)
        ? selectedTicket.assignments[0]?.user?.id
        : (selectedTicket.assignments as any)?.user?.id;
      setAssignedSupporter(assignmentId || "unassigned");
    }
  }, [selectedTicket]);

  const { data, isLoading: supporterLoading } = useGetAllSupporterQuery({});
  const [updateTicket] = useUpdateTicketMutation();
  const supporterData = data?.data;
  const handleSubmit = async () => {
    const toastId = toast.loading("Updating ticket...");
    try {
      const payload = {
        status,
        priority,
        adminNote,
        ...(assignedSupporter !== "unassigned" && {
          supporterId: assignedSupporter,
        }),
      };

      await updateTicket({
        ticketId: selectedTicket?.id,
        payload,
      }).unwrap();

      toast.success("Ticket updated successfully", { id: toastId });
      handleSave();
      onOpenChange(false);
    } catch (error: any) {
      const errorMessage = error?.data?.message || "An error occurred";
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-xl p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-medium text-gray-900">
                Edit Support Ticket
              </DialogTitle>
              <button
                onClick={() => onOpenChange(false)}
                className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto bg-gray-50/10">
            <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-indigo-50/30 border border-indigo-50">
              <div className="space-y-1">
                <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                  Ticket ID:
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {selectedTicket?.id}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                  Subject:
                </p>
                <p className="text-sm font-medium text-gray-900 max-w-[150px] truncate">
                  {selectedTicket?.issueType}
                </p>
              </div>
              <div className="space-y-1 mt-2">
                <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                  Requested By:
                </p>
                <div className="flex items-center gap-2">
                  <Building2 className="h-3 w-3 text-indigo-400" />
                  <p className="text-sm font-medium text-gray-900">
                    {selectedTicket?.companyName}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium pb-2 text-gray-700">
                  Ticket Status
                </label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="h-11 w-full rounded-lg bg-white border-gray-200">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OPEN">Open</SelectItem>
                    <SelectItem value="UNASSIGNED">Unassigned</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="SOLVED">Solved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium pb-2 text-gray-700">
                  Priority
                </label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="h-11 w-full rounded-lg bg-white border-gray-200">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="NORMAL">Normal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium pb-2 text-gray-700">
                  Assign to
                </label>
                {supporterLoading ? (
                  <Skeleton className="h-11 w-full rounded-lg" />
                ) : supporterData && supporterData.length > 0 ? (
                  <Select
                    value={assignedSupporter}
                    onValueChange={setAssignedSupporter}
                  >
                    <SelectTrigger className="h-11 w-full rounded-lg bg-white border-gray-200">
                      <SelectValue placeholder="Select staff" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {supporterData?.map((supporter: any) => (
                        <SelectItem
                          key={supporter.id}
                          value={supporter.user.id}
                        >
                          {supporter.user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm text-gray-500">No supporters found</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium pb-2 text-gray-700">
                    Admin Note
                  </label>
                  <div className="group relative">
                    <AlertCircle className="h-3 w-3 text-gray-400" />
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    className="w-full min-h-[100px] p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all text-sm text-gray-600 resize-none"
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
                  className="w-full min-h-[120px] p-4 rounded-lg border border-gray-200 bg-gray-50/30 text-sm text-gray-500 cursor-not-allowed"
                  disabled
                  defaultValue={selectedTicket?.issueType}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <Button
                variant="outline"
                className="h-11 px-6 rounded-lg text-gray-600"
                onClick={() => onOpenChange(false)}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                className="h-11 px-8 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100"
                onClick={handleSubmit}
              >
                Save changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditTicketModal;
