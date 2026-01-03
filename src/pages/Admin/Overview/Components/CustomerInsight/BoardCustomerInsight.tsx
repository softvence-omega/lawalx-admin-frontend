import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ClientData2 } from "@/types/Client";
import { ProgressBar } from "../../../../../common/ProgressBarCustom";

interface CustomerProps {
  customer: ClientData2;
}

const BoardCustomerInsight: React.FC<CustomerProps> = ({ customer }) => {
  const status = customer.isActive ? "Active" : "Suspended";

  const statusColors = {
    Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Suspended: "bg-red-100 text-red-700 border-red-200",
    trial: "bg-yellow-100 text-yellow-700 border-yellow-200",
    expired: "bg-gray-100 text-gray-600 border-gray-200",
  };

  const storageUsed = customer.archiveThreshold ?? 0;
  const storageTotal = customer.storageQuotaGb;

  const lastActive = new Date(customer.updatedAt).toLocaleDateString();

  const hasAlert = customer.usageWarningAlert;

  return (
    <Card className="border-0 shadow-sm">
      <Link to={`/admin/clients/${customer.id}`}>
        <CardContent className="px-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {customer.contactPersonName}
                </h3>
                <p className="text-sm text-gray-500">
                  {customer.subscriptionPlan}
                </p>
              </div>
            </div>

            <Badge
              variant="outline"
              className={cn("text-xs font-medium", statusColors[status])}
            >
              {status}
            </Badge>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-x-18 gap-y-5 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Users</p>
              <p className="font-medium text-gray-900">—</p>
            </div>

            <div>
              <p className="text-gray-500 mb-1">Last Active</p>
              <p className="font-medium text-gray-900">{lastActive}</p>
            </div>

            <div>
              <p className="text-gray-500 mb-1">Dashboard</p>
              <p className="font-medium text-gray-900">
                {customer.autoGenDashboard ? "Enabled" : "Disabled"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 mb-1">Alerts</p>
              <p
                className={cn(
                  "font-medium",
                  hasAlert ? "text-yellow-600" : "text-gray-900"
                )}
              >
                {hasAlert ? "1 (Warning)" : "0"}
              </p>
            </div>
          </div>

          {/* Storage */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Storage Usage</span>
              <span className="font-medium text-gray-900">
                {storageUsed}Gb / {storageTotal}Gb
              </span>
            </div>

            <ProgressBar
              value={(storageUsed / storageTotal) * 100}
              className="h-2"
            />
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
            View Client
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
};

export default BoardCustomerInsight;
