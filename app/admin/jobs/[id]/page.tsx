"use client";

import React, { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, CheckCircle2, Circle } from "lucide-react";

export default function AdminJobTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();

  const jobId = resolvedParams.id;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div>
        <Link
          href="/admin/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-primary transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Jobs
        </Link>
        <span className="text-xs font-mono text-text-secondary uppercase tracking-widest block">
          JOBS / #{jobId}
        </span>
        <h1 className="text-2xl font-extrabold text-text-primary mt-1">Job Tracking</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Job Details Card */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                ● PLUMBING
              </span>
              <span className="text-xs font-mono font-bold text-gray-400">
                #{jobId}
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-text-primary">
              Pipe leakage repair
            </h2>

            <div className="space-y-3 text-xs border-t border-b border-gray-100 py-4 font-semibold">
              <div className="grid grid-cols-3 py-1">
                <span className="font-mono text-gray-400 uppercase text-[10px]">
                  CUSTOMER
                </span>
                <span className="col-span-2 font-bold text-text-primary">
                  Rahul Sharma
                </span>
              </div>

              <div className="grid grid-cols-3 py-1">
                <span className="font-mono text-gray-400 uppercase text-[10px]">
                  SERVICE
                </span>
                <span className="col-span-2 font-bold text-text-primary">
                  Plumbing
                </span>
              </div>

              <div className="grid grid-cols-3 py-1">
                <span className="font-mono text-gray-400 uppercase text-[10px]">
                  WORKER
                </span>
                <span className="col-span-2 font-bold text-text-primary">
                  Suresh Kumar
                </span>
              </div>

              <div className="grid grid-cols-3 py-1">
                <span className="font-mono text-gray-400 uppercase text-[10px]">
                  LOCATION
                </span>
                <span className="col-span-2 font-bold text-text-primary">
                  Thane, Maharashtra
                </span>
              </div>
            </div>

            {/* WORKER NOTES */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-gray-500 uppercase block">
                WORKER NOTES
              </span>
              <p className="p-4 bg-amber-50/50 border border-amber-200/60 rounded-xl text-sm text-text-primary leading-relaxed">
                "Pipe joint replacement required. Picking up the part now, back within 20 minutes."
              </p>
            </div>

            <Button variant="accent" size="lg" fullWidth className="shadow-md py-3.5">
              <Phone className="w-4 h-4 ml-2" /> Contact Worker
            </Button>
          </Card>
        </div>

        {/* Right 1 Col: Job Status Timeline */}
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-bold text-text-primary text-sm">Job status</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                ● In progress
              </span>
            </div>

            <div className="space-y-5 relative pl-5 border-l-2 border-border pt-1">
              {/* Step 1 */}
              <div className="relative">
                <CheckCircle2 className="w-4 h-4 text-success absolute -left-[25px] top-0 bg-white" />
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-text-primary">Request received</span>
                  <span className="font-mono text-gray-400 text-[11px]">9:41 AM</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <CheckCircle2 className="w-4 h-4 text-success absolute -left-[25px] top-0 bg-white" />
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-text-primary">Worker assigned</span>
                  <span className="font-mono text-gray-400 text-[11px]">9:52 AM</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <CheckCircle2 className="w-4 h-4 text-success absolute -left-[25px] top-0 bg-white" />
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-text-primary">Worker accepted</span>
                  <span className="font-mono text-gray-400 text-[11px]">9:55 AM</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <CheckCircle2 className="w-4 h-4 text-success absolute -left-[25px] top-0 bg-white" />
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-text-primary">Worker arrived</span>
                  <span className="font-mono text-gray-400 text-[11px]">10:02 AM</span>
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative">
                <Circle className="w-4 h-4 text-accent absolute -left-[25px] top-0 bg-white fill-amber-100" />
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-800">Work in progress</span>
                  <span className="font-mono text-amber-700 text-[11px]">Now</span>
                </div>
              </div>

              {/* Step 6 */}
              <div className="relative">
                <Circle className="w-4 h-4 text-gray-300 absolute -left-[25px] top-0 bg-white" />
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-400">Completed</span>
                  <span className="font-mono text-gray-400 text-[11px]">Pending</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
