import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Pause,
  Ticket,
} from "lucide-react";
import ClientInfoCards from "./clientInfoCards";
import ClientSingleOverviewTab from "./ClientSingleOverviewTab";
import ClientPrograms from "./clientSingleProgramTab";
import ClientSingleActiveAlerts from "./ClientSingleActiveAlerts";
import ClientSingleSubscriptionTab from "./ClientSingleSubscriptionTab";
import ClientSingleActivityLog from "./clientSingleActivityLog";
import { useGetClientByIdAdminQuery } from "@/store/Api/ClientApi/ClientApi";

export function SingleClient() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetClientByIdAdminQuery(id as string);
  const clientData = data?.data;
  console.log(clientData);
  const navigate = useNavigate();
  if (isLoading) return <p>Loading...</p>;
  if (!clientData) return <p>Client not found</p>;

  const {
    contactPersonName,
    subdomain,
    isActive,
    subscriptionPlan,
    storageQuotaGb,
    archiveThreshold,
    billingCycle,
    region,
    supportContactLink,
  } = clientData;

  return (
    <div className=" h-full">
      {/* Main Content */}
      <ClientInfoCards metrics={clientData?.metrics} />
      <div className="flex">
        <div className="flex-1 p-6">
          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="container mx-auto justify-start h-auto p-0 bg-transparent rounded-none gap-10 border-b border-gray-200">
              <TabsTrigger
                className="cursor-pointer bg-transparent py-3 px-0 border-b-2 border-transparent data-[state=active]:border-b-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none font-semibold text-gray-600 transition-all text-base mb-[-1px] relative z-10"
                value="overview"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer bg-transparent py-3 px-0 border-b-2 border-transparent data-[state=active]:border-b-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none font-semibold text-gray-600 transition-all text-base mb-[-1px] relative z-10"
                value="program"
              >
                Program
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer bg-transparent py-3 px-0 border-b-2 border-transparent data-[state=active]:border-b-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none font-semibold text-gray-600 transition-all text-base mb-[-1px] relative z-10"
                value="alerts"
              >
                Alerts
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer bg-transparent py-3 px-0 border-b-2 border-transparent data-[state=active]:border-b-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none font-semibold text-gray-600 transition-all text-base mb-[-1px] relative z-10"
                value="subscription"
              >
                Subscription
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer bg-transparent py-3 px-0 border-b-2 border-transparent data-[state=active]:border-b-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none font-semibold text-gray-600 transition-all text-base mb-[-1px] relative z-10"
                value="activity"
              >
                Activity Log
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <ClientSingleOverviewTab planSummary={clientData?.planSummary} />
            </TabsContent>

            <TabsContent value="program" className="mt-6">
              <ClientPrograms programs={clientData?.programs} />
            </TabsContent>

            <TabsContent value="alerts" className="mt-6">
              <ClientSingleActiveAlerts alerts={clientData?.alertsList} />
            </TabsContent>

            <TabsContent value="subscription" className="mt-6">
              <ClientSingleSubscriptionTab
                invoices={clientData?.invoices}
                subscription={subscriptionPlan}
              />
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <ClientSingleActivityLog activityLogs={clientData?.activityLog} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-white rounded-xl border border-gray-200 p-6">
          <div className="space-y-6">
            {/* Client Information */}
            <div className="rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Client Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 border border-gray-200 bg-slate-50 rounded-sm">
                    <Building2 className="w-5 h-5 text-gray-800 mt-0.5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Company</p>
                    <p className="font-medium">
                      {subdomain?.replace(".theanalyzer.com", "").trim()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 border border-gray-200 bg-slate-50 rounded-sm">
                    <User className="w-5 h-5 text-gray-800 mt-0.5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Primary Contact</p>
                    <p className="font-medium">{contactPersonName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 border border-gray-200 bg-slate-50 rounded-sm">
                    <Mail className="w-5 h-5 text-gray-800 mt-0.5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Support</p>
                    <p className="font-medium text-blue-600">
                      {supportContactLink}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 border border-gray-200 bg-slate-50 rounded-sm">
                    <Phone className="w-5 h-5 text-gray-800 mt-0.5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">—</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 border border-gray-200 bg-slate-50 rounded-sm">
                    <MapPin className="w-5 h-5 text-gray-800 mt-0.5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Region</p>
                    <p className="font-medium">{region}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan Info */}
            <div className=" rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Plan Information</h3>
              <div className="space-y-4 p-4 border border-gray-200 rounded-xl bg-slate-50 ">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Current Plan:</p>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800 mt-1"
                  >
                    {subscriptionPlan}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Billing Cycle:</p>
                  <p className="font-medium">{billingCycle}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Storage Quota:</p>
                  <p className="font-medium">{storageQuotaGb} Gb</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Used Storage:</p>
                  <p className="font-medium">{archiveThreshold} Gb</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Status:</p>
                  <Badge
                    className={`mt-1 ${
                      isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {isActive ? "Active" : "Suspended"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Action</h3>
              <div className="space-y-3">
                <Button
                  className="w-full bg-blue-600 py-5 text-white justify-start gap-2"
                  variant="default"
                >
                  <Pause className="w-4 h-4" />
                  Suspend Client
                </Button>
                <Button
                  onClick={() => navigate("/admin/support")}
                  className="w-full justify-start gap-2 py-5 bg-blue-600 text-white"
                  variant="default"
                >
                  <Ticket className="w-4 h-4" />
                  View Support Tickets
                  <Badge variant="secondary" className="ml-auto">
                    3
                  </Badge>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
