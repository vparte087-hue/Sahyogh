"use client";

import React, { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store/use-app-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, MapPin, Calendar, ShieldAlert, ArrowRight, CheckCircle2, Circle } from "lucide-react";

export default function AdminRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { requests } = useAppStore();

  const reqId = resolvedParams.id;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div>
        <Link
          href="/admin/requests"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-primary transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Service Requests
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Request Card */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 sm:p-8 space-y-6">
            {/* Header badges */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                ● PLUMBING
              </span>
              <span className="text-xs font-mono font-bold text-gray-400">
                REQUEST #{reqId}
              </span>
            </div>

            <h1 className="text-2xl font-extrabold text-text-primary">Pipe leakage</h1>

            {/* 4 Metadata Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                <span className="text-[10px] font-mono text-gray-500 uppercase block font-bold">
                  CUSTOMER
                </span>
                <span className="font-bold text-text-primary text-sm flex items-center gap-1.5">
                  <User className="w-4 h-4 text-gray-400" /> Rahul Sharma
                </span>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                <span className="text-[10px] font-mono text-gray-500 uppercase block font-bold">
                  LOCATION
                </span>
                <span className="font-bold text-text-primary text-sm flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-400" /> Thane, Maharashtra
                </span>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                <span className="text-[10px] font-mono text-gray-500 uppercase block font-bold">
                  DATE & TIME
                </span>
                <span className="font-bold text-text-primary text-sm flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" /> 27 Aug · 10:00 AM
                </span>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                <span className="text-[10px] font-mono text-gray-500 uppercase block font-bold">
                  URGENCY
                </span>
                <span className="font-bold text-text-primary text-sm flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-gray-400" /> Normal
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-gray-500 uppercase block">
                DESCRIPTION
              </span>
              <p className="p-4 bg-amber-50/50 border border-amber-200/60 rounded-xl text-sm text-text-primary leading-relaxed">
                "Bathroom pipe is leaking near the sink. Water is pooling on the floor — would like it looked at today if possible."
              </p>
            </div>

            {/* Attachment */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-gray-500 uppercase block">
                ATTACHMENT
              </span>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 w-max">
                <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center font-bold text-xs text-gray-500">
                  IMG
                </div>
                <span className="text-xs font-semibold text-text-primary font-mono">
                  photo_sink_leak.jpg
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Next Step & Timeline */}
        <div className="space-y-6">
          {/* Next Step CTA Card */}
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-text-primary text-sm">Next step</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Run the matching model to find workers who are skilled, available and nearby.
            </p>

            <Button
              variant="accent"
              size="lg"
              fullWidth
              onClick={() => router.push(`/admin/requests/${reqId}/allocate`)}
              className="shadow-md"
            >
              Find Suitable Workers <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>

          {/* Request Timeline Card */}
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-text-primary text-sm border-b border-border pb-2">
              Request timeline
            </h3>

            <div className="space-y-4 relative pl-5 border-l-2 border-border">
              {/* Step 1 */}
              <div className="relative">
                <CheckCircle2 className="w-4 h-4 text-success absolute -left-[25px] top-0 bg-white" />
                <span className="font-bold text-xs text-text-primary block">Request received</span>
                <span className="text-[11px] font-mono text-gray-400 block">27 Aug, 9:41 AM</span>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <CheckCircle2 className="w-4 h-4 text-success absolute -left-[25px] top-0 bg-white" />
                <span className="font-bold text-xs text-text-primary block">Auto-triaged as Plumbing</span>
                <span className="text-[11px] font-mono text-gray-400 block">27 Aug, 9:41 AM</span>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <Circle className="w-4 h-4 text-accent absolute -left-[25px] top-0 bg-white fill-amber-100" />
                <span className="font-bold text-xs text-amber-800 block">Awaiting worker assignment</span>
                <span className="text-[11px] font-mono text-amber-700 block">In progress</span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <Button variant="outline" size="sm" fullWidth>
                Reassign category
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
