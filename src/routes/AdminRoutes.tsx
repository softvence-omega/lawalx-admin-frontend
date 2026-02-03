// @/config/adminSidebarItems.ts

import { RouteGroup } from "@/utils/Generator/MenuGenerator";
import {
  Clock,
  Users,
  BarChart3,
  // Activity,
  CreditCard,
  Plug,
  // Shield,
  HelpCircle,
  Settings,
} from "lucide-react";
import Overview from "@/pages/Admin/Overview/Overview";
import Clients from "@/pages/Admin/Clients/Clients";
import { SingleClient } from "@/pages/Admin/Clients/Components/SingleClient/SingleClient";
import Analytics from "@/pages/Admin/Analytics/Analytics";
// import SystemHealth from "@/pages/Admin/SystemHealth/SystemHealth";
import BillingPlans from "@/pages/Admin/BillingsPlans/BillingsPlans";
import APIIntegrations from "@/pages/Admin/ApiIntegration/APIIntegrations";
// import SecurityPrivacy from "@/pages/Admin/SecurityPrivacy/SecurityPrivacy";
import GlobalSettings from "@/pages/Admin/GlobalSettings/GlobalSettings";
import AddClientForm from "@/pages/Admin/Clients/Components/AddClient/AddClientForm";
import ManageBillings from "@/pages/Admin/ManageBillings/ManageBillings";
import PlatformAnalyticsOverview from "@/pages/Admin/PlatformAnalyticsOverview/Analytics";
import ClientsParent from "@/pages/Admin/Clients/ClientsParent";
import Support from "@/pages/Admin/Support/Support";
import { SupportTickets } from "@/pages/Admin/Support/Components/SupportTickets/SupportTickets";
import TeamView from "@/pages/Admin/Support/Components/TeamView/TeamView";
import SupportEmployeeList from "@/pages/Admin/Support/Components/SupportEmployeeList/SupportEmployeeList";
import BillingsContainer from "@/pages/Admin/BillingsPlans/BillingsContainer";
import BillingDetails from "@/pages/Admin/BillingsPlans/Components/BillingDetailsPage/BillingDetails";
export const adminRoutes: RouteGroup[] = [
  {
    group: "Main Menu",
    items: [
      {
        icon: <Clock />,
        index: true,
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
      // {
      //   icon: <Activity />,
      //   name: "System Health",
      //   path: "systemHealth",
      //   element: <SystemHealth />,
      // },
      {
        icon: <CreditCard />,
        name: "Billing & Plans",
        path: "billings",
        element: <BillingsContainer />,
        children: [
          {
            path: "",
            element: <BillingPlans />,
          },
          {
            path: ":id",
            element: <BillingDetails />,
          },
          {
            path: "edit/:id",
            element: <BillingDetails />,
          },
        ],
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
      // {
      //   icon: <Shield />,
      //   name: "Security & Privacy",
      //   path: "security",
      //   element: <SecurityPrivacy />,
      // },
      {
        icon: <HelpCircle />,
        name: "Support",
        path: "support",
        element: <Support />,
        children: [
          {
            index: true,
            element: <SupportTickets />,
          },
          {
            path: "team-view",
            element: <TeamView />,
          },
          {
            path: "support-employee",
            element: <SupportEmployeeList />,
          },
        ],
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
