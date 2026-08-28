"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "../lib/store/use-app-store";
import { UserRole } from "../lib/types";
import { ShieldCheck, User, HardHat, RefreshCw } from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const { activeRole, setActiveRole, resetDemoData } = useAppStore();

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
    if (role === "CONSUMER") router.push("/consumer/dashboard");
    else if (role === "COOPERATIVE_ADMIN") router.push("/admin/requests");
    else if (role === "WORKER") router.push("/worker/jobs");
  };

  return (
    <header className="bg-primary text-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-accent text-white p-2 rounded-lg font-bold text-xl flex items-center justify-center">
            सहयोग
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight group-hover:text-accent transition-colors">
                Sahyog सहयोग
              </span>
              <span className="bg-white/10 text-xs px-2 py-0.5 rounded font-mono text-gray-300">
                PROTOTYPE
              </span>
            </div>
            <p className="text-xs text-gray-300 hidden sm:block">
              Cooperative Gig Services Platform
            </p>
          </div>
        </Link>

        {/* Interactive Role Switcher */}
        <div className="flex items-center gap-3">
          <div className="bg-primary-hover p-1 rounded-lg border border-white/10 flex items-center gap-1">
            <button
              onClick={() => handleRoleChange("CONSUMER")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeRole === "CONSUMER"
                  ? "bg-accent text-white shadow"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Consumer</span>
            </button>

            <button
              onClick={() => handleRoleChange("COOPERATIVE_ADMIN")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeRole === "COOPERATIVE_ADMIN"
                  ? "bg-accent text-white shadow"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            <button
              onClick={() => handleRoleChange("WORKER")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeRole === "WORKER"
                  ? "bg-accent text-white shadow"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <HardHat className="w-3.5 h-3.5" />
              <span>Worker</span>
            </button>
          </div>

          <button
            onClick={() => {
              resetDemoData();
              alert("Demo data reset to initial state!");
            }}
            title="Reset Demo Data"
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
