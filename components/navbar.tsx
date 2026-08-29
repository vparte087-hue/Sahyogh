"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store/use-app-store";
import { ShieldCheck, LogOut, UserCheck } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { activeRole, isLoggedIn, logout } = useAppStore();

  const isConsumer = pathname.startsWith("/consumer");
  const isAdmin = pathname.startsWith("/admin");
  const isWorker = pathname.startsWith("/worker");
  const isPortal = isConsumer || isAdmin || isWorker;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="bg-primary text-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-accent text-white font-bold flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                Sahyog
              </span>
              <span className="bg-accent/20 text-accent font-bold px-2 py-0.5 rounded text-xs">
                सहयोग
              </span>
            </div>
            <span className="text-[10px] text-gray-300 tracking-wider block font-medium">
              Cooperative Gig Services
            </span>
          </div>
        </Link>

        {/* Dynamic Content: Public Nav vs Role Portal Session Header */}
        {!isPortal ? (
          /* Public Landing Navbar Links */
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-gray-200">
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
              <a href="#about" className="hover:text-accent transition-colors">
                About Us
              </a>
              <a href="#how-it-works" className="hover:text-accent transition-colors">
                How It Works
              </a>
              <a href="#services" className="hover:text-accent transition-colors">
                Services
              </a>
              <a href="#contact" className="hover:text-accent transition-colors">
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/auth/role-select"
                className="px-4 py-2 rounded-xl border border-white/20 text-xs font-bold text-white hover:bg-white/10 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/role-select"
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 shadow transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        ) : (
          /* Active Portal Session Info & Log Out Button */
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold">
              <UserCheck className="w-4 h-4 text-accent" />
              <span>
                {isConsumer
                  ? "Customer Portal"
                  : isAdmin
                  ? "Setu Ops Console"
                  : "Worker Portal"}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
