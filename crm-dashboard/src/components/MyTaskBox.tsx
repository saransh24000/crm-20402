import React from "react";
import { User, Search, Filter, Download, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function MyTaskBox() {
  // Sample my tasks data
  const myTasks = [
    { id: "T001", title: "Follow up with Client", dueDate: "2024-01-15", status: "In Progress", priority: "High" },
    { id: "T002", title: "Update Project Status", dueDate: "2024-01-16", status: "Pending", priority: "Medium" },
    { id: "T003", title: "Review Documents", dueDate: "2024-01-14", status: "Completed", priority: "Low" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-orange-600";
      case "Low":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-2xl p-5 w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-700">My Task</h2>
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
            placeholder="Search my tasks..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 flex items-center gap-2">
          <Filter size={14} className="text-gray-600" />
          <span className="text-sm text-gray-700">Filter</span>
        </button>
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {myTasks.map((task) => (
          <div
            key={task.id}
            className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-900 text-sm">{task.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={12} />
                    {task.dueDate}
                  </p>
                  <p className={`text-xs font-medium flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                    <AlertCircle size={12} />
                    {task.priority}
                  </p>
                </div>
              </div>
              {task.status === "Completed" && (
                <CheckCircle2 size={18} className="text-green-600" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">My Total Tasks</span>
          <span className="font-semibold text-gray-900">{myTasks.length}</span>
        </div>
      </div>
    </div>
  );
}

