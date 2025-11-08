// src/pages/Dashboard.tsx
import BrowserHeader from "../components/BrowserHeader";
import DashboardCard from "../components/DashboardCard";
import KPICard from "../components/KPICard";
import ChatAssistant from "../components/ChatAssistant";
import RadialDecoration from "../components/RadialDecoration";
import ClientTabsRow from "../components/ClientTabsRow";
import React from "react";

export default function Dashboard() {
  const [selectedClientId, setSelectedClientId] = React.useState("5732"); // default pipelines

  // Per-client dataset for the cards below
  const datasets: Record<string, { payment: number; statement: number; discrepancies: number; closures: number; usage: number; lastTx: string; lastStmt: string; lastExc: string; }> = {
    "1342": { payment: 68, statement: 55, discrepancies: 18, closures: 73, usage: 42, lastTx: "April 5", lastStmt: "April 4", lastExc: "April 4" }, // leads
    "8765": { payment: 75, statement: 62, discrepancies: 11, closures: 80, usage: 49, lastTx: "April 7", lastStmt: "April 6", lastExc: "April 6" }, // tasks
    "5732": { payment: 72, statement: 61, discrepancies: 14, closures: 77, usage: 46, lastTx: "April 7", lastStmt: "April 6", lastExc: "April 7" }, // pipelines
    "9864": { payment: 64, statement: 58, discrepancies: 20, closures: 70, usage: 44, lastTx: "April 3", lastStmt: "April 2", lastExc: "April 3" }, // clients
    "9632": { payment: 79, statement: 66, discrepancies: 9,  closures: 83, usage: 52, lastTx: "April 8", lastStmt: "April 7", lastExc: "April 7" }, // onboarding
  };

  // Leads-specific KPI data
  const [leadsKPIData, setLeadsKPIData] = React.useState({
    totalLeads: { value: "7,037", trend: "+14.2% vs last month" },
    totalRevenue: { value: "$4.0M", trend: "+18.7% vs last month" },
    overallROI: { value: "1714%", trend: "+22.1% vs last month" },
    avgConvRate: { value: "23.9%", trend: "+2.3% vs last month" },
  });

  const [refreshingKPI, setRefreshingKPI] = React.useState<string | null>(null);

  // Helper function to jitter numbers
  function jitterNumber(value: string, isPercentage = false, isCurrency = false): string {
    let num: number;
    
    if (isCurrency) {
      // Handle currency format like "$4.0M"
      if (value.includes("M")) {
        const numStr = value.replace(/[^0-9.]/g, "");
        num = parseFloat(numStr) * 1000; // Convert to base number
      } else {
        const numStr = value.replace(/[^0-9.]/g, "");
        num = parseFloat(numStr);
      }
    } else {
      const numStr = value.replace(/[^0-9.]/g, "");
      num = parseFloat(numStr);
    }
    
    if (isNaN(num)) return value;
    
    const delta = (Math.random() * 0.1 - 0.05) * num; // ±5% variation
    const newNum = Math.max(0, num + delta);
    
    if (isCurrency) {
      if (newNum >= 1000) return `$${(newNum / 1000).toFixed(1)}M`;
      return `$${newNum.toFixed(0)}`;
    }
    if (isPercentage) {
      return `${newNum.toFixed(1)}%`;
    }
    return Math.round(newNum).toLocaleString();
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

  function refreshKPI(key: "totalLeads" | "totalRevenue" | "overallROI" | "avgConvRate") {
    setRefreshingKPI(key);
    setTimeout(() => {
      setLeadsKPIData((prev) => {
        const updates: any = {};
        if (key === "totalLeads") {
          updates.totalLeads = {
            value: jitterNumber(prev.totalLeads.value),
            trend: jitterTrend(prev.totalLeads.trend),
          };
        } else if (key === "totalRevenue") {
          updates.totalRevenue = {
            value: jitterNumber(prev.totalRevenue.value, false, true),
            trend: jitterTrend(prev.totalRevenue.trend),
          };
        } else if (key === "overallROI") {
          updates.overallROI = {
            value: jitterNumber(prev.overallROI.value, true),
            trend: jitterTrend(prev.overallROI.trend),
          };
        } else if (key === "avgConvRate") {
          updates.avgConvRate = {
            value: jitterNumber(prev.avgConvRate.value, true),
            trend: jitterTrend(prev.avgConvRate.trend),
          };
        }
        return { ...prev, ...updates };
      });
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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50">
      <BrowserHeader />

      <div className="px-4  ">
        <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-200/70 to-blue-100/40 backdrop-blur">
          {/* Top toolbar chips */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700/70">Aggregated Client Metrics</p>
              <h1 className="text-4xl md:text-5xl font-semibold text-blue-900">All Client Data</h1>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                className="text-[10px] px-3 py-1 rounded-full bg-white/80 text-gray-700 hover:bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
                onClick={() => console.log("New message clicked")}
                aria-label="New message"
              >
                New message
              </button>
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

          {/* Radial decoration synced with refresh */}
          <RadialDecoration isLoading={refreshing !== null || refreshingKPI !== null} />

          <div className="mt-4">
            <ClientTabsRow selectedId={selectedClientId} onSelect={setSelectedClientId} />
          </div>

          {/* Right-side badges removed as requested */}
        </div>
      </div>

      <div className="px-4">
        <div className="-mt-4 rounded-t-[32px] bg-white shadow-[0_-6px_20px_rgba(0,0,0,0.06)] border border-white/70 overflow-hidden">

          <div className="grid grid-cols-3 gap-6 p-6 w-1000px">
            <div className={`col-span-2 grid gap-4 ${selectedClientId === "1342" ? "grid-cols-4" : "grid-cols-3"}`}>
              {selectedClientId === "1342" ? (
                // Leads-specific KPI cards
                <>
                  <KPICard
                    title="Total Leads"
                    value={leadsKPIData.totalLeads.value}
                    trend={leadsKPIData.totalLeads.trend}
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
                    value={leadsKPIData.totalRevenue.value}
                    trend={leadsKPIData.totalRevenue.trend}
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
                    value={leadsKPIData.overallROI.value}
                    trend={leadsKPIData.overallROI.trend}
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
                    value={leadsKPIData.avgConvRate.value}
                    trend={leadsKPIData.avgConvRate.trend}
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
            <div className="row-span-2">
              <ChatAssistant />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
