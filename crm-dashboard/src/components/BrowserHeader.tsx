import React from "react";
import { Globe, Smile, Plus, Upload } from "lucide-react";

export default function BrowserHeader() {
  return (
    <div className="w-full flex items-center justify-between px-6 pt-3">
      {/* left window dots */}
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-400 shadow-sm" />
        <span className="w-3 h-3 rounded-full bg-yellow-300 shadow-sm" />
        <span className="w-3 h-3 rounded-full bg-green-400 shadow-sm" />
      </div>

      {/* centered address pill */}
      <div className="hidden md:flex items-center gap-2 bg-white/35 backdrop-blur rounded-full px-4 py-2 text-xs text-gray-700 shadow-sm border border-white/50">
        <Globe size={14} className="text-gray-600" />
        <span>clerio.com</span>
      </div>

      {/* right quick actions */}
      <div className="flex items-center gap-3">
        <Smile size={16} className="text-gray-700" />
        <Upload size={16} className="text-gray-700" />
        <Plus size={16} className="text-gray-700" />
        <div className="hidden md:flex items-center gap-2 bg-white/70 rounded-full px-3 py-1 text-xs text-gray-700">
          <span className="inline-block w-2 h-2 rounded-full bg-red-400" />
          <span>New message</span>
        </div>
        <div className="w-7 h-7 rounded-full overflow-hidden">
          <img src="https://i.pravatar.cc/100" alt="user" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}


