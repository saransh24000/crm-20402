import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Client = { name: string; id: string };

const clients: Client[] = [
  { name: "leads", id: "1342" },
  { name: "tasks", id: "8765" },
  { name: "pipelines", id: "5732" },
  { name: "clients", id: "9864" },
  { name: "onboarding", id: "9632" },
  { name: "performance tracker", id: "2451" },
  { name: "analytics", id: "3892" },
  { name: "reports", id: "4567" },
  { name: "documents/notes", id: "5123" },
  { name: "admin", id: "6789" },
];

type Props = {
  selectedId?: string;
  onSelect?: (id: string) => void;
  onCardHover?: (cardName: string | null) => void;
  onLeadsOptionSelect?: (option: string | null) => void;
  selectedLeadsOption?: string | null;
  onTasksOptionSelect?: (option: string | null) => void;
  selectedTasksOption?: string | null;
  onPipelinesOptionSelect?: (option: string | null) => void;
  selectedPipelinesOption?: string | null;
  onClientsOptionSelect?: (option: string | null) => void;
  selectedClientsOption?: string | null;
  onOnboardingOptionSelect?: (option: string | null) => void;
  selectedOnboardingOption?: string | null;
  onPerformanceTrackerOptionSelect?: (option: string | null) => void;
  selectedPerformanceTrackerOption?: string | null;
  onAnalyticsOptionSelect?: (option: string | null) => void;
  selectedAnalyticsOption?: string | null;
  onReportsOptionSelect?: (option: string | null) => void;
  selectedReportsOption?: string | null;
  onDocumentsOptionSelect?: (option: string | null) => void;
  selectedDocumentsOption?: string | null;
};

