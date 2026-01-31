import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ClientData2 } from "@/types/Client";
import { ProgressBar } from "../../../../../common/ProgressBarCustom";
import { FaSackDollar } from "react-icons/fa6";

interface CustomerProps {
  customer: ClientData2;
}

const BoardCustomerInsight: React.FC<CustomerProps> = ({ customer }) => {
  const statusColors = {
    true: "bg-emerald-100 text-emerald-700 border-emerald-200",
    false: "bg-red-100 text-red-700 border-red-200",
    // trial: "bg-yellow-100 text-yellow-700 border-yellow-200",
    // expired: "bg-gray-100 text-gray-600 border-gray-200",
  };

  const storageUsed = customer.archiveThreshold ?? 0;
  const storageTotal = customer.storageQuotaGb;

  const lastActive = customer.updatedAt;

  const hasAlert = customer.usageWarningAlert;

  return (
    <Card className="border border-gray-200 shadow-sm min-w-[380px]">
      <Link to={`/admin/clients/${customer.id}`} className="no-underline">
        <CardContent className="p-0 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#069576] text-white rounded-lg">
                <FaSackDollar size={28} />
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
              className={cn(
                "text-sm font-medium rounded-sm",
                customer.isActive
                  ? statusColors["true"]
                  : statusColors["false"],
              )}
            >
              {customer.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          <hr className="my-6 border border-gray-200" />
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-x-18 gap-y-5 text-sm px-6">
            <div>
              <p className="text-gray-500 mb-1">Users</p>
              <p className="font-medium text-gray-900">—</p>
            </div>

            <div>
              <p className="text-gray-500 mb-1">Last Active</p>
              <p className="font-semibold text-gray-900">
                {new Date(lastActive).getDate()}{" "}
                {new Date(lastActive)
                  .toLocaleString("en-GB", { month: "short" })
                  .toString()}
                , {new Date(lastActive).getFullYear()}
              </p>
            </div>

            <div>
              <p className="text-gray-500 mb-1 text-nowrap">
                Dashboard Updates
              </p>
              <p className="font-medium text-gray-900">
                {customer.autoGenDashboard ? "Enabled" : "Disabled"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 mb-1">Alerts</p>
              <p
                className={cn(
                  "font-medium",
                  hasAlert ? "text-yellow-600" : "text-gray-900",
                )}
              >
                {hasAlert ? "1 (Warning)" : "0"}
              </p>
            </div>
          </div>
          {/* Storage */}
          <div className="space-y-2 px-6 py-4">
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
          <div className="px-6">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer ">
              View Client
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default BoardCustomerInsight;
