"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store/use-app-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { MapPin, Calendar, Star } from "lucide-react";

export default function WorkerJobsPage() {
  const router = useRouter();
  const { requests, acceptJob, rejectJob } = useAppStore();

  const assignedJobs = requests.filter(
    (r) => r.status === "WORKER_ASSIGNED" || r.status === "WORKER_ACCEPTED"
  );

  const completedJobs = requests.filter(
    (r) => r.status === "PAID" || r.status === "COMPLETED"
  );

  const [rejectingReqId, setRejectingReqId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const handleAccept = (reqId: string) => {
    acceptJob(reqId);
    router.push(`/worker/active/${reqId}`);
  };

  const handleConfirmReject = () => {
    if (!rejectingReqId || !rejectReason.trim()) return;
    rejectJob(rejectingReqId, rejectReason);
    setRejectingReqId(null);
    setRejectReason("");
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold text-text-secondary uppercase tracking-widest block">
          WORKER PORTAL
        </span>
        <h1 className="text-2xl font-bold text-text-primary mt-1">Assigned Jobs</h1>
      </div>

      {/* Incoming Job Cards */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold tracking-widest text-text-secondary uppercase">
          INCOMING ASSIGNMENTS ({assignedJobs.length})
        </h3>

        {assignedJobs.length === 0 ? (
          <Card className="text-center py-8 bg-gray-50 text-text-secondary text-sm">
            No pending job assignments at the moment.
          </Card>
        ) : (
          assignedJobs.map((job) => (
            <Card key={job.id} className="border-l-4 border-l-accent space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="new" />
                  <span className="text-xs font-mono font-bold text-gray-500">{job.id}</span>
                </div>
                <Badge status={job.status} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-text-primary">
                  {job.categoryName} — {job.title}
                </h3>
                <p className="text-xs text-text-secondary mt-1">"{job.problemDescription}"</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-text-secondary bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>📍 {job.address.locality}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary shrink-0" />
                  <span>📅 {job.preferredDate} ({job.preferredTimeSlot})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-text-primary">👤 Consumer: {job.consumerName}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {job.status === "WORKER_ACCEPTED" ? (
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => router.push(`/worker/active/${job.id}`)}
                  >
                    Go to Active Job Controls →
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      size="md"
                      className="sm:w-1/2"
                      onClick={() => handleAccept(job.id)}
                    >
                      Accept Job
                    </Button>
                    <Button
                      variant="danger"
                      size="md"
                      className="sm:w-1/2"
                      onClick={() => setRejectingReqId(job.id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Recent History Section */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="text-xs font-bold tracking-widest text-text-secondary uppercase">
          RECENT COMPLETED HISTORY
        </h3>

        {completedJobs.map((job) => (
          <Card key={job.id} className="bg-gray-50/50 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-gray-500">{job.id}</span>
                <Badge variant="custom" className="bg-emerald-100 text-emerald-800 border-emerald-200">
                  COMPLETED
                </Badge>
              </div>
              <h4 className="font-bold text-text-primary text-sm mt-1">{job.title}</h4>
              <p className="text-xs text-text-secondary">
                {job.consumerName} · {job.preferredDate}
              </p>
            </div>

            <div className="text-right">
              <span className="font-bold text-primary text-base">₹{job.amount?.total}</span>
              {job.rating?.stars && (
                <div className="flex items-center gap-1 font-bold text-accent text-xs mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-accent" /> {job.rating.stars} ★
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Rejection Reason Modal */}
      <Modal
        isOpen={!!rejectingReqId}
        onClose={() => setRejectingReqId(null)}
        title="Reject Job Assignment"
      >
        <div className="space-y-4">
          <p className="text-xs text-text-secondary">
            Please provide a valid reason for rejecting this assignment. The cooperative administrator will reassign the job to another worker.
          </p>

          <div>
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
              REJECTION REASON *
            </label>
            <textarea
              rows={3}
              required
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Prior scheduling conflict / Out of service area / Tool unavailable"
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setRejectingReqId(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={!rejectReason.trim()}
              onClick={handleConfirmReject}
            >
              Submit Rejection
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
