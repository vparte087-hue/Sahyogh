"use client";

import React, { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store/use-app-store";
import { Timeline } from "@/components/timeline";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Star,
  UserCheck,
  Building,
  CreditCard,
} from "lucide-react";

export default function TrackRequestPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { requests, workers } = useAppStore();

  const request = requests.find((r) => r.id === resolvedParams.id) || requests[0];
  const assignedWorker = workers.find((w) => w.id === request.assignedWorkerId);

  const isPayable =
    request.status === "COMPLETION_PENDING" ||
    request.status === "COMPLETED" ||
    request.status === "PAYMENT_PENDING";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <Link
            href="/consumer/dashboard"
            className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 font-mono">{request.id}</span>
            <Badge status={request.status} />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mt-1">
            {request.categoryName} — {request.title}
          </h1>
        </div>

        {isPayable && (
          <Button
            variant="accent"
            size="lg"
            onClick={() => router.push(`/consumer/pay/${request.id}`)}
            className="shadow-md"
          >
            <CreditCard className="w-5 h-5 ml-2" /> Confirm & Pay ₹{request.amount?.total}
          </Button>
        )}
      </div>

      {/* Main Grid: Left Timeline, Right Worker & Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Timeline & Requirement */}
        <div className="md:col-span-2 space-y-6">
          <Card className="space-y-4">
            <h3 className="text-xs font-bold tracking-widest text-text-secondary uppercase">
              REQUEST TIMELINE
            </h3>
            <Timeline currentStatus={request.status} timeline={request.timeline} />
          </Card>

          <Card className="space-y-3">
            <h3 className="text-xs font-bold tracking-widest text-text-secondary uppercase">
              REQUIREMENT DETAILS
            </h3>
            <p className="text-sm text-text-primary leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
              "{request.problemDescription}"
            </p>
          </Card>
        </div>

        {/* Right 1 Col: Worker Card & Service Info */}
        <div className="space-y-6">
          {/* Assigned Worker Card */}
          {request.assignedWorkerName ? (
            <Card className="space-y-4 border-secondary/30 bg-blue-50/20">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-xs font-bold tracking-widest text-text-secondary uppercase">
                  ASSIGNED WORKER
                </h3>
                <Badge variant="verified" />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary text-white font-bold flex items-center justify-center text-base shadow">
                  {request.assignedWorkerName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-base">
                    {request.assignedWorkerName}
                  </h4>
                  <p className="text-xs text-text-secondary">Verified Member</p>
                </div>
              </div>

              {assignedWorker && (
                <div className="space-y-2 text-xs text-text-secondary pt-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-gray-400" /> Society:
                    </span>
                    <span className="font-semibold text-text-primary truncate max-w-[140px]">
                      {assignedWorker.societyName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-gray-400" /> Jobs Done:
                    </span>
                    <span className="font-semibold text-text-primary">
                      {assignedWorker.jobsCompleted}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-accent fill-accent" /> Rating:
                    </span>
                    <span className="font-bold text-accent">{assignedWorker.rating} ★</span>
                  </div>
                </div>
              )}
            </Card>
          ) : (
            <Card className="bg-amber-50/50 border-amber-200 space-y-2">
              <h3 className="text-xs font-bold tracking-widest text-amber-800 uppercase">
                AWAITING ASSIGNMENT
              </h3>
              <p className="text-xs text-amber-900 leading-relaxed">
                Cooperative admin is reviewing available verified workers in your locality.
              </p>
            </Card>
          )}

          {/* Service Details Card */}
          <Card className="space-y-3">
            <h3 className="text-xs font-bold tracking-widest text-text-secondary uppercase">
              SERVICE DETAILS
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-text-primary block">Scheduled Date</span>
                  <span className="text-text-secondary">{request.preferredDate}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-text-primary block">Time Slot</span>
                  <span className="text-text-secondary">{request.preferredTimeSlot}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
