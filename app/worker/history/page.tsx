"use client";

import React from "react";
import { useAppStore } from "@/lib/store/use-app-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export default function WorkerHistoryPage() {
  const { requests, workers } = useAppStore();
  const worker = workers[0];

  const completedJobs = requests.filter(
    (r) => r.assignedWorkerId === worker.id || r.status === "PAID" || r.status === "COMPLETED"
  );

  const totalEarnings = completedJobs.reduce((acc, curr) => acc + (curr.amount?.base || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold text-text-secondary uppercase tracking-widest block">
          WORKER RECORD
        </span>
        <h1 className="text-2xl font-bold text-text-primary mt-1">Job History & Earnings</h1>
      </div>

      {/* Total Earnings Summary Card */}
      <Card className="bg-primary text-white p-6 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-300 font-semibold uppercase tracking-wider block">
            TOTAL EARNINGS (PROTOTYPE PERIOD)
          </span>
          <span className="text-3xl font-black text-accent mt-1 block">₹ {totalEarnings + 1050}</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-300 block">{completedJobs.length + 2} Jobs Settled</span>
          <span className="text-xs font-bold text-success-light block mt-1">✓ Verified Cooperative Account</span>
        </div>
      </Card>

      {/* History List */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold tracking-widest text-text-secondary uppercase">
          PAST COMPLETED JOBS
        </h3>

        {completedJobs.map((job) => (
          <Card key={job.id} className="hover:border-primary transition-all flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-gray-500">{job.id}</span>
                <Badge variant="custom" className="bg-emerald-100 text-emerald-800 border-emerald-200">
                  PAID
                </Badge>
              </div>

              <h4 className="font-bold text-text-primary text-base">{job.title}</h4>

              <p className="text-xs text-text-secondary">
                👤 {job.consumerName} · 📅 {job.preferredDate}
              </p>
            </div>

            <div className="text-right">
              <span className="font-extrabold text-primary text-lg block">₹{job.amount?.base || 500}</span>
              {job.rating?.stars && (
                <div className="flex items-center gap-1 font-bold text-accent text-xs mt-1 justify-end">
                  <Star className="w-4 h-4 fill-accent" /> {job.rating.stars} ★
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
