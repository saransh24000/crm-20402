import React from "react";
import { Globe, Smile, Plus, Upload, Power } from "lucide-react";

interface BrowserHeaderProps {
  onLogout?: () => void;
}

export default function BrowserHeader({ onLogout }: BrowserHeaderProps = {} as BrowserHeaderProps) {
  const [isSearchExpanded, setIsSearchExpanded] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [showLogoutDropdown, setShowLogoutDropdown] = React.useState(false);
  const logoutDropdownRef = React.useRef<HTMLDivElement>(null);

  const handleEmojiClick = () => {
    console.log("Emoji picker clicked");
    // Add emoji picker functionality here
  };

  const handleUploadClick = () => {
    console.log("Upload clicked");
    // Add file upload functionality here
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log("File selected:", file.name);
      }
    };
    input.click();
  };

  const handlePlusClick = () => {
    console.log("Plus button clicked");
    // Add new item/feature functionality here
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
    // Add profile menu functionality here
  };

  const handlePowerButtonClick = () => {
    setShowLogoutDropdown(!showLogoutDropdown);
  };

  const handleLogout = () => {
    // Close dropdown
    setShowLogoutDropdown(false);
    // Call the onLogout prop from Dashboard/App
    if (onLogout) {
      onLogout();
    } else {
      // Fallback: clear localStorage and reload
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleSearchClick = () => {
    if (!isSearchExpanded) {
      setIsSearchExpanded(true);
      // Focus the input after expansion
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  const handleSearchBlur = () => {
    // Only collapse if input is empty
    if (searchInputRef.current?.value === "" || searchInputRef.current?.value === "clario.com") {
      setIsSearchExpanded(false);
    }
  };

  // Close on outside click for search bar
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSearchExpanded && searchInputRef.current) {
        const searchBar = (event.target as HTMLElement).closest('.search-bar-container');
        if (!searchBar && searchInputRef.current) {
          // Only collapse if input is empty or has default value
          if (searchInputRef.current.value === "" || searchInputRef.current.value === "clario.com") {
            setIsSearchExpanded(false);
          }
        }
      }
    };

    if (isSearchExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchExpanded]);

  // Close logout dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showLogoutDropdown && logoutDropdownRef.current) {
        if (!logoutDropdownRef.current.contains(event.target as Node)) {
          setShowLogoutDropdown(false);
        }
      }
    };

    if (showLogoutDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLogoutDropdown]);

  return (
    <div className="w-full flex items-center justify-between px-6 pt-4 pb-4">
      {/* left window dots */}
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-400 shadow-sm" />
        <span className="w-3 h-3 rounded-full bg-yellow-300 shadow-sm" />
        <span className="w-3 h-3 rounded-full bg-green-400 shadow-sm" />
      </div>

      {/* centered search bar - expandable */}
      <div className={`flex-1 mx-8 transition-all duration-300 ease-in-out ${isSearchExpanded ? 'max-w-2xl' : 'max-w-[200px]'}`}>
        <div 
          className="search-bar-container flex items-center gap-2 bg-white/90 backdrop-blur rounded-xl px-3 py-1.5 text-sm text-gray-700 shadow-md border border-gray-200/50 hover:shadow-lg transition-all duration-300 ease-in-out cursor-text"
          onClick={handleSearchClick}
        >
          <Globe size={14} className={`text-gray-600 flex-shrink-0 transition-all duration-300 ${isSearchExpanded ? 'w-4 h-4' : 'w-4 h-4'}`} />
          <input
            ref={searchInputRef}
            type="text"
            defaultValue="clario.com"
            onBlur={handleSearchBlur}
            className={`bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 transition-all duration-300 ease-in-out ${
              isSearchExpanded 
                ? 'w-full text-sm' 
                : 'w-[120px] text-sm truncate'
            }`}
            placeholder={isSearchExpanded ? "Search or enter website name" : ""}
            onClick={(e) => {
              e.stopPropagation();
              if (!isSearchExpanded) {
                setIsSearchExpanded(true);
              }
            }}
            onFocus={() => {
              if (!isSearchExpanded) {
                setIsSearchExpanded(true);
              }
            }}
          />
        </div>
      </div>

      {/* right quick actions */}
      <div className="flex items-center gap-3">
        {/* Power Button with Logout Dropdown */}
        <div className="relative" ref={logoutDropdownRef}>
          <button
            onClick={handlePowerButtonClick}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Power options"
          >
            <Power size={18} className="text-gray-700" />
          </button>
          {/* Logout Dropdown */}
          {showLogoutDropdown && (
            <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Power size={14} className="text-gray-600" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
        <button
          onClick={handleEmojiClick}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Emoji picker"
        >
          <Smile size={18} className="text-gray-700" />
        </button>
        <button
          onClick={handleUploadClick}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Upload file"
        >
          <Upload size={18} className="text-gray-700" />
        </button>
        <button
          onClick={handlePlusClick}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Add new"
        >
          <Plus size={18} className="text-gray-700" />
        </button>
        <button
          onClick={handleProfileClick}
          className="w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="User profile"
        >
          <img src="https://i.pravatar.cc/100" alt="user" className="w-full h-full object-cover" />
        </button>
      </div>
    </div>
  );
}


