"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Zap, Sparkles, Paintbrush, Hammer } from "lucide-react";

export default function AdminJobsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("ALL");

  const filterTabs = [
    { label: "All", value: "ALL" },
    { label: "Assigned", value: "ASSIGNED" },
    { label: "Accepted", value: "ACCEPTED" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Completed", value: "COMPLETED" },
  ];

  const jobsList = [
    {
      id: "1042",
      service: "Plumbing",
      icon: Wrench,
      location: "Thane",
      time: "10:00 AM",
      workerName: "Suresh Kumar",
      workerInitials: "SK",
      status: "IN_PROGRESS",
      statusText: "● In Progress",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    },
    {
      id: "1043",
      service: "Electrical",
      icon: Zap,
      location: "Kalwa",
      time: "11:00 AM",
      workerName: "Ramesh Patil",
      workerInitials: "RP",
      status: "ASSIGNED",
      statusText: "● Assigned",
      badgeColor: "bg-blue-100 text-secondary border-blue-200",
    },
    {
      id: "1039",
      service: "Cleaning",
      icon: Sparkles,
      location: "Majiwada",
      time: "9:00 AM",
      workerName: "Karan Singh",
      workerInitials: "KS",
      status: "ACCEPTED",
      statusText: "● Accepted",
      badgeColor: "bg-blue-100 text-secondary border-blue-200",
    },
    {
      id: "1038",
      service: "Painting",
      icon: Paintbrush,
      location: "Thane",
      time: "8:00 AM",
      workerName: "Amit Sharma",
      workerInitials: "AS",
      status: "COMPLETED",
      statusText: "● Completed",
      badgeColor: "bg-emerald-100 text-success border-emerald-200",
    },
  ];

  const filteredJobs = jobsList.filter((j) => {
    if (activeTab === "ALL") return true;
    return j.status === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <span className="text-xs font-mono text-text-secondary uppercase tracking-widest block">
          JOBS
        </span>
        <h1 className="text-2xl font-extrabold text-text-primary mt-1">Jobs</h1>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {filterTabs.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-accent text-white shadow-md"
                  : "bg-white border border-border text-text-secondary hover:text-text-primary hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Jobs List Cards */}
      <div className="space-y-3">
        {filteredJobs.length === 0 ? (
          <Card className="p-8 text-center bg-gray-50 text-text-secondary text-sm">
            No jobs found for the selected status filter.
          </Card>
        ) : (
          filteredJobs.map((j) => {
            const Icon = j.icon;
            return (
              <Card
                key={j.id}
                className="p-5 hover:border-primary transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 text-text-primary flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gray-500">#{j.id}</span>
                      <h4 className="font-bold text-text-primary text-base">{j.service}</h4>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-text-secondary font-mono">
                      <span>📍 {j.location}</span>
                      <span>• {j.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-between md:justify-end">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">
                      {j.workerInitials}
                    </div>
                    <div>
                      <span className="font-bold text-text-primary text-xs block">
                        {j.workerName}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono uppercase block">
                        ASSIGNED WORKER
                      </span>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${j.badgeColor}`}>
                    {j.statusText}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/admin/jobs/${j.id}`)}
                  >
                    Track
                  </Button>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
