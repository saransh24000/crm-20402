// src/components/ChatAssistant.tsx
import React from "react";
import { Paperclip, Maximize2, Send, Mic } from "lucide-react";

const ChatAssistant = () => {
  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-2xl p-5 w-full h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-700">AI Assistant</h2>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center border border-gray-100"><Paperclip size={16} className="text-gray-600"/></button>
          <button className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center border border-gray-100"><Maximize2 size={16} className="text-gray-600"/></button>
        </div>
      </div>

      <div className="mt-4 flex-1 overflow-y-auto space-y-4 text-sm">
        <div className="text-gray-600">Please upload a PDF for data processing.</div>
        <div className="flex items-center space-x-2">
          <img src="https://i.pravatar.cc/40" className="w-6 h-6 rounded-full" />
          <p className="bg-blue-50 p-2 rounded-lg">
            Sure, I'm uploading the document now.
          </p>
        </div>
        <div className="text-gray-600">Thank you! Processing your file now.</div>
      </div>

      {/* quick chips */}
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">GPT-4o</span>
        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">Document AI</span>
        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">Financial AI</span>
        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">OpenCV</span>
      </div>

      <div className="flex items-center mt-4 bg-gray-50 border border-gray-200 rounded-full px-3 py-2">
        <input
          type="text"
          placeholder="Enter Task for AI Assistant"
          className="flex-1 bg-transparent outline-none text-sm px-2"
        />
        <button className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center border border-gray-100 mr-2"><Mic size={16} className="text-gray-600"/></button>
        <button className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"><Send size={16}/></button>
      </div>
    </div>
  );
};

export default ChatAssistant;
