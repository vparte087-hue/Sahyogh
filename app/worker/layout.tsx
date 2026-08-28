"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HardHat, PlayCircle, History, Star } from "lucide-react";
import { useAppStore } from "@/lib/store/use-app-store";
import { Badge } from "@/components/ui/badge";

export default function WorkerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { workers, requests } = useAppStore();

  const worker = workers[0]; // Ramesh Sharma

  const activeJob = requests.find(
    (r) =>
      r.assignedWorkerId === worker.id &&
      (r.status === "WORKER_ACCEPTED" || r.status === "IN_PROGRESS" || r.status === "SCHEDULED")
  ) || requests[1];

  const activeJobId = activeJob ? activeJob.id : "REQ-1002";

  const tabs = [
    { label: "Jobs", href: "/worker/jobs", icon: HardHat },
    { label: "Active", href: `/worker/active/${activeJobId}`, icon: PlayCircle },
    { label: "History", href: "/worker/history", icon: History },
  ];

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Worker Identity Header Card */}
      <div className="bg-primary text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-accent text-white font-bold text-2xl flex items-center justify-center shadow">
            {worker.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold">{worker.name}</h2>
              <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded text-gray-200">
                {worker.workerCode}
              </span>
              <Badge variant="verified" />
            </div>
            <p className="text-xs text-gray-300 mt-0.5">{worker.societyName}</p>
            <p className="text-xs text-gray-300">Areas: {worker.serviceAreas.join(", ")}</p>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
          <div className="flex items-center gap-1 font-bold text-accent text-lg">
            <Star className="w-5 h-5 fill-accent" /> {worker.rating} ★
          </div>
          <span className="text-xs text-gray-300">{worker.jobsCompleted} Jobs Completed</span>
        </div>
      </div>

      {/* Worker Horizontal Tab Bar */}
      <nav className="bg-white border border-border rounded-xl shadow-sm overflow-x-auto">
        <div className="flex items-center space-x-1 p-1.5 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {children}
    </div>
  );
}
