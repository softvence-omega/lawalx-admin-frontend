import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProgressBar } from "@/common/ProgressBarCustom";
import { cn } from "@/lib/utils";
import { ClientData2 } from "@/types/Client";

interface Props {
  customers: ClientData2[];
}

const ClientInsightsTable: React.FC<Props> = ({ customers }) => {
  const navigate = useNavigate();
  const [selectedClient, setSelectedClient] = useState<ClientData2 | null>(
    null,
  );
  const [modal, setModal] = useState<"view" | "edit" | "delete" | null>(null);

  const statusColors = {
    true: "bg-emerald-100 text-emerald-700 border-emerald-200",
    false: "bg-red-100 text-red-700 border-red-200",
  };

  const planColors = {
    enterprise: "bg-purple-100 text-purple-700 border-purple-200",
    business: "bg-blue-100 text-blue-700 border-blue-200",
    professional: "bg-green-100 text-green-700 border-green-200",
    starter: "bg-gray-100 text-gray-600 border-gray-200",
  };

  const openModal = (type: "view" | "edit" | "delete", client: ClientData2) => {
    setSelectedClient(client);
    setModal(type);
  };

  const closeModal = () => {
    setSelectedClient(null);
    setModal(null);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 text-left font-semibold">
                Company Name
              </th>
              <th className="px-5 py-3 text-left font-semibold">
                Subscription Plan
              </th>
              <th className="px-5 py-3 text-center font-semibold">
                Dashboard Updates
              </th>
              <th className="px-5 py-3 text-center font-semibold">Alerts</th>
              <th className="px-5 py-3 text-center font-semibold">Users</th>
              <th className="px-5 py-3 font-semibold">Storage Usage</th>
              <th className="px-5 py-3 text-center font-semibold">Status</th>
              <th className="px-5 py-3 text-center font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {customers.map((client) => {
              const companyName = client.subdomain
                ?.replace(".theanalyzer.com", "")
                ?.trim();

              const used = client.archiveThreshold ?? 0;
              const total = client.storageQuotaGb;

              return (
                <tr
                  key={client.id}
                  onClick={() => navigate(`/admin/clients/${client.id}`)}
                  className="hover:bg-gray-50 cursor-pointer transition"
                >
                  <td className="px-5 py-4 font-semibold text-gray-900  flex items-center gap-2">
                    <img src="/Logomark.png" className="size-10" alt="" />
                    {companyName}
                  </td>

                  <td className="px-5 py-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        `rounded-full px-3 py-1 text-sm capitalize ${planColors[client.subscriptionPlan] ? planColors[client.subscriptionPlan] : "bg-gray-100 text-gray-600 border-gray-200"}`,
                      )}
                    >
                      {client.subscriptionPlan}
                    </Badge>
                  </td>

                  <td className="px-5 py-4 text-center">
                    {client.autoGenDashboard ? "Enabled" : "Disabled"}
                  </td>

                  <td className="px-5 py-4 text-center text-yellow-600 font-medium">
                    {client.usageWarningAlert ? "1 Warning" : "0"}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-400">—</td>

                  <td className="px-5 py-4 w-56">
                    <ProgressBar value={(used / total) * 100} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      {used}/{total} Gb
                    </p>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-full px-3 py-1 text-sm min-w-[90px]",
                        client.isActive
                          ? statusColors["true"]
                          : statusColors["false"],
                      )}
                    >
                      {client.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </td>

                  <td
                    className="px-5 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-center gap-4">
                      <Eye
                        className="w-4 h-4 text-blue-600 cursor-pointer"
                        onClick={() => openModal("view", client)}
                      />
                      <Pencil
                        className="w-4 h-4 text-green-600 cursor-pointer"
                        onClick={() => openModal("edit", client)}
                      />
                      <Trash
                        className="w-4 h-4 text-red-600 cursor-pointer"
                        onClick={() => openModal("delete", client)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* VIEW */}
      <Dialog open={modal === "view"} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Client Details</DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-2 text-sm">
              <p>
                <strong>Subdomain:</strong> {selectedClient.subdomain}
              </p>
              <p>
                <strong>Plan:</strong> {selectedClient.subscriptionPlan}
              </p>
              <p>
                <strong>Billing:</strong> {selectedClient.billingCycle}
              </p>
              <p>
                <strong>Region:</strong> {selectedClient.region}
              </p>
              <p>
                <strong>Language:</strong> {selectedClient.language}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* EDIT */}
      <Dialog open={modal === "edit"} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Edit flow will be connected to backend mutations.
          </p>
        </DialogContent>
      </Dialog>

      {/* DELETE */}
      <Dialog open={modal === "delete"} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Client</DialogTitle>
          </DialogHeader>
          <p className="mb-4">
            Are you sure you want to delete{" "}
            <strong>
              {selectedClient?.subdomain?.replace(".theanalyzer.com", "")}
            </strong>
            ?
          </p>
          <Button className="bg-black text-white w-full">Confirm Delete</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClientInsightsTable;
