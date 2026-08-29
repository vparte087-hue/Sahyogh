"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store/use-app-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Building2,
  UserCheck,
  HardHat,
  ShieldCheck,
  Award,
  Users,
  Lock,
} from "lucide-react";

export default function RoleSelectPage() {
  const router = useRouter();
  const { loginAsRole } = useAppStore();

  const handleSelectRole = (role: "MEMBER" | "COOPERATIVE_ADMIN" | "WORKER", destination: string) => {
    loginAsRole(role);
    router.push(destination);
  };

  return (
    <div className="min-h-[85vh] bg-background py-10 px-4 sm:px-6 lg:px-8 space-y-10 max-w-6xl mx-auto">
      {/* Title Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
          Welcome to Sahyog!
        </h1>
        <p className="text-sm sm:text-base text-text-secondary font-medium">
          Please select how you want to continue
        </p>
      </div>

      {/* 4 Role Selection Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Customer (Green) */}
        <Card className="p-6 text-center space-y-6 flex flex-col justify-between hover:shadow-xl transition-all border-emerald-100 hover:border-emerald-500 group">
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner group-hover:scale-110 transition-transform">
              <User className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-text-primary">Customer</h3>
              <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                Book services for your home or personal needs.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleSelectRole("MEMBER", "/consumer/dashboard")}
            className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Continue as Customer
          </button>
        </Card>

        {/* Card 2: Institution / Organization (Blue) */}
        <Card className="p-6 text-center space-y-6 flex flex-col justify-between hover:shadow-xl transition-all border-blue-100 hover:border-secondary group">
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-full bg-blue-100 text-secondary flex items-center justify-center mx-auto shadow-inner group-hover:scale-110 transition-transform">
              <Building2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-text-primary">Institution / Organization</h3>
              <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                Request services for your organization or society.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleSelectRole("MEMBER", "/consumer/dashboard")}
            className="w-full py-3 px-4 rounded-xl bg-secondary hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Continue as Institution
          </button>
        </Card>

        {/* Card 3: Coordinator / Admin (Purple) */}
        <Card className="p-6 text-center space-y-6 flex flex-col justify-between hover:shadow-xl transition-all border-purple-100 hover:border-purple-600 group">
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto shadow-inner group-hover:scale-110 transition-transform">
              <UserCheck className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-text-primary">Coordinator</h3>
              <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                Manage requests, workers and service operations.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleSelectRole("COOPERATIVE_ADMIN", "/admin/dashboard")}
            className="w-full py-3 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Continue as Coordinator
          </button>
        </Card>

        {/* Card 4: Worker (Orange) */}
        <Card className="p-6 text-center space-y-6 flex flex-col justify-between hover:shadow-xl transition-all border-amber-100 hover:border-accent group">
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-inner group-hover:scale-110 transition-transform">
              <HardHat className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-text-primary">Worker</h3>
              <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                View jobs, update status and manage work.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleSelectRole("WORKER", "/worker/jobs")}
            className="w-full py-3 px-4 rounded-xl bg-accent hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Continue as Worker
          </button>
        </Card>
      </div>

      {/* Bottom Value Proposition Bar matching Image 1 */}
      <Card className="p-6 bg-white border border-border shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xs text-text-primary block">One Platform</span>
              <span className="text-[11px] text-text-secondary">Many Roles</span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="p-2.5 rounded-xl bg-blue-50 text-secondary">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xs text-text-primary block">Trusted by</span>
              <span className="text-[11px] text-text-secondary">Cooperatives</span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xs text-text-primary block">Empowering Local</span>
              <span className="text-[11px] text-text-secondary">Communities</span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xs text-text-primary block">Secure &</span>
              <span className="text-[11px] text-text-secondary">Transparent</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
