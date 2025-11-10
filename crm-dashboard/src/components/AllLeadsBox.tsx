import React from "react";
import { Users, Search, Filter, Download } from "lucide-react";

export default function AllLeadsBox() {
  // Sample leads data
  const leads = [
    { id: "L001", name: "John Smith", company: "Tech Corp", email: "john@techcorp.com", status: "Active", value: "$5,000" },
    { id: "L002", name: "Sarah Johnson", company: "Design Studio", email: "sarah@design.com", status: "Active", value: "$3,500" },
    { id: "L003", name: "Mike Davis", company: "Marketing Pro", email: "mike@marketing.com", status: "Qualified", value: "$8,200" },
    { id: "L004", name: "Emily Brown", company: "Sales Solutions", email: "emily@sales.com", status: "Active", value: "$4,100" },
    { id: "L005", name: "David Wilson", company: "Business Inc", email: "david@business.com", status: "Qualified", value: "$6,800" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Qualified":
        return "bg-blue-100 text-blue-700";
      case "New":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-2xl p-5 w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-700">All Leads</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center border border-gray-100 hover:bg-gray-50">
            <Download size={14} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-4 flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 flex items-center gap-2">
          <Filter size={14} className="text-gray-600" />
          <span className="text-sm text-gray-700">Filter</span>
        </button>
      </div>

      {/* Leads List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-900 text-sm">{lead.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{lead.company}</p>
                <p className="text-xs text-gray-500 mt-1">{lead.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{lead.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total Leads</span>
          <span className="font-semibold text-gray-900">{leads.length}</span>
        </div>
      </div>
    </div>
  );
}

