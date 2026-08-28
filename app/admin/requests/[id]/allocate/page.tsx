"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store/use-app-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { CheckCircle2, Star, Sparkles, ArrowLeft } from "lucide-react";

export default function AdminSmartWorkerAllocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { assignWorker } = useAppStore();

  const reqId = resolvedParams.id;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApprove = (workerId: string) => {
    assignWorker(reqId, workerId);
    router.push(`/admin/assign/${reqId}/success`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <Link
          href={`/admin/requests/${reqId}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-primary transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Request Details
        </Link>
        <span className="text-xs font-mono text-text-secondary uppercase tracking-widest block">
          REQUESTS / #{reqId} / ALLOCATE
        </span>
        <h1 className="text-2xl font-extrabold text-text-primary mt-1">
          Smart Worker Allocation
        </h1>
      </div>

      {/* Top Banner Bar */}
      <div className="bg-primary text-white p-3.5 rounded-xl font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow">
        <span className="font-bold">
          #{reqId} · Plumbing · Thane · Today, 10:00 AM · Normal urgency
        </span>
        <span className="text-accent font-bold uppercase tracking-wider">
          MATCHING ENGINE V2
        </span>
      </div>

      {/* System Recommendation Card (Screen 05) */}
      <Card className="p-6 sm:p-8 border-2 border-accent/60 bg-amber-50/20 space-y-6 shadow-md">
        <div className="flex items-center gap-1 text-xs font-bold text-accent uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-accent" /> SYSTEM RECOMMENDATION
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary text-white font-black text-xl flex items-center justify-center shadow">
                SK
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-extrabold text-text-primary">Suresh Kumar</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-success border border-emerald-200">
                    ● Available now
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-0.5">
                  Plumbing Specialist · 6 yrs experience
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-semibold text-text-primary pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                <span>Required skill: Plumbing</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                <span>Available at 10:00 AM</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                <span>Service area covers Thane</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                <span>6 years of experience</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                <span>Low recent workload</span>
              </div>
            </div>
          </div>

          {/* Circular Match Score Gauge */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-accent/40 shadow-sm cursor-pointer hover:scale-105 transition-transform shrink-0"
          >
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#F6A623"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="251"
                  strokeDashoffset="22"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-black text-text-primary block leading-none">
                  91%
                </span>
                <span className="text-[9px] font-mono font-bold text-gray-500 uppercase">
                  MATCH SCORE
                </span>
              </div>
            </div>

            <span className="text-xs font-bold text-secondary mt-2 underline">
              Tap score for breakdown →
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="accent"
            size="lg"
            onClick={() => handleApprove("worker-1")}
            className="shadow-md"
          >
            ✓ Approve Assignment
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/admin/workers/worker-1")}
          >
            View profile
          </Button>
        </div>
      </Card>

      {/* Other Eligible Workers Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold tracking-widest text-text-secondary uppercase">
            OTHER ELIGIBLE WORKERS
          </h3>
          <span className="text-[11px] font-mono text-gray-400 uppercase">
            RANKED BY MATCH SCORE
          </span>
        </div>

        {/* Candidate 1 */}
        <Card className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 text-text-primary font-bold flex items-center justify-center text-sm">
              AS
            </div>

            <div>
              <h4 className="font-bold text-text-primary text-base">Amit Sharma</h4>
              <p className="text-xs text-text-secondary font-mono">
                2.1 km away · 18 jobs completed
              </p>
              <div className="flex items-center gap-1 font-bold text-accent text-xs mt-0.5">
                <Star className="w-3.5 h-3.5 fill-accent" /> 4.8
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-between sm:justify-end">
            <div className="w-12 h-12 rounded-full border-4 border-secondary/30 flex items-center justify-center font-black text-xs text-secondary font-mono">
              87%
            </div>

            <Button variant="outline" size="sm" onClick={() => handleApprove("worker-2")}>
              Select Worker
            </Button>
          </div>
        </Card>

        {/* Candidate 2 */}
        <Card className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 text-text-primary font-bold flex items-center justify-center text-sm">
              RP
            </div>

            <div>
              <h4 className="font-bold text-text-primary text-base">Ramesh Patil</h4>
              <p className="text-xs text-text-secondary font-mono">
                3.4 km away · 12 jobs completed
              </p>
              <div className="flex items-center gap-1 font-bold text-accent text-xs mt-0.5">
                <Star className="w-3.5 h-3.5 fill-accent" /> 4.7
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-between sm:justify-end">
            <div className="w-12 h-12 rounded-full border-4 border-secondary/30 flex items-center justify-center font-black text-xs text-secondary font-mono">
              84%
            </div>

            <Button variant="outline" size="sm" onClick={() => handleApprove("worker-3")}>
              Select Worker
            </Button>
          </div>
        </Card>

        {/* Candidate 3 */}
        <Card className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 text-text-primary font-bold flex items-center justify-center text-sm">
              VK
            </div>

            <div>
              <h4 className="font-bold text-text-primary text-base">Vijay Kumar</h4>
              <p className="text-xs text-text-secondary font-mono">
                4.2 km away · 8 jobs completed
              </p>
              <div className="flex items-center gap-1 font-bold text-accent text-xs mt-0.5">
                <Star className="w-3.5 h-3.5 fill-accent" /> 4.6
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-between sm:justify-end">
            <div className="w-12 h-12 rounded-full border-4 border-gray-300 flex items-center justify-center font-black text-xs text-gray-600 font-mono">
              79%
            </div>

            <Button variant="outline" size="sm" onClick={() => handleApprove("worker-4")}>
              Select Worker
            </Button>
          </div>
        </Card>
      </div>

      {/* Screen 06: Match Explanation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Why is Suresh recommended?"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-4 border-accent flex items-center justify-center text-xl font-black text-text-primary font-mono shrink-0">
              91%
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Suresh scores highest of 4 eligible workers for request #{reqId} — driven mainly by an exact skill match and same-slot availability.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {/* Skill compatibility */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-text-primary">Skill compatibility</span>
                <span className="font-mono text-success">35 / 35</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-success h-2 rounded-full" style={{ width: "100%" }}></div>
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-text-primary">Availability</span>
                <span className="font-mono text-success">20 / 20</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-success h-2 rounded-full" style={{ width: "100%" }}></div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-text-primary">Location</span>
                <span className="font-mono text-secondary">13 / 15</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-2 rounded-full" style={{ width: "86%" }}></div>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-text-primary">Experience</span>
                <span className="font-mono text-secondary">9 / 10</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-2 rounded-full" style={{ width: "90%" }}></div>
              </div>
            </div>

            {/* Workload / fairness */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-text-primary">Workload / fairness</span>
                <span className="font-mono text-amber-700">14 / 20</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-accent h-2 rounded-full" style={{ width: "70%" }}></div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-200 text-sm font-extrabold">
              <span>Total</span>
              <span className="text-accent text-base font-mono">91 / 100</span>
            </div>
          </div>

          <Button
            variant="accent"
            size="lg"
            fullWidth
            onClick={() => {
              setIsModalOpen(false);
              handleApprove("worker-1");
            }}
          >
            ✓ Approve Suresh for this job
          </Button>
        </div>
      </Modal>
    </div>
  );
}
