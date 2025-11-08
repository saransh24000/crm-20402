// src/components/DashboardCard.tsx
interface CardProps {
    title: string;
    value: string;
    subtitle: string;
    progress?: number;
    isHighlighted?: boolean; // for middle elevated card
    onRefresh?: () => void;
    isRefreshing?: boolean;
  }
  
  const DashboardCard = ({ title, value, subtitle, progress, isHighlighted, onRefresh, isRefreshing }: CardProps) => {
    return (
      <div
        className={`relative w-full rounded-2xl p-6 min-h-[150px] transition-all duration-300
          ${
            isHighlighted
              ? "bg-white shadow-xl border border-white/70 -mt-10 z-20 scale-[1.03]"
              : "bg-white/70 backdrop-blur-md shadow-sm border border-white/40"
          }`}
      >
        {/* Top Section */}
        <div className="flex justify-between items-center">
          <h3 className="text-base font-medium text-gray-700 drop-shadow-sm">{title}</h3>
          <button
            className={`text-gray-400 text-sm ${isRefreshing ? "animate-spin" : ""}`}
            aria-label="Refresh"
            onClick={onRefresh}
          >
            ⟳
          </button>
        </div>
  
        {/* Value */}
        <p className="text-3xl font-semibold mt-3 text-gray-900">{value}</p>
        <p className="text-sm text-gray-400">{subtitle}</p>
  
        {/* Segmented Progress Bar */}
        {progress !== undefined && (
          <div className="mt-3 w-full">
            {(() => {
              const segmentCount = 24; // number of small blocks
              const filled = Math.round(((progress || 0) / 100) * segmentCount);
              const segments = Array.from({ length: segmentCount });
              return (
                <div className="flex gap-[2px]">
                  {segments.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 flex-1 rounded-[2px] ${idx < filled ? "bg-green-400/80" : "bg-gray-200"}`}
                    />
                  ))}
                </div>
              );
            })()}
          </div>
        )}
  
        {/* Bottom Curve (only for center card or when merging) */}
        {isHighlighted && (
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[80%]">
            <div className="h-8 bg-white rounded-t-[30px] shadow-[0_-6px_20px_rgba(0,0,0,0.08)]"></div>
          </div>
        )}
      </div>
    );
  };
  
  export default DashboardCard;
  