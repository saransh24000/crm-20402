// src/pages/Dashboard.tsx
import BrowserHeader from "../components/BrowserHeader";
import DashboardCard from "../components/DashboardCard";
import KPICard from "../components/KPICard";
import ChatAssistant from "../components/ChatAssistant";
import RadialDecoration from "../components/RadialDecoration";
import ClientTabsRow from "../components/ClientTabsRow";
import ImportLeads from "../components/ImportLeads";
import ImportHistory from "../components/ImportHistory";
import AllLeadsBox from "../components/AllLeadsBox";
import MyLeadsBox from "../components/MyLeadsBox";
import TeamTaskBox from "../components/TeamTaskBox";
import MyTaskBox from "../components/MyTaskBox";
import AddLeadBox from "../components/AddLeadBox";
import React from "react";
import { motion } from "framer-motion";

interface DashboardProps {
  userRole?: string;
  onLogout?: () => void;
}

export default function Dashboard({ userRole, onLogout }: DashboardProps = {} as DashboardProps) {
  // Get user role from localStorage if not passed as prop
  const currentUserRole = userRole || localStorage.getItem("userRole") || "User";
  const [selectedClientId, setSelectedClientId] = React.useState("5732"); // default pipelines
  const [hoveredCardName, setHoveredCardName] = React.useState<string | null>(null);
  const [selectedLeadsOption, setSelectedLeadsOption] = React.useState<string | null>(null);
  const [selectedTasksOption, setSelectedTasksOption] = React.useState<string | null>(null);
  const [selectedPipelinesOption, setSelectedPipelinesOption] = React.useState<string | null>(null);
  const [selectedClientsOption, setSelectedClientsOption] = React.useState<string | null>(null);
  const [selectedOnboardingOption, setSelectedOnboardingOption] = React.useState<string | null>(null);
  const [selectedPerformanceTrackerOption, setSelectedPerformanceTrackerOption] = React.useState<string | null>(null);
  const [selectedAnalyticsOption, setSelectedAnalyticsOption] = React.useState<string | null>(null);
  const [selectedReportsOption, setSelectedReportsOption] = React.useState<string | null>(null);
  const [selectedDocumentsOption, setSelectedDocumentsOption] = React.useState<string | null>(null);
  const [isImportComplete, setIsImportComplete] = React.useState(false);
  const [areIconsCollapsed, setAreIconsCollapsed] = React.useState(false);
  const [isMessageBoxOpen, setIsMessageBoxOpen] = React.useState(false);

  // Per-client dataset for the cards below
  const datasets: Record<string, { payment: number; statement: number; discrepancies: number; closures: number; usage: number; lastTx: string; lastStmt: string; lastExc: string; }> = {
    "1342": { payment: 68, statement: 55, discrepancies: 18, closures: 73, usage: 42, lastTx: "April 5", lastStmt: "April 4", lastExc: "April 4" }, // leads
    "8765": { payment: 75, statement: 62, discrepancies: 11, closures: 80, usage: 49, lastTx: "April 7", lastStmt: "April 6", lastExc: "April 6" }, // tasks
    "5732": { payment: 72, statement: 61, discrepancies: 14, closures: 77, usage: 46, lastTx: "April 7", lastStmt: "April 6", lastExc: "April 7" }, // pipelines
    "9864": { payment: 64, statement: 58, discrepancies: 20, closures: 70, usage: 44, lastTx: "April 3", lastStmt: "April 2", lastExc: "April 3" }, // clients
    "9632": { payment: 79, statement: 66, discrepancies: 9,  closures: 83, usage: 52, lastTx: "April 8", lastStmt: "April 7", lastExc: "April 7" }, // onboarding
    "2451": { payment: 71, statement: 59, discrepancies: 12, closures: 75, usage: 48, lastTx: "April 6", lastStmt: "April 5", lastExc: "April 6" }, // performance tracker
    "3892": { payment: 66, statement: 54, discrepancies: 16, closures: 72, usage: 43, lastTx: "April 4", lastStmt: "April 3", lastExc: "April 4" }, // analytics
    "4567": { payment: 69, statement: 57, discrepancies: 15, closures: 74, usage: 45, lastTx: "April 5", lastStmt: "April 4", lastExc: "April 5" }, // reports
    "5123": { payment: 73, statement: 60, discrepancies: 13, closures: 76, usage: 47, lastTx: "April 7", lastStmt: "April 6", lastExc: "April 7" }, // documents/notes
    "6789": { payment: 77, statement: 65, discrepancies: 10, closures: 81, usage: 51, lastTx: "April 8", lastStmt: "April 7", lastExc: "April 8" }, // admin
  };

  // Leads-specific KPI data for "All Leads" view
  const [allLeadsKPIData, setAllLeadsKPIData] = React.useState({
    totalLeads: { value: "7,037", trend: "+14.2% vs last month" },
    totalRevenue: { value: "$4.0M", trend: "+18.7% vs last month" },
    overallROI: { value: "1714%", trend: "+22.1% vs last month" },
    avgConvRate: { value: "23.9%", trend: "+2.3% vs last month" },
  });

  // Leads-specific KPI data for "Leads" view (when clicking on Leads card directly)
  const [leadsKPIData, setLeadsKPIData] = React.useState({
    totalLeads: { value: "2,847", trend: "+12.5% All leads in system" },
    activeLeads: { value: "1,923", trend: "+8.2% Currently being worked" },
    thisWeek: { value: "156", trend: "+24.1% New leads added" },
    conversionRate: { value: "24.8%", trend: "+3.2% Overall conversion" },
  });

  // Tasks-specific KPI data for "My Task"
  const [tasksKPIData, setTasksKPIData] = React.useState({
    myTasks: { value: "2", trend: "+2 Assigned to you" },
    inProgress: { value: "0", trend: "+1 Currently active" },
    dueToday: { value: "3", trend: "0 Require attention" },
    completed: { value: "0", trend: "+1 This week" },
  });

  // Team Tasks-specific KPI data for "Team Task"
  const [teamTasksKPIData, setTeamTasksKPIData] = React.useState({
    totalTasks: { value: "30", trend: "+0 All team tasks" },
    inProgress: { value: "7", trend: "+0 Currently active" },
    dueToday: { value: "0", trend: "0 Require attention" },
    completed: { value: "10", trend: "+0 This week" },
  });

  // Pipelines-specific KPI data
  const [pipelinesKPIData, setPipelinesKPIData] = React.useState({
    totalPipelineValue: { value: "$1,12,000", trend: "+15.2% All opportunities" },
    weightedPipeline: { value: "$84,200", trend: "+8.5% Probability adjusted" },
    activeDeals: { value: "7", trend: "+3 In pipeline" },
    avgDealSize: { value: "$16,000", trend: "+12.8% Per opportunity" },
  });

  // Clients-specific KPI data for "All Client"
  const [clientsKPIData, setClientsKPIData] = React.useState({
    totalClients: { value: "20", trend: "+8 All clients" },
    activeClients: { value: "4", trend: "+5 Currently active" },
    totalRevenue: { value: "$1.4M", trend: "+18.5% Contract value" },
    avgSatisfaction: { value: "0%", trend: "+2.3% Client satisfaction" },
  });

  // My Clients-specific KPI data for "My Client"
  const [myClientsKPIData, setMyClientsKPIData] = React.useState({
    myClients: { value: "0", trend: "+2 Assigned to you" },
    activeClients: { value: "0", trend: "+1 Currently active" },
    totalRevenue: { value: "$0.0M", trend: "+18.5% Contract value" },
    avgSatisfaction: { value: "0%", trend: "+2.3% Client satisfaction" },
  });

  // Onboarding-specific KPI data for "Pending"
  const [onboardingKPIData, setOnboardingKPIData] = React.useState({
    activeOnboarding: { value: "0", trend: "+0 In progress" },
    avgProgress: { value: "0%", trend: "Overall progress" },
    dueSoon: { value: "0", trend: "0 Due within 7 days" },
    overdue: { value: "0", trend: "Past due date" },
  });

  // Completed Onboarding-specific KPI data for "Completed"
  const [completedOnboardingKPIData, setCompletedOnboardingKPIData] = React.useState({
    completed: { value: "0", trend: "Completed this month" },
    avgProgress: { value: "0%", trend: "Overall progress" },
    onTime: { value: "0", trend: "Completed on time" },
    avgDuration: { value: "12 days", trend: "-2 days Average completion time" },
  });

  // Upload Agreements/KYC-specific KPI data
  const [uploadAgreementsKPIData, setUploadAgreementsKPIData] = React.useState({
    totalDocuments: { value: "0", trend: "No documents Uploaded documents" },
    pendingReview: { value: "0", trend: "All reviewed Awaiting review" },
    approved: { value: "0", trend: "None approved Approved documents" },
    needChanges: { value: "0", trend: "All good Require modifications" },
  });

  const [refreshingKPI, setRefreshingKPI] = React.useState<string | null>(null);

  // Helper function to jitter numbers
  function jitterNumber(value: string, isPercentage = false, isCurrency = false): string {
    let num: number;
    
    if (isCurrency) {
      // Handle currency format like "$4.0M" or "$1,12,000"
      if (value.includes("M")) {
        const numStr = value.replace(/[^0-9.]/g, "");
        num = parseFloat(numStr) * 1000; // Convert to base number
      } else if (value.includes(",")) {
        // Handle formatted numbers like "1,12,000"
        const numStr = value.replace(/,/g, "").replace(/[^0-9.]/g, "");
        num = parseFloat(numStr);
      } else {
        const numStr = value.replace(/[^0-9.]/g, "");
        num = parseFloat(numStr);
      }
    } else {
      // Handle numbers with commas
      if (value.includes(",")) {
        const numStr = value.replace(/,/g, "").replace(/[^0-9.]/g, "");
        num = parseFloat(numStr);
    } else {
      const numStr = value.replace(/[^0-9.]/g, "");
      num = parseFloat(numStr);
      }
    }
    
    if (isNaN(num)) return value;
    
    const delta = (Math.random() * 0.1 - 0.05) * num; // ±5% variation
    const newNum = Math.max(0, num + delta);
    
    if (isCurrency) {
      // Handle millions
      if (newNum >= 1000000) {
        return `$${(newNum / 1000000).toFixed(1)}M`;
      }
      // Format large numbers with commas
      if (newNum >= 1000) {
        return `$${Math.round(newNum).toLocaleString('en-IN')}`;
      }
      return `$${Math.round(newNum).toFixed(0)}`;
    }
    if (isPercentage) {
      return `${newNum.toFixed(1)}%`;
    }
    // Format numbers with commas for display
    return Math.round(newNum).toLocaleString('en-IN');
  }

  // Helper function to jitter small numbers (for tasks, clients count, etc.)
  function jitterSmallNumber(value: string): string {
    const num = parseInt(value.replace(/[^0-9]/g, ""));
    if (isNaN(num)) return value;
    const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2 variation
    const newNum = Math.max(0, num + delta);
    return newNum.toString();
  }

  // Helper function to jitter percentage trend
  function jitterTrend(trend: string): string {
    const match = trend.match(/\+?([0-9.]+)%/);
    if (!match) return trend;
    const percent = parseFloat(match[1]);
    const delta = Math.random() * 2 - 1; // ±1% variation
    const newPercent = Math.max(0, percent + delta);
    return `+${newPercent.toFixed(1)}% vs last month`;
  }

  function refreshKPI(key: string) {
    setRefreshingKPI(key);
    setTimeout(() => {
      // Tasks - My Task
      if (selectedClientId === "8765" && (selectedTasksOption === "My Task" || selectedTasksOption === null)) {
        setTasksKPIData((prev) => {
          const updates: any = {};
          if (key === "myTasks") {
            updates.myTasks = { value: jitterSmallNumber(prev.myTasks.value), trend: prev.myTasks.trend };
          } else if (key === "inProgress") {
            updates.inProgress = { value: jitterSmallNumber(prev.inProgress.value), trend: prev.inProgress.trend };
          } else if (key === "dueToday") {
            updates.dueToday = { value: jitterSmallNumber(prev.dueToday.value), trend: prev.dueToday.trend };
          } else if (key === "completed") {
            updates.completed = { value: jitterSmallNumber(prev.completed.value), trend: prev.completed.trend };
          }
          return { ...prev, ...updates };
        });
      }
      // Tasks - Team Task
      else if (selectedClientId === "8765" && selectedTasksOption === "Team Task") {
        setTeamTasksKPIData((prev) => {
          const updates: any = {};
          if (key === "totalTasks") {
            updates.totalTasks = { value: jitterSmallNumber(prev.totalTasks.value), trend: prev.totalTasks.trend };
          } else if (key === "inProgress") {
            updates.inProgress = { value: jitterSmallNumber(prev.inProgress.value), trend: prev.inProgress.trend };
          } else if (key === "dueToday") {
            updates.dueToday = { value: jitterSmallNumber(prev.dueToday.value), trend: prev.dueToday.trend };
          } else if (key === "completed") {
            updates.completed = { value: jitterSmallNumber(prev.completed.value), trend: prev.completed.trend };
          }
          return { ...prev, ...updates };
        });
      }
      // Pipelines
      else if (selectedClientId === "5732") {
        setPipelinesKPIData((prev) => {
          const updates: any = {};
          if (key === "totalPipelineValue") {
            updates.totalPipelineValue = { value: jitterNumber(prev.totalPipelineValue.value, false, true), trend: prev.totalPipelineValue.trend };
          } else if (key === "weightedPipeline") {
            updates.weightedPipeline = { value: jitterNumber(prev.weightedPipeline.value, false, true), trend: prev.weightedPipeline.trend };
          } else if (key === "activeDeals") {
            updates.activeDeals = { value: jitterSmallNumber(prev.activeDeals.value), trend: prev.activeDeals.trend };
          } else if (key === "avgDealSize") {
            updates.avgDealSize = { value: jitterNumber(prev.avgDealSize.value, false, true), trend: prev.avgDealSize.trend };
          }
          return { ...prev, ...updates };
        });
      }
      // Clients - All Client
      else if (selectedClientId === "9864" && (selectedClientsOption === "All Client" || selectedClientsOption === null)) {
        setClientsKPIData((prev) => {
          const updates: any = {};
          if (key === "totalClients") {
            updates.totalClients = { value: jitterSmallNumber(prev.totalClients.value), trend: prev.totalClients.trend };
          } else if (key === "activeClients") {
            updates.activeClients = { value: jitterSmallNumber(prev.activeClients.value), trend: prev.activeClients.trend };
          } else if (key === "totalRevenue") {
            updates.totalRevenue = { value: jitterNumber(prev.totalRevenue.value, false, true), trend: prev.totalRevenue.trend };
          } else if (key === "avgSatisfaction") {
            updates.avgSatisfaction = { value: jitterNumber(prev.avgSatisfaction.value, true), trend: prev.avgSatisfaction.trend };
          }
          return { ...prev, ...updates };
        });
      }
      // Clients - My Client
      else if (selectedClientId === "9864" && selectedClientsOption === "My Client") {
        setMyClientsKPIData((prev) => {
          const updates: any = {};
          if (key === "myClients") {
            updates.myClients = { value: jitterSmallNumber(prev.myClients.value), trend: prev.myClients.trend };
          } else if (key === "activeClients") {
            updates.activeClients = { value: jitterSmallNumber(prev.activeClients.value), trend: prev.activeClients.trend };
          } else if (key === "totalRevenue") {
            updates.totalRevenue = { value: jitterNumber(prev.totalRevenue.value, false, true), trend: prev.totalRevenue.trend };
          } else if (key === "avgSatisfaction") {
            updates.avgSatisfaction = { value: jitterNumber(prev.avgSatisfaction.value, true), trend: prev.avgSatisfaction.trend };
          }
          return { ...prev, ...updates };
        });
      }
      // Onboarding - Pending
      else if (selectedClientId === "9632" && (selectedOnboardingOption === "Pending" || selectedOnboardingOption === null)) {
        setOnboardingKPIData((prev) => {
          const updates: any = {};
          if (key === "activeOnboarding") {
            updates.activeOnboarding = { value: jitterSmallNumber(prev.activeOnboarding.value), trend: prev.activeOnboarding.trend };
          } else if (key === "avgProgress") {
            updates.avgProgress = { value: jitterNumber(prev.avgProgress.value, true), trend: prev.avgProgress.trend };
          } else if (key === "dueSoon") {
            updates.dueSoon = { value: jitterSmallNumber(prev.dueSoon.value), trend: prev.dueSoon.trend };
          } else if (key === "overdue") {
            updates.overdue = { value: jitterSmallNumber(prev.overdue.value), trend: prev.overdue.trend };
          }
          return { ...prev, ...updates };
        });
      }
      // Onboarding - Completed
      else if (selectedClientId === "9632" && selectedOnboardingOption === "Completed") {
        setCompletedOnboardingKPIData((prev) => {
          const updates: any = {};
          if (key === "completed") {
            updates.completed = { value: jitterSmallNumber(prev.completed.value), trend: prev.completed.trend };
          } else if (key === "avgProgress") {
            updates.avgProgress = { value: jitterNumber(prev.avgProgress.value, true), trend: prev.avgProgress.trend };
          } else if (key === "onTime") {
            updates.onTime = { value: jitterSmallNumber(prev.onTime.value), trend: prev.onTime.trend };
          } else if (key === "avgDuration") {
            // For duration, jitter days
            const days = parseInt(prev.avgDuration.value.replace(/[^0-9]/g, ""));
            if (!isNaN(days)) {
              const newDays = Math.max(1, days + Math.floor(Math.random() * 5) - 2);
              updates.avgDuration = { value: `${newDays} days`, trend: prev.avgDuration.trend };
            }
          }
          return { ...prev, ...updates };
        });
      }
      // Onboarding - Upload Agreements/KYC
      else if (selectedClientId === "9632" && selectedOnboardingOption === "Upload Agreements/KYC") {
        setUploadAgreementsKPIData((prev) => {
          const updates: any = {};
          if (key === "totalDocuments") {
            updates.totalDocuments = { value: jitterSmallNumber(prev.totalDocuments.value), trend: prev.totalDocuments.trend };
          } else if (key === "pendingReview") {
            updates.pendingReview = { value: jitterSmallNumber(prev.pendingReview.value), trend: prev.pendingReview.trend };
          } else if (key === "approved") {
            updates.approved = { value: jitterSmallNumber(prev.approved.value), trend: prev.approved.trend };
          } else if (key === "needChanges") {
            updates.needChanges = { value: jitterSmallNumber(prev.needChanges.value), trend: prev.needChanges.trend };
          }
          return { ...prev, ...updates };
        });
      }
      // Leads - All Leads
      else if (selectedClientId === "1342" && selectedLeadsOption === "All Leads") {
        setLeadsKPIData((prev) => {
          const updates: any = {};
          if (key === "totalLeads") {
            updates.totalLeads = { value: jitterNumber(prev.totalLeads.value), trend: prev.totalLeads.trend };
          } else if (key === "activeLeads") {
            updates.activeLeads = { value: jitterNumber(prev.activeLeads.value), trend: prev.activeLeads.trend };
          } else if (key === "thisWeek") {
            updates.thisWeek = { value: jitterNumber(prev.thisWeek.value), trend: prev.thisWeek.trend };
          } else if (key === "conversionRate") {
            updates.conversionRate = { value: jitterNumber(prev.conversionRate.value, true), trend: prev.conversionRate.trend };
          }
          return { ...prev, ...updates };
        });
      }
      // Leads - Default view
      else if (selectedClientId === "1342") {
        setAllLeadsKPIData((prev) => {
          const updates: any = {};
          if (key === "totalLeads") {
            updates.totalLeads = { value: jitterNumber(prev.totalLeads.value), trend: jitterTrend(prev.totalLeads.trend) };
          } else if (key === "totalRevenue") {
            updates.totalRevenue = { value: jitterNumber(prev.totalRevenue.value, false, true), trend: jitterTrend(prev.totalRevenue.trend) };
          } else if (key === "overallROI") {
            updates.overallROI = { value: jitterNumber(prev.overallROI.value, true), trend: jitterTrend(prev.overallROI.trend) };
          } else if (key === "avgConvRate") {
            updates.avgConvRate = { value: jitterNumber(prev.avgConvRate.value, true), trend: jitterTrend(prev.avgConvRate.trend) };
          }
          return { ...prev, ...updates };
        });
      }
      setRefreshingKPI(null);
    }, 700);
  }

  const baseData = datasets[selectedClientId] || datasets["5732"];
  const [data, setData] = React.useState(baseData);
  const [refreshing, setRefreshing] = React.useState<null | keyof typeof baseData>(null);

  React.useEffect(() => {
    setData(datasets[selectedClientId]);
  }, [selectedClientId]);

  function jitter(value: number) {
    const delta = Math.floor(Math.random() * 11) - 5; // -5 .. +5
    const next = Math.min(100, Math.max(0, value + delta));
    return next;
  }

  function refreshMetric(key: "payment" | "statement" | "discrepancies" | "closures" | "usage") {
    setRefreshing(key);
    setTimeout(() => {
      setData((prev) => {
        const nextVal = jitter(prev[key]);
        if (key === "payment") return { ...prev, payment: nextVal, lastTx: "Just now" };
        if (key === "statement") return { ...prev, statement: nextVal, lastStmt: "Just now" };
        if (key === "discrepancies") return { ...prev, discrepancies: nextVal, lastExc: "Just now" };
        if (key === "closures") return { ...prev, closures: nextVal };
        return { ...prev, usage: nextVal };
      });
      setRefreshing(null);
    }, 700);
  }
  return (
    <>
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .message-box-enter {
            animation: slideDown 0.2s ease-out;
          }
        `}
      </style>
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50">
      <BrowserHeader onLogout={onLogout} />

      <div className="px-4  ">
        <div className="mt-4 rounded-2xl bg-gradient-to-r from-blue-200/70 to-blue-100/40 backdrop-blur relative" style={{ overflow: 'visible' }}>
          {/* Top toolbar chips */}
          <div className="flex items-center justify-end px-6 py-4 relative z-20">
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
              <button
                type="button"
                  className="flex items-center gap-2 text-[10px] px-3 py-1 rounded-full bg-white/80 text-gray-700 hover:bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
                  onClick={() => setIsMessageBoxOpen(!isMessageBoxOpen)}
                aria-label="New message"
              >
                  <span className="inline-block w-2 h-2 rounded-full bg-red-400" />
                  <span>New message</span>
              </button>
                
                {/* Message Box */}
                {isMessageBoxOpen && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 z-40 bg-black/5" 
                      onClick={() => {
                        console.log("Backdrop clicked - closing message box");
                        setIsMessageBoxOpen(false);
                      }}
                    />
                    {/* Message Box */}
                    <div 
                      className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 message-box-enter"
                      onClick={(e) => {
                        // Stop propagation so backdrop click doesn't close when clicking inside message box
                        e.stopPropagation();
                      }}
                      onMouseDown={(e) => {
                        // Prevent backdrop from receiving mousedown event
                        e.stopPropagation();
                      }}
                    >
                      <div className="p-4">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-semibold text-gray-900">Messages</h3>
                          <button
                            type="button"
                            onClick={() => {
                              console.log("Close button onClick triggered");
                              setIsMessageBoxOpen(false);
                            }}
                            className="relative z-[60] flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-500 hover:text-gray-700 transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 group"
                            aria-label="Close message box"
                            title="Close"
                            style={{ pointerEvents: 'auto' }}
                          >
                            <svg 
                              className="w-4 h-4 group-hover:scale-110 transition-transform duration-200 pointer-events-none" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24" 
                              strokeWidth={2.5}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        {/* Message List */}
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {/* Sample Message 1 */}
                          <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-medium text-blue-600">JD</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">2m ago</span>
                              </div>
                              <p className="text-xs text-gray-600 truncate">Hey, can we schedule a meeting for tomorrow?</p>
                            </div>
                          </div>
                          
                          {/* Sample Message 2 */}
                          <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-medium text-green-600">SM</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-sm font-medium text-gray-900 truncate">Sarah Miller</p>
                                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">5m ago</span>
                              </div>
                              <p className="text-xs text-gray-600 truncate">The report is ready for review.</p>
                            </div>
                          </div>
                          
                          {/* Sample Message 3 */}
                          <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-medium text-purple-600">MR</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-sm font-medium text-gray-900 truncate">Mike Ross</p>
                                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">1h ago</span>
                              </div>
                              <p className="text-xs text-gray-600 truncate">Thanks for the update!</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <button
                            type="button"
                            className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium py-2.5 px-4 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setIsMessageBoxOpen(false);
                              // Navigate to messages page or open full message view
                              console.log("View All Messages clicked");
                              // TODO: Add navigation to messages page
                              // Example: navigate('/messages') or openFullMessageView()
                            }}
                            aria-label="View all messages"
                            title="View all messages"
                          >
                            View All Messages
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <button
                type="button"
                className="text-[10px] px-3 py-1 rounded-full bg-white/80 text-gray-700 hover:bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
                onClick={() => console.log("Alerts clicked")}
                aria-label="Alerts"
              >
                Alerts
              </button>
              <button
                type="button"
                className="text-[10px] px-3 py-1 rounded-full bg-white/80 text-gray-700 hover:bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
                onClick={() => console.log("Filters clicked")}
                aria-label="Filters"
              >
                Filters
              </button>
            </div>
          </div>

          {/* 6 Icons in Pill-shaped Navigation Bar above Radial Decoration */}
          <div className="relative z-20 px-6 py-3 flex items-center justify-center">
            {/* Outer Pill Container - Light Blue */}
            <div className="bg-blue-200/40 rounded-full px-2 py-1.5 shadow-inner">
              {/* Inner Pill Container - Slightly Darker Blue */}
              <div className="bg-blue-300/50 rounded-full px-2 py-1 flex items-center gap-2 shadow-sm">
                {/* Button 1: 2x2 Grid (Selected) - Dark gray background */}
                <button
                  type="button"
                  onClick={() => setAreIconsCollapsed(!areIconsCollapsed)}
                  className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 z-10 flex-shrink-0 hover:bg-gray-600"
                  aria-label="Dashboard"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
                  </svg>
                </button>

                {/* Button 2: Clock/Pie Chart */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${areIconsCollapsed ? 'w-0 opacity-0' : 'w-8 opacity-100'}`}>
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-white/20"
                    aria-label="Clock"
                  >
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>

                {/* Button 3: People/Group */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${areIconsCollapsed ? 'w-0 opacity-0' : 'w-8 opacity-100'}`}>
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-white/20"
                    aria-label="People"
                  >
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>

                {/* Button 4: Calculator/Keypad */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${areIconsCollapsed ? 'w-0 opacity-0' : 'w-8 opacity-100'}`}>
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-white/20"
                    aria-label="Calculator"
                  >
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>

                {/* Button 5: Stars/Sparkles */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${areIconsCollapsed ? 'w-0 opacity-0' : 'w-8 opacity-100'}`}>
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-white/20"
                    aria-label="Stars"
                  >
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.519 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.519-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                </div>

                {/* Button 6: Additional Icon (Document/File) */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${areIconsCollapsed ? 'w-0 opacity-0' : 'w-8 opacity-100'}`}>
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-white/20"
                    aria-label="Document"
                  >
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Radial decoration synced with refresh */}
          <RadialDecoration isLoading={refreshing !== null || refreshingKPI !== null} />

          {/* Text positioned on left side of RadialDecoration */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10">
            {/* Clario Logo and Name */}
            <div className="flex items-center gap-3 mb-8">
              {/* Clario Logo - Stylized curved C shapes in pinwheel pattern */}
              <div className="w-14 h-14 flex items-center justify-center relative flex-shrink-0">
                <svg 
                  width="56" 
                  height="56" 
                  viewBox="0 0 56 56" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-lg"
                >
                  <defs>
                    <filter id="clario-glow">
                      <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Three overlapping crescent/C shapes in pinwheel pattern */}
                  <path 
                    d="M28 12 C28 12, 22 18, 22 24 C22 30, 28 36, 34 36 C34 36, 38 32, 38 28 C38 24, 34 20, 30 20 C30 20, 26 16, 28 12 Z" 
                    fill="white" 
                    opacity="0.95"
                    filter="url(#clario-glow)"
                    transform="rotate(0 28 28)"
                  />
                  <path 
                    d="M28 12 C28 12, 22 18, 22 24 C22 30, 28 36, 34 36 C34 36, 38 32, 38 28 C38 24, 34 20, 30 20 C30 20, 26 16, 28 12 Z" 
                    fill="white" 
                    opacity="0.95"
                    filter="url(#clario-glow)"
                    transform="rotate(120 28 28)"
                  />
                  <path 
                    d="M28 12 C28 12, 22 18, 22 24 C22 30, 28 36, 34 36 C34 36, 38 32, 38 28 C38 24, 34 20, 30 20 C30 20, 26 16, 28 12 Z" 
                    fill="white" 
                    opacity="0.95"
                    filter="url(#clario-glow)"
                    transform="rotate(240 28 28)"
                  />
                </svg>
              </div>
              {/* Clario Name */}
              <motion.h2 
                className="text-3xl font-semibold text-white drop-shadow-lg tracking-wide overflow-hidden" 
                style={{ textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}
                initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                Clario
              </motion.h2>
            </div>
            
            <motion.p 
              className="text-2xl text-blue-700/70 mb-1 overflow-hidden"
              initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              {currentUserRole} Dashboard
            </motion.p>
            <motion.h1 
              key={hoveredCardName || "default"}
              className="text-6xl md:text-7xl font-semibold text-blue-900 leading-tight overflow-hidden"
              initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {hoveredCardName ? hoveredCardName.charAt(0).toUpperCase() + hoveredCardName.slice(1) : "All Client Data"}
            </motion.h1>
          </div>

          <div className="mt-0" style={{ position: 'relative', overflow: 'visible' }}>
            <ClientTabsRow 
              selectedId={selectedClientId}
              onCardHover={setHoveredCardName} 
              onSelect={(id) => {
                setSelectedClientId(id);
                if (id !== "1342") {
                  setSelectedLeadsOption(null);
                }
                if (id !== "8765") {
                  setSelectedTasksOption(null);
                }
                if (id !== "5732") {
                  setSelectedPipelinesOption(null);
                }
                if (id !== "9864") {
                  setSelectedClientsOption(null);
                }
                if (id !== "9632") {
                  setSelectedOnboardingOption(null);
                }
                if (id !== "2451") {
                  setSelectedPerformanceTrackerOption(null);
                }
                if (id !== "3892") {
                  setSelectedAnalyticsOption(null);
                }
                if (id !== "4567") {
                  setSelectedReportsOption(null);
                }
                if (id !== "5123") {
                  setSelectedDocumentsOption(null);
                }
              }}
              onLeadsOptionSelect={(option) => {
                setSelectedLeadsOption(option);
                if (option !== "Import Leads") {
                  setIsImportComplete(false);
                }
              }}
              selectedLeadsOption={selectedLeadsOption}
              onTasksOptionSelect={(option) => {
                setSelectedTasksOption(option);
              }}
              selectedTasksOption={selectedTasksOption}
              onPipelinesOptionSelect={(option) => {
                setSelectedPipelinesOption(option);
              }}
              selectedPipelinesOption={selectedPipelinesOption}
              onClientsOptionSelect={(option) => {
                setSelectedClientsOption(option);
              }}
              selectedClientsOption={selectedClientsOption}
              onOnboardingOptionSelect={(option) => {
                setSelectedOnboardingOption(option);
              }}
              selectedOnboardingOption={selectedOnboardingOption}
              onPerformanceTrackerOptionSelect={(option) => {
                setSelectedPerformanceTrackerOption(option);
              }}
              selectedPerformanceTrackerOption={selectedPerformanceTrackerOption}
              onAnalyticsOptionSelect={(option) => {
                setSelectedAnalyticsOption(option);
              }}
              selectedAnalyticsOption={selectedAnalyticsOption}
              onReportsOptionSelect={(option) => {
                setSelectedReportsOption(option);
              }}
              selectedReportsOption={selectedReportsOption}
              onDocumentsOptionSelect={(option) => {
                setSelectedDocumentsOption(option);
              }}
              selectedDocumentsOption={selectedDocumentsOption}
            />
          </div>

          {/* Right-side badges removed as requested */}
        </div>
      </div>

      <div className="px-4">
        <div className="-mt-4 rounded-t-[32px] bg-white shadow-[0_-6px_20px_rgba(0,0,0,0.06)] border border-white/70 overflow-hidden">

          {selectedClientId === "1342" && selectedLeadsOption === "Import Leads" ? (
            // Show Import Leads component in same grid layout as cards
            <div className="grid grid-cols-3 gap-6 p-6 w-1000px">
              <div className="col-span-2">
                <ImportLeads onImportComplete={() => setIsImportComplete(true)} />
              </div>
              <div className="row-span-2">
                <ImportHistory />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6 p-6 w-1000px">
              <div className={`col-span-2 ${selectedClientId === "1342" && selectedLeadsOption === "All Leads" ? "flex flex-col gap-4" : ""}`}>
                <div className={`grid gap-4 ${selectedClientId === "1342" ? "grid-cols-4" : selectedClientId === "8765" ? "grid-cols-4" : selectedClientId === "5732" ? "grid-cols-4" : selectedClientId === "9864" ? "grid-cols-4" : selectedClientId === "9632" ? "grid-cols-4" : "grid-cols-3"}`}>
                {selectedClientId === "9632" && selectedOnboardingOption === "Upload Agreements/KYC" ? (
                  // Upload Agreements/KYC KPI cards (Total Documents, Pending Review, Approved, Need Changes)
                  <>
                    <KPICard
                      title="Total Documents"
                      value={uploadAgreementsKPIData.totalDocuments.value}
                      trend={uploadAgreementsKPIData.totalDocuments.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("totalDocuments")}
                      isRefreshing={refreshingKPI === "totalDocuments"}
                    />
                    <KPICard
                      title="Pending Review"
                      value={uploadAgreementsKPIData.pendingReview.value}
                      trend={uploadAgreementsKPIData.pendingReview.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("pendingReview")}
                      isRefreshing={refreshingKPI === "pendingReview"}
                    />
                    <KPICard
                      title="Approved"
                      value={uploadAgreementsKPIData.approved.value}
                      trend={uploadAgreementsKPIData.approved.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("approved")}
                      isRefreshing={refreshingKPI === "approved"}
                    />
                    <KPICard
                      title="Need Changes"
                      value={uploadAgreementsKPIData.needChanges.value}
                      trend={uploadAgreementsKPIData.needChanges.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("needChanges")}
                      isRefreshing={refreshingKPI === "needChanges"}
                    />
                  </>
                ) : selectedClientId === "9632" && selectedOnboardingOption === "Completed" ? (
                  // Completed Onboarding KPI cards (Completed, Avg Progress, On Time, Avg Duration)
                  <>
                    <KPICard
                      title="Completed"
                      value={completedOnboardingKPIData.completed.value}
                      trend={completedOnboardingKPIData.completed.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("completed")}
                      isRefreshing={refreshingKPI === "completed"}
                    />
                    <KPICard
                      title="Avg Progress"
                      value={completedOnboardingKPIData.avgProgress.value}
                      trend={completedOnboardingKPIData.avgProgress.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("avgProgress")}
                      isRefreshing={refreshingKPI === "avgProgress"}
                    />
                    <KPICard
                      title="On Time"
                      value={completedOnboardingKPIData.onTime.value}
                      trend={completedOnboardingKPIData.onTime.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("onTime")}
                      isRefreshing={refreshingKPI === "onTime"}
                    />
                    <KPICard
                      title="Avg Duration"
                      value={completedOnboardingKPIData.avgDuration.value}
                      trend={completedOnboardingKPIData.avgDuration.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("avgDuration")}
                      isRefreshing={refreshingKPI === "avgDuration"}
                    />
                  </>
                ) : selectedClientId === "9632" && (selectedOnboardingOption === "Pending" || selectedOnboardingOption === null) ? (
                  // Onboarding KPI cards (Active Onboarding, Avg Progress, Due Soon, Overdue)
                  <>
                    <KPICard
                      title="Active Onboarding"
                      value={onboardingKPIData.activeOnboarding.value}
                      trend={onboardingKPIData.activeOnboarding.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("activeOnboarding")}
                      isRefreshing={refreshingKPI === "activeOnboarding"}
                    />
                    <KPICard
                      title="Avg Progress"
                      value={onboardingKPIData.avgProgress.value}
                      trend={onboardingKPIData.avgProgress.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("avgProgress")}
                      isRefreshing={refreshingKPI === "avgProgress"}
                    />
                    <KPICard
                      title="Due Soon"
                      value={onboardingKPIData.dueSoon.value}
                      trend={onboardingKPIData.dueSoon.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("dueSoon")}
                      isRefreshing={refreshingKPI === "dueSoon"}
                    />
                    <KPICard
                      title="Overdue"
                      value={onboardingKPIData.overdue.value}
                      trend={onboardingKPIData.overdue.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("overdue")}
                      isRefreshing={refreshingKPI === "overdue"}
                    />
                  </>
                ) : selectedClientId === "9864" && selectedClientsOption === "My Client" ? (
                  // My Clients KPI cards (My Clients, Active Clients, Total Revenue, Avg Satisfaction)
                  <>
                    <KPICard
                      title="My Clients"
                      value={myClientsKPIData.myClients.value}
                      trend={myClientsKPIData.myClients.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("myClients")}
                      isRefreshing={refreshingKPI === "myClients"}
                    />
                    <KPICard
                      title="Active Clients"
                      value={myClientsKPIData.activeClients.value}
                      trend={myClientsKPIData.activeClients.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("activeClients")}
                      isRefreshing={refreshingKPI === "activeClients"}
                    />
                    <KPICard
                      title="Total Revenue"
                      value={myClientsKPIData.totalRevenue.value}
                      trend={myClientsKPIData.totalRevenue.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("totalRevenue")}
                      isRefreshing={refreshingKPI === "totalRevenue"}
                    />
                    <KPICard
                      title="Avg Satisfaction"
                      value={myClientsKPIData.avgSatisfaction.value}
                      trend={myClientsKPIData.avgSatisfaction.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.519 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.519-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("avgSatisfaction")}
                      isRefreshing={refreshingKPI === "avgSatisfaction"}
                    />
                  </>
                ) : selectedClientId === "9864" && (selectedClientsOption === "All Client" || selectedClientsOption === null) ? (
                  // Clients KPI cards (Total Clients, Active Clients, Total Revenue, Avg Satisfaction)
                  <>
                    <KPICard
                      title="Total Clients"
                      value={clientsKPIData.totalClients.value}
                      trend={clientsKPIData.totalClients.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("totalClients")}
                      isRefreshing={refreshingKPI === "totalClients"}
                    />
                    <KPICard
                      title="Active Clients"
                      value={clientsKPIData.activeClients.value}
                      trend={clientsKPIData.activeClients.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("activeClients")}
                      isRefreshing={refreshingKPI === "activeClients"}
                    />
                    <KPICard
                      title="Total Revenue"
                      value={clientsKPIData.totalRevenue.value}
                      trend={clientsKPIData.totalRevenue.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("totalRevenue")}
                      isRefreshing={refreshingKPI === "totalRevenue"}
                    />
                    <KPICard
                      title="Avg Satisfaction"
                      value={clientsKPIData.avgSatisfaction.value}
                      trend={clientsKPIData.avgSatisfaction.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("avgSatisfaction")}
                      isRefreshing={refreshingKPI === "avgSatisfaction"}
                    />
                  </>
                ) : selectedClientId === "5732" ? (
                  // Pipelines KPI cards (Total Pipeline Value, Weighted Pipeline, Active Deals, Avg Deal Size)
                  <>
                    <KPICard
                      title="Total Pipeline Value"
                      value={pipelinesKPIData.totalPipelineValue.value}
                      trend={pipelinesKPIData.totalPipelineValue.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("totalPipelineValue")}
                      isRefreshing={refreshingKPI === "totalPipelineValue"}
                    />
                    <KPICard
                      title="Weighted Pipeline"
                      value={pipelinesKPIData.weightedPipeline.value}
                      trend={pipelinesKPIData.weightedPipeline.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("weightedPipeline")}
                      isRefreshing={refreshingKPI === "weightedPipeline"}
                    />
                    <KPICard
                      title="Active Deals"
                      value={pipelinesKPIData.activeDeals.value}
                      trend={pipelinesKPIData.activeDeals.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("activeDeals")}
                      isRefreshing={refreshingKPI === "activeDeals"}
                    />
                    <KPICard
                      title="Avg Deal Size"
                      value={pipelinesKPIData.avgDealSize.value}
                      trend={pipelinesKPIData.avgDealSize.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("avgDealSize")}
                      isRefreshing={refreshingKPI === "avgDealSize"}
                    />
                  </>
                ) : selectedClientId === "8765" && selectedTasksOption === "Team Task" ? (
                  // Team Tasks KPI cards (Total Tasks, In Progress, Due Today, Completed)
                  <>
                    <KPICard
                      title="Total Tasks"
                      value={teamTasksKPIData.totalTasks.value}
                      trend={teamTasksKPIData.totalTasks.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("totalTasks")}
                      isRefreshing={refreshingKPI === "totalTasks"}
                    />
                    <KPICard
                      title="In Progress"
                      value={teamTasksKPIData.inProgress.value}
                      trend={teamTasksKPIData.inProgress.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("inProgress")}
                      isRefreshing={refreshingKPI === "inProgress"}
                    />
                    <KPICard
                      title="Due Today"
                      value={teamTasksKPIData.dueToday.value}
                      trend={teamTasksKPIData.dueToday.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("dueToday")}
                      isRefreshing={refreshingKPI === "dueToday"}
                    />
                    <KPICard
                      title="Completed"
                      value={teamTasksKPIData.completed.value}
                      trend={teamTasksKPIData.completed.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("completed")}
                      isRefreshing={refreshingKPI === "completed"}
                    />
                  </>
                ) : selectedClientId === "8765" && (selectedTasksOption === "My Task" || selectedTasksOption === null) ? (
                  // Tasks KPI cards (My Tasks, In Progress, Due Today, Completed)
                  <>
                    <KPICard
                      title="My Tasks"
                      value={tasksKPIData.myTasks.value}
                      trend={tasksKPIData.myTasks.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("myTasks")}
                      isRefreshing={refreshingKPI === "myTasks"}
                    />
                    <KPICard
                      title="In Progress"
                      value={tasksKPIData.inProgress.value}
                      trend={tasksKPIData.inProgress.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("inProgress")}
                      isRefreshing={refreshingKPI === "inProgress"}
                    />
                    <KPICard
                      title="Due Today"
                      value={tasksKPIData.dueToday.value}
                      trend={tasksKPIData.dueToday.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("dueToday")}
                      isRefreshing={refreshingKPI === "dueToday"}
                    />
                    <KPICard
                      title="Completed"
                      value={tasksKPIData.completed.value}
                      trend={tasksKPIData.completed.trend}
                      icon={
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                      onRefresh={() => refreshKPI("completed")}
                      isRefreshing={refreshingKPI === "completed"}
                    />
                  </>
                ) : selectedClientId === "1342" && selectedLeadsOption === "All Leads" ? (
                // All Leads KPI cards (Total Leads: 2,847, Active Leads, This Week, Conversion Rate)
                <>
                  <KPICard
                    title="Total Leads"
                    value={leadsKPIData.totalLeads.value}
                    trend={leadsKPIData.totalLeads.trend}
                    icon={
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    }
                    onRefresh={() => refreshKPI("totalLeads")}
                    isRefreshing={refreshingKPI === "totalLeads"}
                  />
                  <KPICard
                    title="Active Leads"
                    value={leadsKPIData.activeLeads.value}
                    trend={leadsKPIData.activeLeads.trend}
                    icon={
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    }
                    onRefresh={() => refreshKPI("activeLeads")}
                    isRefreshing={refreshingKPI === "activeLeads"}
                  />
                  <KPICard
                    title="This Week"
                    value={leadsKPIData.thisWeek.value}
                    trend={leadsKPIData.thisWeek.trend}
                    icon={
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    }
                    onRefresh={() => refreshKPI("thisWeek")}
                    isRefreshing={refreshingKPI === "thisWeek"}
                  />
                  <KPICard
                    title="Conversion Rate"
                    value={leadsKPIData.conversionRate.value}
                    trend={leadsKPIData.conversionRate.trend}
                    icon={
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                    onRefresh={() => refreshKPI("conversionRate")}
                    isRefreshing={refreshingKPI === "conversionRate"}
                  />
                </>
              ) : selectedClientId === "1342" && selectedLeadsOption !== "All Leads" ? (
                // Leads KPI cards (when clicking on Leads card directly - Total Leads: 7,037, Total Revenue, Overall ROI, Avg Conv. Rate)
                <>
                  <KPICard
                    title="Total Leads"
                    value={allLeadsKPIData.totalLeads.value}
                    trend={allLeadsKPIData.totalLeads.trend}
                    icon={
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-blue-300"></div>
                      </div>
                    }
                    onRefresh={() => refreshKPI("totalLeads")}
                    isRefreshing={refreshingKPI === "totalLeads"}
                  />
                  <KPICard
                    title="Total Revenue"
                    value={allLeadsKPIData.totalRevenue.value}
                    trend={allLeadsKPIData.totalRevenue.trend}
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    }
                    onRefresh={() => refreshKPI("totalRevenue")}
                    isRefreshing={refreshingKPI === "totalRevenue"}
                  />
                  <KPICard
                    title="Overall ROI"
                    value={allLeadsKPIData.overallROI.value}
                    trend={allLeadsKPIData.overallROI.trend}
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    }
                    onRefresh={() => refreshKPI("overallROI")}
                    isRefreshing={refreshingKPI === "overallROI"}
                  />
                  <KPICard
                    title="Avg Conv. Rate"
                    value={allLeadsKPIData.avgConvRate.value}
                    trend={allLeadsKPIData.avgConvRate.trend}
                    icon={
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-blue-300"></div>
                      </div>
                    }
                    onRefresh={() => refreshKPI("avgConvRate")}
                    isRefreshing={refreshingKPI === "avgConvRate"}
                  />
                </>
              ) : (
                // Default cards for other tabs
                <>
                  <DashboardCard
                    title="Payment"
                    value={`${data.payment},00%`}
                    subtitle={`Last transaction: ${data.lastTx}`}
                    progress={data.payment}
                    onRefresh={() => refreshMetric("payment")}
                    isRefreshing={refreshing === "payment"}
                  />
                  <DashboardCard
                    title="Statement Overview"
                    value={`${data.statement},00%`}
                    subtitle={`Last statements: ${data.lastStmt}`}
                    progress={data.statement}
                    onRefresh={() => refreshMetric("statement")}
                    isRefreshing={refreshing === "statement"}
                  />
                  <DashboardCard
                    title="Discrepancies"
                    value={`${data.discrepancies},00%`}
                    subtitle={`Last exceptions: ${data.lastExc}`}
                    progress={data.discrepancies}
                    onRefresh={() => refreshMetric("discrepancies")}
                    isRefreshing={refreshing === "discrepancies"}
                  />
                  <DashboardCard
                    title="On-Time Month Closures"
                    value={`${data.closures},00%`}
                    subtitle="Typical Account Metrics"
                    progress={data.closures}
                    onRefresh={() => refreshMetric("closures")}
                    isRefreshing={refreshing === "closures"}
                  />
                  <DashboardCard
                    title="Usage Rate"
                    value={`${data.usage},00%`}
                    subtitle="Typical Account Metrics"
                    progress={data.usage}
                    onRefresh={() => refreshMetric("usage")}
                    isRefreshing={refreshing === "usage"}
                  />
                </>
              )}
                </div>
                {/* Add Lead Box - Only for All Leads */}
                {selectedClientId === "1342" && (selectedLeadsOption === "All Leads" || selectedLeadsOption === null) && (
                  <div className="mt-4">
                    <AddLeadBox />
                  </div>
                )}
              </div>
              <div className="row-span-2">
                {selectedClientId === "1342" && selectedLeadsOption === "My Leads" ? (
                  <MyLeadsBox />
                ) : selectedClientId === "1342" && (selectedLeadsOption === "All Leads" || selectedLeadsOption === null) ? (
                  <AllLeadsBox />
                ) : selectedClientId === "8765" && selectedTasksOption === "Team Task" ? (
                  <TeamTaskBox />
                ) : selectedClientId === "8765" && selectedTasksOption === "My Task" ? (
                  <MyTaskBox />
                ) : selectedClientId === "8765" ? (
                  <ChatAssistant />
                ) : (
                  <ChatAssistant />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
