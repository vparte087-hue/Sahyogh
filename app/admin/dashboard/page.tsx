"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store/use-app-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Inbox,
  Briefcase,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Wrench,
  Zap,
  Sparkles,
} from "lucide-react";

export default function AdminOpsDashboard() {
  const router = useRouter();
  const { requests, initSupabaseData } = useAppStore();

  // Pull fresh data from Supabase every time coordinator opens the dashboard
  useEffect(() => {
    initSupabaseData();
  }, [initSupabaseData]);

  const newRequests = requests.filter(
    (r) => r.status === "REQUESTED" || r.status === "UNDER_REVIEW" || r.status === "ASSIGNMENT_PENDING"
  );

  return (
    <div className="space-y-6">
      {/* Greeting Banner */}
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary">Dashboard</h1>
        <p className="text-sm text-text-secondary mt-1">
          Good morning, <strong className="text-primary">Coordinator</strong> — here is how the cooperative looks right now.
        </p>
      </div>

      {/* 6 KPI Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: New Requests */}
        <Card className="flex flex-col justify-between p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-gray-500">up 3 since yesterday</span>
          </div>
          <div>
            <span className="text-3xl font-black text-text-primary block">12</span>
            <span className="text-xs font-semibold text-text-secondary">New requests</span>
          </div>
        </Card>

        {/* Card 2: Active Jobs */}
        <Card className="flex flex-col justify-between p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-secondary flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-gray-500">on schedule</span>
          </div>
          <div>
            <span className="text-3xl font-black text-text-primary block">8</span>
            <span className="text-xs font-semibold text-text-secondary">Active jobs</span>
          </div>
        </Card>

        {/* Card 3: Available Workers */}
        <Card className="flex flex-col justify-between p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-success flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-gray-500">across 6 skills</span>
          </div>
          <div>
            <span className="text-3xl font-black text-text-primary block">34</span>
            <span className="text-xs font-semibold text-text-secondary">Available workers</span>
          </div>
        </Card>

        {/* Card 4: Completed Today */}
        <Card className="flex flex-col justify-between p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-success flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-gray-500">target 24</span>
          </div>
          <div>
            <span className="text-3xl font-black text-text-primary block">26</span>
            <span className="text-xs font-semibold text-text-secondary">Completed today</span>
          </div>
        </Card>

        {/* Card 5: Workers Busy */}
        <Card className="flex flex-col justify-between p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-secondary flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-gray-500">avg. 2.3 jobs each</span>
          </div>
          <div>
            <span className="text-3xl font-black text-text-primary block">21</span>
            <span className="text-xs font-semibold text-text-secondary">Workers busy</span>
          </div>
        </Card>

        {/* Card 6: Pending Assignments */}
        <Card className="flex flex-col justify-between p-5 space-y-3 border-amber-200 bg-amber-50/10">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-amber-700 font-bold">needs review</span>
          </div>
          <div>
            <span className="text-3xl font-black text-text-primary block">5</span>
            <span className="text-xs font-semibold text-text-secondary">Pending assignments</span>
          </div>
        </Card>
      </div>

      {/* Bottom Section: New Service Requests + Workforce Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: New Service Requests List */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="font-bold text-text-primary text-base">New Service Requests</h3>
              <Link
                href="/admin/requests"
                className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {/* Sample Request 1 */}
              <div className="p-4 rounded-xl border border-border bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center shrink-0">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary text-sm">Plumbing</h4>
                    <span className="text-xs text-text-secondary font-mono">
                      Thane · 10:00 AM
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-between sm:justify-end">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                    ● New
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/admin/requests/REQ-1002")}
                  >
                    Review
                  </Button>
                </div>
              </div>

              {/* Sample Request 2 */}
              <div className="p-4 rounded-xl border border-border bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary text-sm">Electrical</h4>
                    <span className="text-xs text-text-secondary font-mono">
                      Kalwa · 11:00 AM
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-between sm:justify-end">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                    ● New
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/admin/requests/REQ-1001")}
                  >
                    Review
                  </Button>
                </div>
              </div>

              {/* Sample Request 3 */}
              <div className="p-4 rounded-xl border border-border bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary text-sm">Cleaning</h4>
                    <span className="text-xs text-text-secondary font-mono">
                      Majiwada · 12:00 PM
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-between sm:justify-end">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                    ● New
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/admin/requests/REQ-1001")}
                  >
                    Review
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Workforce Status Progress Bars Widget */}
        <div className="space-y-4">
          <Card className="p-6 space-y-5">
            <h3 className="font-bold text-text-primary text-base border-b border-border pb-2">
              Workforce Status
            </h3>

            {/* Available Progress */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-text-primary">Available</span>
                <span className="font-mono text-text-primary font-bold">34</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-success h-2.5 rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>

            {/* Busy Progress */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-text-primary">Busy</span>
                <span className="font-mono text-text-primary font-bold">21</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-secondary h-2.5 rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>

            {/* Offline Progress */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-text-primary">Offline</span>
                <span className="font-mono text-text-primary font-bold">28</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: "50%" }}></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
