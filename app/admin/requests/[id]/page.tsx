"use client";

import React, { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store/use-app-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, MapPin, Calendar, ShieldAlert, ArrowRight, CheckCircle2, Circle, Phone } from "lucide-react";

export default function AdminRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { requests } = useAppStore();

  const reqId = resolvedParams.id;
  const req = requests.find((r) => r.id === reqId) || requests[0];

  if (!req) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-text-primary">Request Not Found</h2>
        <p className="text-xs text-text-secondary">Request ID #{reqId} does not exist.</p>
        <Link href="/admin/requests" className="text-xs font-bold text-primary hover:underline">
          ← Back to Requests
        </Link>
      </div>
    );
  }

  const isAssigned = req.status === "WORKER_ASSIGNED" || req.status === "WORKER_ACCEPTED" || req.status === "IN_PROGRESS" || req.status === "COMPLETED";

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
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 uppercase">
                ● {req.categoryName}
              </span>
              <span className="text-xs font-mono font-bold text-gray-400">
                REQUEST #{req.id}
              </span>
            </div>

            <h1 className="text-2xl font-extrabold text-text-primary">{req.title}</h1>

            {/* 4 Metadata Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                <span className="text-[10px] font-mono text-gray-500 uppercase block font-bold">
                  CUSTOMER
                </span>
                <span className="font-bold text-text-primary text-sm flex items-center gap-1.5">
                  <User className="w-4 h-4 text-gray-400" /> {req.consumerName || "Customer"}
                </span>
                {req.consumerPhone && (
                  <span className="text-[11px] text-gray-400 font-mono flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {req.consumerPhone}
                  </span>
                )}
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                <span className="text-[10px] font-mono text-gray-500 uppercase block font-bold">
                  LOCATION
                </span>
                <span className="font-bold text-text-primary text-sm flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-400" /> {req.address?.locality || req.address?.city || "Thane"}, Maharashtra
                </span>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                <span className="text-[10px] font-mono text-gray-500 uppercase block font-bold">
                  DATE & TIME
                </span>
                <span className="font-bold text-text-primary text-sm flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" /> {req.preferredDate || "Today"} · {req.preferredTimeSlot || "10:00 AM"}
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
              <p className="p-4 bg-amber-50/50 border border-amber-200/60 rounded-xl text-sm text-text-primary leading-relaxed font-medium">
                "{req.problemDescription || req.title}"
              </p>
            </div>

            {/* Price Breakdown */}
            {req.amount && (
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between text-xs">
                <span className="font-bold text-gray-600">Estimated Total Fee</span>
                <span className="font-extrabold text-base text-primary">₹{req.amount.total}</span>
              </div>
            )}
          </Card>
        </div>

        {/* Right 1 Col: Next Step & Timeline */}
        <div className="space-y-6">
          {/* Next Step CTA Card */}
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-text-primary text-sm">Next step</h3>
            {isAssigned ? (
              <div className="space-y-2">
                <p className="text-xs text-text-secondary leading-relaxed">
                  Worker <strong className="text-primary">{req.assignedWorkerName || "Assigned Worker"}</strong> has been allocated to this request.
                </p>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Status: {req.status}
                </div>
              </div>
            ) : (
              <>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Run the matching model to find workers who are skilled, available and nearby.
                </p>
                <Button
                  variant="accent"
                  size="lg"
                  fullWidth
                  onClick={() => router.push(`/admin/requests/${req.id}/allocate`)}
                  className="shadow-md"
                >
                  Find Suitable Workers <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            )}
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
                <span className="text-[11px] font-mono text-gray-400 block">{req.createdAt?.slice(0, 10) || "Today"}</span>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <CheckCircle2 className="w-4 h-4 text-success absolute -left-[25px] top-0 bg-white" />
                <span className="font-bold text-xs text-text-primary block">Categorized as {req.categoryName}</span>
                <span className="text-[11px] font-mono text-gray-400 block">{req.createdAt?.slice(0, 10) || "Today"}</span>
              </div>

              {/* Step 3 */}
              <div className="relative">
                {isAssigned ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-success absolute -left-[25px] top-0 bg-white" />
                    <span className="font-bold text-xs text-emerald-800 block">Worker Assigned</span>
                    <span className="text-[11px] font-mono text-emerald-700 block">{req.assignedWorkerName}</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-accent absolute -left-[25px] top-0 bg-white fill-amber-100" />
                    <span className="font-bold text-xs text-amber-800 block">Awaiting worker assignment</span>
                    <span className="text-[11px] font-mono text-amber-700 block">In progress</span>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
