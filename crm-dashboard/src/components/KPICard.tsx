// src/components/KPICard.tsx
interface KPICardProps {
  title: string;
  value: string;
  trend: string; // e.g., "+14.2% vs last month"
  icon?: React.ReactNode;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

const KPICard = ({ title, value, trend, icon, onRefresh, isRefreshing }: KPICardProps) => {
  return (
    <div className="relative w-full rounded-2xl p-6 min-h-[150px] bg-white shadow-sm border border-gray-100 transition-all duration-300">
      {/* Top Section */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="flex items-center gap-2">
          {icon && <div className="text-gray-400">{icon}</div>}
          <button
            className={`text-gray-400 hover:text-gray-600 text-sm transition-colors ${isRefreshing ? "animate-spin" : ""}`}
            aria-label="Refresh"
            onClick={onRefresh}
            disabled={isRefreshing}
          >
            ⟳
          </button>
        </div>
      </div>

      {/* Value */}
      <p className="text-3xl font-semibold mb-2 text-gray-900">{value}</p>
      
      {/* Trend Indicator */}
      <div className="flex items-center gap-1 text-sm">
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <span className="text-green-600 font-medium">{trend}</span>
      </div>
    </div>
  );
};

export default KPICard;

