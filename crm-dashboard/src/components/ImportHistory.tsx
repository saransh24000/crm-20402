import React from "react";
import { FileText, CheckCircle, XCircle, Clock } from "lucide-react";

interface ImportRecord {
  id: string;
  fileName: string;
  templateType: string;
  status: "success" | "failed" | "processing";
  date: string;
  recordsImported?: number;
  error?: string;
}

export default function ImportHistory() {
  // Sample import history data
  const importHistory: ImportRecord[] = [
    {
      id: "1",
      fileName: "customer_leads_2024.csv",
      templateType: "Customer Leads",
      status: "success",
      date: "2024-04-08 10:30 AM",
      recordsImported: 1250
    },
    {
      id: "2",
      fileName: "sales_data.xlsx",
      templateType: "Sales Leads",
      status: "success",
      date: "2024-04-07 2:15 PM",
      recordsImported: 890
    },
    {
      id: "3",
      fileName: "marketing_leads.csv",
      templateType: "Marketing Leads",
      status: "processing",
      date: "2024-04-08 11:45 AM"
    },
    {
      id: "4",
      fileName: "invalid_data.csv",
      templateType: "Partner Leads",
      status: "failed",
      date: "2024-04-06 9:20 AM",
      error: "Invalid file format"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-50";
      case "failed":
        return "text-red-600 bg-red-50";
      case "processing":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-2xl p-5 w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-700">Import History</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {importHistory.map((record) => (
          <div
            key={record.id}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3 flex-1">
                <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{record.fileName}</p>
                  <p className="text-xs text-gray-500 mt-1">{record.templateType}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(record.status)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
              <span>{record.date}</span>
              {record.status === "success" && record.recordsImported && (
                <span className="text-green-600 font-medium">{record.recordsImported} records imported</span>
              )}
              {record.status === "failed" && record.error && (
                <span className="text-red-600">{record.error}</span>
              )}
              {record.status === "processing" && (
                <span className="text-yellow-600">Processing...</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

