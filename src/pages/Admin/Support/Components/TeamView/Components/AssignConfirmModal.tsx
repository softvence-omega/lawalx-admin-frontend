import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface AssignConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AssignConfirmModal = ({
  open,
  onOpenChange,
}: AssignConfirmModalProps) => {
  return (
    <div className="">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md p-0 overflow-hidden border-none rounded-3xl shadow-2xl bg-[#F8FAFF]">
          <DialogHeader className="p-6 bg-white border-b border-gray-100 flex flex-row items-center justify-between space-y-0">
            <DialogTitle className="text-xl font-bold text-gray-900">
              Confirm Assignment
            </DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssignConfirmModal;