export default function ClientTabsRow({ selectedId, onSelect, onCardHover, onLeadsOptionSelect, selectedLeadsOption: externalSelectedLeadsOption, onTasksOptionSelect, selectedTasksOption: externalSelectedTasksOption, onPipelinesOptionSelect, selectedPipelinesOption: externalSelectedPipelinesOption, onClientsOptionSelect, selectedClientsOption: externalSelectedClientsOption, onOnboardingOptionSelect, selectedOnboardingOption: externalSelectedOnboardingOption, onPerformanceTrackerOptionSelect, selectedPerformanceTrackerOption: externalSelectedPerformanceTrackerOption, onAnalyticsOptionSelect, selectedAnalyticsOption: externalSelectedAnalyticsOption, onReportsOptionSelect, selectedReportsOption: externalSelectedReportsOption, onDocumentsOptionSelect, selectedDocumentsOption: externalSelectedDocumentsOption }: Props) {
  const [isLeadsMenuOpen, setIsLeadsMenuOpen] = React.useState(false);
  const [isTasksMenuOpen, setIsTasksMenuOpen] = React.useState(false);
  const [isPipelinesMenuOpen, setIsPipelinesMenuOpen] = React.useState(false);
  const [isClientsMenuOpen, setIsClientsMenuOpen] = React.useState(false);
  const [isOnboardingMenuOpen, setIsOnboardingMenuOpen] = React.useState(false);
  const [isPerformanceTrackerMenuOpen, setIsPerformanceTrackerMenuOpen] = React.useState(false);
  const [isAnalyticsMenuOpen, setIsAnalyticsMenuOpen] = React.useState(false);
  const [isReportsMenuOpen, setIsReportsMenuOpen] = React.useState(false);
  const [isDocumentsMenuOpen, setIsDocumentsMenuOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const cardsPerView = 5;
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [internalSelectedLeadsOption, setInternalSelectedLeadsOption] = React.useState<string | null>("All Leads");
  const [internalSelectedTasksOption, setInternalSelectedTasksOption] = React.useState<string | null>("My Task");
  const [internalSelectedPipelinesOption, setInternalSelectedPipelinesOption] = React.useState<string | null>(null);
  const [internalSelectedClientsOption, setInternalSelectedClientsOption] = React.useState<string | null>(null);
  const [internalSelectedOnboardingOption, setInternalSelectedOnboardingOption] = React.useState<string | null>(null);
  const [internalSelectedPerformanceTrackerOption, setInternalSelectedPerformanceTrackerOption] = React.useState<string | null>(null);
  const [internalSelectedAnalyticsOption, setInternalSelectedAnalyticsOption] = React.useState<string | null>(null);
  const [internalSelectedReportsOption, setInternalSelectedReportsOption] = React.useState<string | null>(null);
  const [internalSelectedDocumentsOption, setInternalSelectedDocumentsOption] = React.useState<string | null>(null);
  const selectedLeadsOption = externalSelectedLeadsOption !== undefined ? externalSelectedLeadsOption : internalSelectedLeadsOption;
  const selectedTasksOption = externalSelectedTasksOption !== undefined ? externalSelectedTasksOption : internalSelectedTasksOption;
  const selectedPipelinesOption = externalSelectedPipelinesOption !== undefined ? externalSelectedPipelinesOption : internalSelectedPipelinesOption;
  const selectedClientsOption = externalSelectedClientsOption !== undefined ? externalSelectedClientsOption : internalSelectedClientsOption;
  const selectedOnboardingOption = externalSelectedOnboardingOption !== undefined ? externalSelectedOnboardingOption : internalSelectedOnboardingOption;
  const selectedPerformanceTrackerOption = externalSelectedPerformanceTrackerOption !== undefined ? externalSelectedPerformanceTrackerOption : internalSelectedPerformanceTrackerOption;
  const selectedAnalyticsOption = externalSelectedAnalyticsOption !== undefined ? externalSelectedAnalyticsOption : internalSelectedAnalyticsOption;
  const selectedReportsOption = externalSelectedReportsOption !== undefined ? externalSelectedReportsOption : internalSelectedReportsOption;
  const selectedDocumentsOption = externalSelectedDocumentsOption !== undefined ? externalSelectedDocumentsOption : internalSelectedDocumentsOption;

  const leadsOptions = ["All Leads", "My Leads", "Import Leads"];
  const tasksOptions = ["Team Task", "My Task"];
  const pipelinesOptions = ["Staffing Pipeline", "SaaS Pipeline", "EdTech Pipeline"];
  const clientsOptions = ["My Client", "All Client"];
  const onboardingOptions = ["Pending", "Completed", "Upload Agreements/KYC"];
  const performanceTrackerOptions = ["my performance", "team performance", "KPI Tracking"];
  const analyticsOptions = ["lead sources", "Revenue analytics", "Conversion Analytics", "Target vs Achievement"];
  const reportsOptions = ["Sales Reports", "Performance Reports", "Custom Reports"];
  const documentsOptions = ["My documents", "Shared Documents", "Notes&Ideas"];

  const handleLeadsMouseEnter = () => {
    setIsLeadsMenuOpen(true);
    if (onSelect) {
      onSelect("1342");
    }
    if (onCardHover) {
      onCardHover("leads");
    }
  };

  const handleLeadsMouseLeave = () => {
    setIsLeadsMenuOpen(false);
    if (onCardHover) {
      onCardHover(null);
    }
  };

  const handleOptionClick = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (externalSelectedLeadsOption === undefined) {
      setInternalSelectedLeadsOption(option);
    }
    if (onLeadsOptionSelect) {
      onLeadsOptionSelect(option);
    }
    setIsLeadsMenuOpen(false);
  };


  const maxIndex = Math.max(0, clients.length - cardsPerView);

  const scrollLeft = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Auto-scroll to show selected card
  React.useEffect(() => {
    if (selectedId) {
      const selectedIndex = clients.findIndex((c) => c.id === selectedId);
      if (selectedIndex !== -1) {
        if (selectedIndex < currentIndex) {
          setCurrentIndex(selectedIndex);
        } else if (selectedIndex >= currentIndex + cardsPerView) {
          setCurrentIndex(Math.max(0, selectedIndex - cardsPerView + 1));
        }
      }
    }
  }, [selectedId, currentIndex]);

  return (
    <div className="relative mt-0 pt-2" style={{ zIndex: 30, position: 'relative' }}>
      {/* Left Navigation Button */}
      {currentIndex > 0 && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-[calc(2.5rem+2rem)] -translate-y-1/2 -translate-x-4 z-30 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg flex items-center justify-center hover:bg-white/90 transition-all duration-300 hover:scale-110"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
      )}

      {/* Right Navigation Button */}
      {currentIndex < maxIndex && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-[calc(2.5rem+2rem)] -translate-y-1/2 translate-x-4 z-30 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg flex items-center justify-center hover:bg-white/90 transition-all duration-300 hover:scale-110"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} className="text-gray-700" />
        </button>
      )}

      <div className="relative w-full" style={{ position: 'relative', maxWidth: '100%', overflowX: 'clip' }}>
        <div 
          ref={scrollContainerRef}
          className="flex gap-3 transition-transform duration-500 ease-in-out"
          style={{
            width: `${(clients.length / cardsPerView) * 100}%`,
            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            willChange: 'transform',
            position: 'relative',
          }}
        >
        {clients.map((c, i) => {
          const isLeads = c.id === "1342";
          const isTasks = c.id === "8765";
          const isPipelines = c.id === "5732";
          const isClients = c.id === "9864";
          const isOnboarding = c.id === "9632";
          const isPerformanceTracker = c.id === "2451";
          const isAnalytics = c.id === "3892";
          const isReports = c.id === "4567";
          const isDocuments = c.id === "5123";

          const handleTasksMouseEnter = () => {
            setIsTasksMenuOpen(true);
            if (onSelect) {
              onSelect("8765");
            }
            if (onCardHover) {
              onCardHover("tasks");
            }
          };

          const handleTasksMouseLeave = () => {
            setIsTasksMenuOpen(false);
            if (onCardHover) {
              onCardHover(null);
            }
          };

          const handleTasksOptionClick = (option: string, e: React.MouseEvent) => {
            e.stopPropagation();
            if (externalSelectedTasksOption === undefined) {
              setInternalSelectedTasksOption(option);
            }
            if (onTasksOptionSelect) {
              onTasksOptionSelect(option);
            }
            setIsTasksMenuOpen(false);
          };

          const handlePipelinesMouseEnter = () => {
            setIsPipelinesMenuOpen(true);
            if (onSelect) {
              onSelect("5732");
            }
            if (onCardHover) {
              onCardHover("pipelines");
            }
          };

          const handlePipelinesMouseLeave = () => {
            setIsPipelinesMenuOpen(false);
            if (onCardHover) {
              onCardHover(null);
            }
          };

          const handlePipelinesOptionClick = (option: string, e: React.MouseEvent) => {
            e.stopPropagation();
            if (externalSelectedPipelinesOption === undefined) {
              setInternalSelectedPipelinesOption(option);
            }
            if (onPipelinesOptionSelect) {
              onPipelinesOptionSelect(option);
            }
            setIsPipelinesMenuOpen(false);
          };

          const handleClientsMouseEnter = () => {
            setIsClientsMenuOpen(true);
            if (onSelect) {
              onSelect("9864");
            }
            if (onCardHover) {
              onCardHover("clients");
            }
          };

          const handleClientsMouseLeave = () => {
            setIsClientsMenuOpen(false);
            if (onCardHover) {
              onCardHover(null);
            }
          };

          const handleClientsOptionClick = (option: string, e: React.MouseEvent) => {
            e.stopPropagation();
            if (externalSelectedClientsOption === undefined) {
              setInternalSelectedClientsOption(option);
            }
            if (onClientsOptionSelect) {
              onClientsOptionSelect(option);
            }
            setIsClientsMenuOpen(false);
          };

          const handleOnboardingMouseEnter = () => {
            setIsOnboardingMenuOpen(true);
            if (onSelect) {
              onSelect("9632");
            }
            if (onCardHover) {
              onCardHover("onboarding");
            }
          };

          const handleOnboardingMouseLeave = () => {
            setIsOnboardingMenuOpen(false);
            if (onCardHover) {
              onCardHover(null);
            }
          };

          const handleOnboardingOptionClick = (option: string, e: React.MouseEvent) => {
            e.stopPropagation();
            if (externalSelectedOnboardingOption === undefined) {
              setInternalSelectedOnboardingOption(option);
            }
            if (onOnboardingOptionSelect) {
              onOnboardingOptionSelect(option);
            }
            setIsOnboardingMenuOpen(false);
          };

          const handlePerformanceTrackerMouseEnter = () => {
            setIsPerformanceTrackerMenuOpen(true);
            if (onSelect) {
              onSelect("2451");
            }
            if (onCardHover) {
              onCardHover("performance tracker");
            }
          };

          const handlePerformanceTrackerMouseLeave = () => {
            setIsPerformanceTrackerMenuOpen(false);
            if (onCardHover) {
              onCardHover(null);
            }
          };

          const handlePerformanceTrackerOptionClick = (option: string, e: React.MouseEvent) => {
            e.stopPropagation();
            if (externalSelectedPerformanceTrackerOption === undefined) {
              setInternalSelectedPerformanceTrackerOption(option);
            }
            if (onPerformanceTrackerOptionSelect) {
              onPerformanceTrackerOptionSelect(option);
            }
            setIsPerformanceTrackerMenuOpen(false);
          };

          const handleAnalyticsMouseEnter = () => {
            setIsAnalyticsMenuOpen(true);
            if (onSelect) {
              onSelect("3892");
            }
            if (onCardHover) {
              onCardHover("analytics");
            }
          };

          const handleAnalyticsMouseLeave = () => {
            setIsAnalyticsMenuOpen(false);
            if (onCardHover) {
              onCardHover(null);
            }
          };

          const handleAnalyticsOptionClick = (option: string, e: React.MouseEvent) => {
            e.stopPropagation();
            if (externalSelectedAnalyticsOption === undefined) {
              setInternalSelectedAnalyticsOption(option);
            }
            if (onAnalyticsOptionSelect) {
              onAnalyticsOptionSelect(option);
            }
            setIsAnalyticsMenuOpen(false);
          };

          const handleReportsMouseEnter = () => {
            setIsReportsMenuOpen(true);
            if (onSelect) {
              onSelect("4567");
            }
            if (onCardHover) {
              onCardHover("reports");
            }
          };

          const handleReportsMouseLeave = () => {
            setIsReportsMenuOpen(false);
            if (onCardHover) {
              onCardHover(null);
            }
          };

          const handleReportsOptionClick = (option: string, e: React.MouseEvent) => {
            e.stopPropagation();
            if (externalSelectedReportsOption === undefined) {
              setInternalSelectedReportsOption(option);
            }
            if (onReportsOptionSelect) {
              onReportsOptionSelect(option);
            }
            setIsReportsMenuOpen(false);
          };

          const handleDocumentsMouseEnter = () => {
            setIsDocumentsMenuOpen(true);
            if (onSelect) {
              onSelect("5123");
            }
            if (onCardHover) {
              onCardHover("documents/notes");
            }
          };

          const handleDocumentsMouseLeave = () => {
            setIsDocumentsMenuOpen(false);
            if (onCardHover) {
              onCardHover(null);
            }
          };

          const handleDocumentsOptionClick = (option: string, e: React.MouseEvent) => {
            e.stopPropagation();
            if (externalSelectedDocumentsOption === undefined) {
              setInternalSelectedDocumentsOption(option);
            }
            if (onDocumentsOptionSelect) {
              onDocumentsOptionSelect(option);
            }
            setIsDocumentsMenuOpen(false);
          };

          const isMenuOpen = (isLeads && isLeadsMenuOpen) || (isTasks && isTasksMenuOpen) || (isPipelines && isPipelinesMenuOpen) || (isClients && isClientsMenuOpen) || (isOnboarding && isOnboardingMenuOpen) || (isPerformanceTracker && isPerformanceTrackerMenuOpen) || (isAnalytics && isAnalyticsMenuOpen) || (isReports && isReportsMenuOpen) || (isDocuments && isDocumentsMenuOpen);
          
          return (
            <div 
              key={c.id} 
              className={`relative flex-shrink-0 group/card ${isLeads ? 'leads-menu-wrapper' : isTasks ? 'tasks-menu-wrapper' : isPipelines ? 'pipelines-menu-wrapper' : isClients ? 'clients-menu-wrapper' : isOnboarding ? 'onboarding-menu-wrapper' : isPerformanceTracker ? 'performance-tracker-menu-wrapper' : isAnalytics ? 'analytics-menu-wrapper' : isReports ? 'reports-menu-wrapper' : isDocuments ? 'documents-menu-wrapper' : ''}`} 
              style={{ 
                width: `${100 / clients.length}%`, 
                zIndex: isMenuOpen ? 100 : 1,
                position: 'relative',
                transformOrigin: 'bottom center',
              }}
              onMouseEnter={isLeads ? handleLeadsMouseEnter : isTasks ? handleTasksMouseEnter : isPipelines ? handlePipelinesMouseEnter : isClients ? handleClientsMouseEnter : isOnboarding ? handleOnboardingMouseEnter : isPerformanceTracker ? handlePerformanceTrackerMouseEnter : isAnalytics ? handleAnalyticsMouseEnter : isReports ? handleReportsMouseEnter : isDocuments ? handleDocumentsMouseEnter : undefined}
              onMouseLeave={isLeads ? handleLeadsMouseLeave : isTasks ? handleTasksMouseLeave : isPipelines ? handlePipelinesMouseLeave : isClients ? handleClientsMouseLeave : isOnboarding ? handleOnboardingMouseLeave : isPerformanceTracker ? handlePerformanceTrackerMouseLeave : isAnalytics ? handleAnalyticsMouseLeave : isReports ? handleReportsMouseLeave : isDocuments ? handleDocumentsMouseLeave : undefined}
            >
              {/* Expanded Card Container - expands upward */}
              <div
                className="relative transition-all duration-300 ease-out"
                style={{
                  transformOrigin: 'bottom center',
                  marginTop: isMenuOpen ? (isLeads ? '-120px' : isTasks ? '-80px' : isPipelines ? '-120px' : isClients ? '-80px' : isOnboarding ? '-120px' : isPerformanceTracker ? '-120px' : isAnalytics ? '-160px' : isReports ? '-120px' : isDocuments ? '-120px' : '0') : '0',
                }}
              >
                {/* Dropdown Menu - inside expanded card area, below button */}
                {isLeads && isLeadsMenuOpen && (
                  <div 
                    className="absolute top-full left-0 mt-0 w-full bg-white rounded-b-2xl rounded-t-none shadow-2xl border border-gray-200 border-t-0 overflow-hidden min-w-[140px]"
                    style={{ zIndex: 10, position: 'absolute', pointerEvents: 'auto' }}
                    onMouseEnter={handleLeadsMouseEnter}
                    onMouseLeave={handleLeadsMouseLeave}
                  >
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

                {isTasks && isTasksMenuOpen && (
                  <div 
                    className="absolute top-full left-0 mt-0 w-full bg-white rounded-b-2xl rounded-t-none shadow-2xl border border-gray-200 border-t-0 overflow-hidden min-w-[140px]"
                    style={{ zIndex: 10, position: 'absolute', pointerEvents: 'auto' }}
                    onMouseEnter={handleTasksMouseEnter}
                    onMouseLeave={handleTasksMouseLeave}
                  >
                    {tasksOptions.map((option, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => handleTasksOptionClick(option, e)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          selectedTasksOption === option
                            ? "bg-gray-100 text-gray-900 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        } ${idx !== tasksOptions.length - 1 ? "border-b border-gray-100" : ""}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {isPipelines && isPipelinesMenuOpen && (
                  <div 
                    className="absolute top-full left-0 mt-0 w-full bg-white rounded-b-2xl rounded-t-none shadow-2xl border border-gray-200 border-t-0 overflow-hidden min-w-[140px]"
                    style={{ zIndex: 10, position: 'absolute', pointerEvents: 'auto' }}
                    onMouseEnter={handlePipelinesMouseEnter}
                    onMouseLeave={handlePipelinesMouseLeave}
                  >
                    {pipelinesOptions.map((option, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => handlePipelinesOptionClick(option, e)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          selectedPipelinesOption === option
                            ? "bg-gray-100 text-gray-900 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        } ${idx !== pipelinesOptions.length - 1 ? "border-b border-gray-100" : ""}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {isClients && isClientsMenuOpen && (
                  <div 
                    className="absolute top-full left-0 mt-0 w-full bg-white rounded-b-2xl rounded-t-none shadow-2xl border border-gray-200 border-t-0 overflow-hidden min-w-[140px]"
                    style={{ zIndex: 10, position: 'absolute', pointerEvents: 'auto' }}
                    onMouseEnter={handleClientsMouseEnter}
                    onMouseLeave={handleClientsMouseLeave}
                  >
                    {clientsOptions.map((option, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => handleClientsOptionClick(option, e)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          selectedClientsOption === option
                            ? "bg-gray-100 text-gray-900 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        } ${idx !== clientsOptions.length - 1 ? "border-b border-gray-100" : ""}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {isOnboarding && isOnboardingMenuOpen && (
                  <div 
                    className="absolute top-full left-0 mt-0 w-full bg-white rounded-b-2xl rounded-t-none shadow-2xl border border-gray-200 border-t-0 overflow-hidden min-w-[180px]"
                    style={{ zIndex: 10, position: 'absolute', pointerEvents: 'auto' }}
                    onMouseEnter={handleOnboardingMouseEnter}
                    onMouseLeave={handleOnboardingMouseLeave}
                  >
                    {onboardingOptions.map((option, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => handleOnboardingOptionClick(option, e)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          selectedOnboardingOption === option
                            ? "bg-gray-100 text-gray-900 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        } ${idx !== onboardingOptions.length - 1 ? "border-b border-gray-100" : ""}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {isPerformanceTracker && isPerformanceTrackerMenuOpen && (
                  <div 
                    className="absolute top-full left-0 mt-0 w-full bg-white rounded-b-2xl rounded-t-none shadow-2xl border border-gray-200 border-t-0 overflow-hidden min-w-[180px]"
                    style={{ zIndex: 10, position: 'absolute', pointerEvents: 'auto' }}
                    onMouseEnter={handlePerformanceTrackerMouseEnter}
                    onMouseLeave={handlePerformanceTrackerMouseLeave}
                  >
                    {performanceTrackerOptions.map((option, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => handlePerformanceTrackerOptionClick(option, e)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          selectedPerformanceTrackerOption === option
                            ? "bg-gray-100 text-gray-900 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        } ${idx !== performanceTrackerOptions.length - 1 ? "border-b border-gray-100" : ""}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {isAnalytics && isAnalyticsMenuOpen && (
                  <div 
                    className="absolute top-full left-0 mt-0 w-full bg-white rounded-b-2xl rounded-t-none shadow-2xl border border-gray-200 border-t-0 overflow-hidden min-w-[180px]"
                    style={{ zIndex: 10, position: 'absolute', pointerEvents: 'auto' }}
                    onMouseEnter={handleAnalyticsMouseEnter}
                    onMouseLeave={handleAnalyticsMouseLeave}
                  >
                    {analyticsOptions.map((option, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => handleAnalyticsOptionClick(option, e)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          selectedAnalyticsOption === option
                            ? "bg-gray-100 text-gray-900 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        } ${idx !== analyticsOptions.length - 1 ? "border-b border-gray-100" : ""}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {isReports && isReportsMenuOpen && (
                  <div 
                    className="absolute top-full left-0 mt-0 w-full bg-white rounded-b-2xl rounded-t-none shadow-2xl border border-gray-200 border-t-0 overflow-hidden min-w-[180px]"
                    style={{ zIndex: 10, position: 'absolute', pointerEvents: 'auto' }}
                    onMouseEnter={handleReportsMouseEnter}
                    onMouseLeave={handleReportsMouseLeave}
                  >
                    {reportsOptions.map((option, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => handleReportsOptionClick(option, e)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          selectedReportsOption === option
                            ? "bg-gray-100 text-gray-900 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        } ${idx !== reportsOptions.length - 1 ? "border-b border-gray-100" : ""}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {isDocuments && isDocumentsMenuOpen && (
                  <div 
                    className="absolute top-full left-0 mt-0 w-full bg-white rounded-b-2xl rounded-t-none shadow-2xl border border-gray-200 border-t-0 overflow-hidden min-w-[180px]"
                    style={{ zIndex: 10, position: 'absolute', pointerEvents: 'auto' }}
                    onMouseEnter={handleDocumentsMouseEnter}
                    onMouseLeave={handleDocumentsMouseLeave}
                  >
                    {documentsOptions.map((option, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => handleDocumentsOptionClick(option, e)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          selectedDocumentsOption === option
                            ? "bg-gray-100 text-gray-900 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        } ${idx !== documentsOptions.length - 1 ? "border-b border-gray-100" : ""}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Card Button */}
                <button
                  type="button"
                  aria-label={`Open ${c.name} (${c.id})`}
                  className={
                    (selectedId === c.id
                      ? `h-16 rounded-2xl ${isMenuOpen ? 'bg-white border-white' : 'bg-white/70 border-white/80'} hover:bg-white border hover:border-white shadow-lg hover:shadow-xl backdrop-blur flex items-center justify-between px-4 cursor-pointer focus:outline-none w-full transition-all duration-300 ${isMenuOpen ? 'rounded-b-none' : ''} group relative overflow-visible`
                      : `h-16 rounded-2xl ${isMenuOpen ? 'bg-white border-white' : 'bg-white/25 border-white/50'} hover:bg-white border hover:border-white shadow-sm hover:shadow-md backdrop-blur flex items-center justify-between px-4 cursor-pointer focus:outline-none ${isMenuOpen ? 'opacity-100' : 'opacity-80'} hover:opacity-100 w-full transition-all duration-300 ${isMenuOpen ? 'rounded-b-none' : ''} group relative overflow-visible`)
                  }
                  onClick={() => onSelect && onSelect(c.id)}
                >
                  {/* Bottom Glow Line - Appears on Hover or when Menu is Open */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 transition-opacity duration-300 ease-out pointer-events-none z-10 ${isMenuOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-300/60 to-transparent" style={{ filter: 'blur(3px)' }}></div>
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-200/50 via-blue-100/70 to-blue-200/50"></div>
                  </div>
                  {/* Glow extending upward into card */}
                  <div className={`absolute bottom-0 left-0 right-0 h-3 transition-opacity duration-300 ease-out pointer-events-none z-0 ${isMenuOpen ? 'opacity-50' : 'opacity-0 group-hover:opacity-50'}`}>
                    <div className="w-full h-full bg-gradient-to-t from-blue-200/40 via-blue-100/20 to-transparent"></div>
                  </div>
                  
                  <div className="relative z-10 flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full transition-colors ${isMenuOpen ? 'bg-gray-200' : 'bg-white/60'} ${!isMenuOpen && 'group-hover:bg-gray-200'}`} />
                    <div className="text-xs text-left">
                      <p className={`font-medium transition-colors ${isMenuOpen ? 'text-gray-900' : 'text-white group-hover:text-gray-900'} ${isMenuOpen ? '' : 'drop-shadow group-hover:drop-shadow-none'}`}>{c.name}</p>
                      <p className={`text-[10px] transition-colors ${isMenuOpen ? 'text-gray-600' : 'text-white/80 group-hover:text-gray-600'} ${isMenuOpen ? '' : 'drop-shadow group-hover:drop-shadow-none'}`}>ID: {c.id}</p>
                    </div>
                  </div>
                  <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold transition-colors ${isMenuOpen ? 'bg-gray-300 text-gray-900' : 'bg-white/40 text-white group-hover:bg-gray-300 group-hover:text-gray-900'}`}>
                    {c.id === "1342" ? "45" : c.id === "8765" ? "55" : c.id === "5732" ? "32" : c.id === "9864" ? "64" : c.id === "9632" ? "32" : c.id === "2451" ? "28" : c.id === "3892" ? "41" : c.id === "4567" ? "19" : c.id === "5123" ? "37" : "15"}
                  </div>
                </button>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}


