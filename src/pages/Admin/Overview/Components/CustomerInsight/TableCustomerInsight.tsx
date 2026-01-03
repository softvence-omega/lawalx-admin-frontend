import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/common/ProgressBarCustom";
import { cn } from "@/lib/utils";
import { ClientData2 } from "@/types/Client";
import { Eye, Pencil, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CustomerData {
  customer: ClientData2;
}

const TableCustomerInsight: React.FC<CustomerData> = ({ customer }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<"view" | "edit" | "delete" | null>(
    null
  );

  const status = customer.isActive ? "Active" : "Suspended";

  const statusColors = {
    Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Suspended: "bg-red-100 text-red-700 border-red-200",
    Trial: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Expired: "bg-gray-100 text-gray-600 border-gray-200",
  };
  const subscriptionPlanColors = {
    Enterprise: "bg-purple-100 text-purple-700 border-purple-200",
    Business: "bg-blue-100 text-blue-700 border-blue-200",
    Professional: "bg-green-100 text-green-700 border-green-200",
    Starter: "bg-gray-100 text-gray-600 border-gray-200",
  };

  const alertType = customer.usageWarningAlert ? "Warning" : null;

  const storageUsage = customer.archiveThreshold ?? 0;
  const storageTotal = customer.storageQuotaGb;

  const companyName = customer.subdomain
    ?.replace(".theanalyzer.com", "")
    ?.trim();

  return (
    <>
      <tr
        className="hover:bg-gray-50 cursor-pointer"
        onClick={() => navigate(`/admin/clients/${customer.id}`)}
      >
        <td className="px-4 py-3 font-medium text-gray-900">{companyName}</td>

        <td className="px-4 py-3">
          <Badge
            variant="outline"
            className={cn(
              "border-blue-600 text-blue-600 rounded-3xl",
              subscriptionPlanColors[customer.subscriptionPlan] 
            )}
          >
            {customer.subscriptionPlan}
          </Badge>
        </td>

        <td className="px-4 py-3 text-center">
          {customer.autoGenDashboard ? "Enabled" : "Disabled"}
        </td>

        <td
          className={cn(
            "px-4 py-3 text-center font-medium",
            alertType === "Warning" ? "text-yellow-600" : "text-gray-900"
          )}
        >
          {alertType ? "1 (Warning)" : "0"}
        </td>

        <td className="px-4 py-3 text-center">—</td>

        <td className="px-4 py-3 w-48">
          <ProgressBar
            value={(storageUsage / storageTotal) * 100}
            className="h-2 mb-1"
          />
          <span className="text-xs text-gray-600">
            {storageUsage}/{storageTotal} Gb
          </span>
        </td>

        <td className="px-4 py-3 text-center">
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-medium w-28 py-1",
              statusColors[status]
            )}
          >
            {status}
          </Badge>
        </td>

        <td
          className="px-4 py-3 flex justify-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <Eye
            className="w-4 h-4 text-blue-600 cursor-pointer"
            onClick={() => setOpenModal("view")}
          />
          <Pencil
            className="w-4 h-4 text-green-600 cursor-pointer"
            onClick={() => setOpenModal("edit")}
          />
          <Trash
            className="w-4 h-4 text-red-600 cursor-pointer"
            onClick={() => setOpenModal("delete")}
          />
        </td>
      </tr>

      {/* View Modal */}
      <Dialog
        open={openModal === "view"}
        onOpenChange={() => setOpenModal(null)}
      >
        <DialogContent className="bg-white border-none">
          <DialogHeader>
            <DialogTitle>Client Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Subdomain:</strong> {customer.subdomain}
            </p>
            <p>
              <strong>Plan:</strong> {customer.subscriptionPlan}
            </p>
            <p>
              <strong>Billing:</strong> {customer.billingCycle}
            </p>
            <p>
              <strong>Region:</strong> {customer.region}
            </p>
            <p>
              <strong>Language:</strong> {customer.language}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog
        open={openModal === "edit"}
        onOpenChange={() => setOpenModal(null)}
      >
        <DialogContent className="bg-white border-none">
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Editing will be wired to backend mutations.
          </p>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog
        open={openModal === "delete"}
        onOpenChange={() => setOpenModal(null)}
      >
        <DialogContent className="bg-white border-none">
          <DialogHeader>
            <DialogTitle>Delete Client</DialogTitle>
          </DialogHeader>
          <p className="mb-4">
            Are you sure you want to delete <strong>{companyName}</strong>?
          </p>
          <Button className="bg-black text-white cursor-pointer">
            Confirm Delete
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TableCustomerInsight;
