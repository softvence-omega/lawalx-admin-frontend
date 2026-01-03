export interface ClientData {
  id: number;
  companyName: string;
  plan: string;
  status: string;
  users: string;
  lastActive: string;
  dashboardUpdates: number;
  alerts: number;
  alertType: string;
  storageUsage: number;
  storageTotal: number;

  user: {
    name: string;
    client: {
      company: string;
      primaryContact: string;
      email: string;
      phone: string;
      location: string;
      plan: {
        current: string;
        billingCycle: string;
        nextRenewal: string;
        status: "Active" | "Pending" | "Paid" | "Unpaid";
      };
    };
    metrics: {
      totalUsers: {
        current: number;
        total: number;
        percentage: number;
      };
      activePrograms: {
        current: number;
        newThisMonth: number;
      };
      criticalAlerts: {
        current: number;
        newIn24Hours: number;
      };
      storageUsage: {
        current: string;
        total: string;
        percentage: number;
      };
    };
    planSummary: {
      users: { current: number; total: number };
      projects: { current: number; total: number };
      storage: { current: string; total: string };
      apiCalls: { current: string; total: string };
    };
    programs: {
      programName: string;
      projectName: string;
      usageCount: number;
      lastUpdated: string;
    }[];
    alertsList: {
      alertType: string;
      priority: "Critical" | "High" | "Medium" | "Low" | "Default";
      timeStamp: string;
      status: "Resolved" | "In Progress" | "New";
    }[];
    invoices: {
      invoiceId: string;
      date: string;
      amount: string;
      status: "Paid" | "Unpaid" | "Pending";
    }[];
    activityLog: {
      timestamp: string;
      action: string;
      performedBy: string;
      details: string;
    }[];
  };
}
export interface ClientData2 {
  id: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string

  contactPersonName: string;

  isReferred: boolean;
  referrerName: string | null;
  referrerEmail: string | null;
  referrerPhone: string | null;

  discoverySource: string | null;

  logoUrl: string;
  faviconUrl: string;

  primaryColor: string;
  secondaryColor: string;

  showFooter: boolean;
  customFooterText: string;

  supportContactLink: string;

  subdomain: string;
  region: string;
  timeZone: string;
  language: string;

  enableOnboarding: boolean;
  autoGenDashboard: boolean;
  industryTemplate: string;

  isActive: boolean;
  enableCustomCharts: boolean;

  storageQuotaGb: number;
  archiveThreshold: number;
  archiveAfterDays: number;
  usageWarningAlert: boolean;

  billingCycle: "MONTHLY" | "QUARTERLY" | "HALFYEARLY" | "YEARLY";
  subscriptionPlan: "Enterprise" | "Business" | "Professional" | "Starter";

  discountCode: string | null;
  startBillingDate: string; // ISO date string
  trialPeriodDays: number;

  paymentMethod: string;

  internalNotes: string | null;

  userId: string;

  assignedCharts: string[];
}
