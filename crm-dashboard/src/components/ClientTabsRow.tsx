import React from "react";

type Client = { name: string; id: string };

const clients: Client[] = [
  { name: "leads", id: "1342" },
  { name: "tasks", id: "8765" },
  { name: "pipelines", id: "5732" },
  { name: "clients", id: "9864" },
  { name: "onboarding", id: "9632" },
];

type Props = {
  selectedId?: string;
  onSelect?: (id: string) => void;
};

export default function ClientTabsRow({ selectedId, onSelect }: Props) {
  const [isLeadsMenuOpen, setIsLeadsMenuOpen] = React.useState(false);
  const [selectedLeadsOption, setSelectedLeadsOption] = React.useState<string | null>("All Leads");

  const leadsOptions = ["All Leads", "My Leads", "Import Leads"];

  const handleLeadsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLeadsMenuOpen(!isLeadsMenuOpen);
    if (onSelect) {
      onSelect("1342");
    }
  };

  const handleOptionClick = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLeadsOption(option);
    setIsLeadsMenuOpen(false);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.leads-menu-wrapper')) {
        setIsLeadsMenuOpen(false);
      }
    };

    if (isLeadsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLeadsMenuOpen]);

  return (
    <div className="relative mt-4">
      <div className="grid grid-cols-5 gap-3">
        {clients.map((c, i) => {
          const isLeads = c.id === "1342";
          return (
            <div key={c.id} className="relative leads-menu-wrapper">
              <button
                type="button"
                aria-label={`Open ${c.name} (${c.id})`}
                className={
                  (selectedId === c.id
                    ? "h-16 rounded-2xl bg-white/70 border border-white/80 shadow-lg text-white backdrop-blur flex items-center justify-between px-4 cursor-pointer focus:outline-none w-full"
                    : "h-16 rounded-2xl bg-white/25 hover:bg-white/35 border border-white/50 shadow-sm text-white/90 backdrop-blur flex items-center justify-between px-4 cursor-pointer focus:outline-none opacity-80 hover:opacity-100 w-full")
                }
                onClick={isLeads ? handleLeadsClick : () => onSelect && onSelect(c.id)}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/60" />
                  <div className="text-xs text-left">
                    <p className="font-medium text-white drop-shadow">{c.name}</p>
                    <p className="text-[10px] text-white/80 drop-shadow">ID: {c.id}</p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-white/40 flex items-center justify-center text-[10px]">⟳</div>
              </button>

              {/* Leads Dropdown Menu - appears ABOVE the card */}
              {isLeads && isLeadsMenuOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden min-w-[140px]">
                  {leadsOptions.map((option, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => handleOptionClick(option, e)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        selectedLeadsOption === option
                          ? "bg-gray-100 text-gray-900 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      } ${idx !== leadsOptions.length - 1 ? "border-b border-gray-100" : ""}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


