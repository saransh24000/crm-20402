import React from "react";

type Client = { name: string; id: string };

const clients: Client[] = [
  { name: "leads", id: "1342" },
  { name: "tasks", id: "8985" },
  { name: "pipelines", id: "5732" },
  { name: "clients", id: "9864" },
  { name: "onboarding", id: "9042" },
];

export default function TopClientSlider() {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
      {clients.map((c) => (
        <div
          key={c.id}
          className="shrink-0 rounded-xl bg-white/70 backdrop-blur-sm px-4 py-3 shadow-sm border border-white/60"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-200" />
            <div>
              <p className="text-sm font-medium text-gray-700">{c.name}</p>
              <p className="text-[10px] text-gray-400">ID: {c.id}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

