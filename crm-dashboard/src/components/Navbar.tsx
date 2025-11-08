// src/components/Navbar.tsx
import React from "react";
import { Bell, Search, MessageCircle } from "lucide-react";

export default function Navbar() {
  return (
    <div className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-100 to-blue-200/70 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-500" />
        <div className="text-lg font-semibold text-gray-800">Clerio</div>
      </div>
      <div className="flex items-center space-x-4">
        <Search className="text-gray-600" />
        <Bell className="text-gray-600" />
        <MessageCircle className="text-gray-600" />
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src="https://i.pravatar.cc/100"
            alt="user"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
