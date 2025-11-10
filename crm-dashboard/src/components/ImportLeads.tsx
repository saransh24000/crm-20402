import React, { useState } from "react";
import { Upload, ChevronDown } from "lucide-react";

interface ImportLeadsProps {
  onImportComplete?: () => void;
}

export default function ImportLeads({ onImportComplete }: ImportLeadsProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const templateOptions = [
    "Customer Leads",
    "Sales Leads",
    "Marketing Leads",
    "Partner Leads"
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    console.log("File selected:", file.name);
    // Handle file upload logic here
    // Simulate import completion after a delay
    if (onImportComplete) {
      setTimeout(() => {
        onImportComplete();
      }, 1000);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full">
      {/* Upload File Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Upload className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Upload File</h2>
        </div>
        <p className="text-gray-600 text-sm">Upload your CSV or Excel file to import leads</p>
      </div>

      {/* Select Template Type */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Select Template Type</h3>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <span className={selectedTemplate ? "text-gray-900" : "text-gray-500"}>
              {selectedTemplate || "Choose the type of leads you're importing"}
            </span>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
              {templateOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSelectedTemplate(option);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* File Drop Area */}
      <div>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50 hover:border-gray-400"
          }`}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileInput}
          />
          
          <Upload className={`w-10 h-10 mx-auto mb-3 ${dragActive ? "text-blue-500" : "text-gray-400"}`} />
          <p className="text-base font-semibold text-gray-900 mb-1">Drop your file here</p>
          <label
            htmlFor="file-upload"
            className="text-blue-600 hover:text-blue-700 cursor-pointer underline text-sm"
          >
            or browse to upload
          </label>
          <p className="text-xs text-gray-500 mt-2">Supports CSV and Excel files up to 10MB</p>
        </div>
      </div>
    </div>
  );
}

