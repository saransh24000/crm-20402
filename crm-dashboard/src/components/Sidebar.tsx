import React from "react";

type SidebarProps = {
  onSelectOption?: (option: string) => void;
};

export default function Sidebar({ onSelectOption }: SidebarProps) {
  const [isLeadsOpen, setIsLeadsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<string | null>("All Leads");

  const handleLeadsClick = () => {
    setIsLeadsOpen(!isLeadsOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    if (onSelectOption) {
      onSelectOption(option);
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-10">
      <div className="p-4 pt-20">
        {/* Leads Menu Item */}
        <div>
          <button
            onClick={handleLeadsClick}
            className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* Icon - three people */}
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="font-medium">Leads</span>
            </div>
            {/* Chevron icon */}
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${isLeadsOpen ? "rotate-90" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Sub-options */}
          {isLeadsOpen && (
            <div className="mt-1 ml-8 space-y-1">
              <button
                onClick={() => handleOptionClick("All Leads")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedOption === "All Leads"
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                All Leads
              </button>
              <button
                onClick={() => handleOptionClick("My Leads")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedOption === "My Leads"
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                My Leads
              </button>
              <button
                onClick={() => handleOptionClick("Import Leads")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedOption === "Import Leads"
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Import Leads
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
