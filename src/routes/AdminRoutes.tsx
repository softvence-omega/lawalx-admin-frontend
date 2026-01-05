// @/config/adminSidebarItems.ts

import { RouteGroup } from "@/utils/Generator/MenuGenerator";
import {
  Clock,
  Users,
  BarChart3,
  Activity,
  CreditCard,
  Plug,
  Shield,
  HelpCircle,
  Settings,
} from "lucide-react";
import Overview from "@/pages/Admin/Overview/Overview";
import Clients from "@/pages/Admin/Clients/Clients";
import { SingleClient } from "@/pages/Admin/Clients/Components/SingleClient/SingleClient";
import Analytics from "@/pages/Admin/Analytics/Analytics";
import SystemHealth from "@/pages/Admin/SystemHealth/SystemHealth";
import BillingPlans from "@/pages/Admin/BillingsPlans/BillingsPlans";
import APIIntegrations from "@/pages/Admin/ApiIntegration/APIIntegrations";
import SecurityPrivacy from "@/pages/Admin/SecurityPrivacy/SecurityPrivacy";
import Help from "@/pages/Admin/Help/Help";
import GlobalSettings from "@/pages/Admin/GlobalSettings/GlobalSettings";
import AddClientForm from "@/pages/Admin/Clients/Components/AddClient/AddClientForm";
import ManageBillings from "@/pages/Admin/ManageBillings/ManageBillings";
import PlatformAnalyticsOverview from "@/pages/Admin/PlatformAnalyticsOverview/Analytics";
import ClientsParent from "@/pages/Admin/Clients/ClientsParent";
export const adminRoutes: RouteGroup[] = [
  {
    group: "Main Menu",
    items: [
      {
        icon: <Clock />,
        index:true,
        name: "Overview",
        element: <Overview />,
      },
      {
        icon: <Users />,
        name: "Clients",
        path: "clients",
        element: <ClientsParent />,
        children: [
          {
            path: "",
            element: <Clients />,
          },
          {
            path: "addClient",
            element: <AddClientForm />,
          },
          {
            path: ":id",
            element: <SingleClient />,
          },
        ],
      },
      {
        icon: <BarChart3 />,
        name: "Analytics",
        path: "analytics",
        element: <Analytics />,
      },
      {
        icon: <Activity />,
        name: "System Health",
        path: "systemHealth",
        element: <SystemHealth />,
      },
      {
        icon: <CreditCard />,
        name: "Billing & Plans",
        path: "billings",
        element: <BillingPlans />,
      },
    ],
  },
  {
    group: "Support",
    items: [
      {
        icon: <Plug />,
        name: "API & Integration",
        path: "apiIntegration",
        element: <APIIntegrations />,
      },
      {
        icon: <Shield />,
        name: "Security & Privacy",
        path: "security",
        element: <SecurityPrivacy />,
      },
      {
        icon: <HelpCircle />,
        name: "Support",
        path: "support",
        element: <Help />,
      },
      {
        icon: <Settings />,
        name: "Global Settings",
        path: "globalSettings",
        element: <GlobalSettings />,
      },
      { path: "manage-billings", element: <ManageBillings /> },
      {
        path: "Platform-Analytics-Overview",
        element: <PlatformAnalyticsOverview />,
      },
    ],
  },
];
