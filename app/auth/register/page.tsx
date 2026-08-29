"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppStore } from "@/lib/store/use-app-store";
import { Card } from "@/components/ui/card";
import {
  User,
  UserCheck,
  HardHat,
  Phone,
  Mail,
  Lock,
  Building2,
  BadgeCheck,
  MapPin,
  Wrench,
  ShieldCheck,
  Sliders,
  Sparkles,
  Bell,
  Calendar,
  Briefcase,
  TrendingUp,
  Headphones,
  Eye,
  EyeOff,
} from "lucide-react";

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") || "customer";

  const [activeTab, setActiveTab] = useState<"customer" | "coordinator" | "worker">(
    initialRole === "coordinator" ? "coordinator" : initialRole === "worker" ? "worker" : "customer"
  );

  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [cooperativeName, setCooperativeName] = useState("");
  const [cooperativeId, setCooperativeId] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [primarySkill, setPrimarySkill] = useState("Plumbing Repairs");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [locationCity, setLocationCity] = useState("Thane, Maharashtra");
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { loginAsRole } = useAppStore();

  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "coordinator") setActiveTab("coordinator");
    else if (roleParam === "worker") setActiveTab("worker");
    else if (roleParam === "customer") setActiveTab("customer");
  }, [searchParams]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === "customer") {
      loginAsRole("MEMBER");
      router.push("/consumer/dashboard");
    } else if (activeTab === "coordinator") {
      loginAsRole("COOPERATIVE_ADMIN");
      router.push("/admin/dashboard");
    } else if (activeTab === "worker") {
      loginAsRole("WORKER");
      router.push("/worker/jobs");
    }
  };

  const themeConfig = {
    customer: {
      primaryColor: "bg-emerald-700 hover:bg-emerald-800",
      focusRing: "focus:ring-emerald-600",
      tagText: "text-emerald-700 bg-emerald-100",
      portalBadge: "Customer Registration",
      title: "Customer Sign Up",
      subtitle: "Create your account to book services",
      avatarBg: "bg-emerald-100 text-emerald-700",
    },
    coordinator: {
      primaryColor: "bg-purple-700 hover:bg-purple-800",
      focusRing: "focus:ring-purple-600",
      tagText: "text-purple-700 bg-purple-100",
      portalBadge: "Coordinator Registration",
      title: "Coordinator Sign Up",
      subtitle: "Manage requests and coordinate service operations",
      avatarBg: "bg-purple-100 text-purple-700",
    },
    worker: {
      primaryColor: "bg-accent hover:bg-amber-600",
      focusRing: "focus:ring-accent",
      tagText: "text-amber-800 bg-amber-100",
      portalBadge: "Worker Registration",
      title: "Worker Sign Up",
      subtitle: "Join as a service professional and get work",
      avatarBg: "bg-amber-100 text-amber-800",
    },
  }[activeTab];

  return (
    <div className="min-h-[85vh] bg-background py-10 px-4 sm:px-6 lg:px-8 space-y-8 max-w-4xl mx-auto" suppressHydrationWarning>
      {/* Role Tab Switcher Bar */}
      <div className="flex items-center justify-center gap-2 p-1.5 bg-gray-200/70 rounded-2xl max-w-md mx-auto shadow-inner">
        <button
          type="button"
          suppressHydrationWarning
          onClick={() => setActiveTab("customer")}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "customer"
              ? "bg-white text-emerald-800 shadow"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <User className="w-3.5 h-3.5" /> Customer
        </button>

        <button
          type="button"
          suppressHydrationWarning
          onClick={() => setActiveTab("coordinator")}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "coordinator"
              ? "bg-white text-purple-800 shadow"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" /> Coordinator
        </button>

        <button
          type="button"
          suppressHydrationWarning
          onClick={() => setActiveTab("worker")}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "worker"
              ? "bg-white text-amber-800 shadow"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <HardHat className="w-3.5 h-3.5" /> Worker
        </button>
      </div>

      {/* Main Registration Card */}
      <Card className="p-6 sm:p-10 border border-border shadow-xl space-y-8 bg-white max-w-2xl mx-auto rounded-3xl" suppressHydrationWarning>
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="space-y-1">
            <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block ${themeConfig.tagText}`}>
              {themeConfig.portalBadge}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
              {themeConfig.title}
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary font-medium">
              {themeConfig.subtitle}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-text-secondary">Already have an account? </span>
            <Link
              href={`/auth/login?role=${activeTab}`}
              className="text-xs font-extrabold text-text-primary hover:underline"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4" suppressHydrationWarning>
          <div>
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                suppressHydrationWarning
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 ${themeConfig.focusRing}`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
              Mobile Number *
            </label>
            <div className="flex gap-2">
              <div className="px-3.5 py-2.5 bg-gray-100 border border-gray-300 rounded-xl text-xs font-bold text-text-primary flex items-center shrink-0">
                🇮🇳 +91
              </div>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  required
                  suppressHydrationWarning
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 ${themeConfig.focusRing}`}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
              Email Address {activeTab !== "coordinator" && "(Optional)"} {activeTab === "coordinator" && "*"}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required={activeTab === "coordinator"}
                suppressHydrationWarning
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 ${themeConfig.focusRing}`}
              />
            </div>
          </div>

          {activeTab === "coordinator" && (
            <>
              <div>
                <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                  Cooperative / Society Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    suppressHydrationWarning
                    value={cooperativeName}
                    onChange={(e) => setCooperativeName(e.target.value)}
                    placeholder="Enter cooperative or society name"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 ${themeConfig.focusRing}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                  Cooperative ID *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <BadgeCheck className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    suppressHydrationWarning
                    value={cooperativeId}
                    onChange={(e) => setCooperativeId(e.target.value)}
                    placeholder="Enter cooperative ID"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 ${themeConfig.focusRing}`}
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === "worker" && (
            <>
              <div>
                <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                  Worker ID (If available)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <BadgeCheck className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    suppressHydrationWarning
                    value={workerId}
                    onChange={(e) => setWorkerId(e.target.value)}
                    placeholder="Enter your worker ID"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 ${themeConfig.focusRing}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                  Primary Skill / Trade *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <select
                    suppressHydrationWarning
                    value={primarySkill}
                    onChange={(e) => setPrimarySkill(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 ${themeConfig.focusRing} bg-white`}
                  >
                    <option value="Plumbing Repairs">Plumbing Repairs</option>
                    <option value="Electrical Wiring & Appliances">Electrical Wiring & Appliances</option>
                    <option value="Deep House Cleaning">Deep House Cleaning</option>
                    <option value="Wall Painting">Wall Painting</option>
                    <option value="Carpentry Services">Carpentry Services</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {activeTab === "customer" && (
            <div>
              <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                Location / City *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  suppressHydrationWarning
                  value={locationCity}
                  onChange={(e) => setLocationCity(e.target.value)}
                  placeholder="Enter your city or area (e.g. Thane West)"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 ${themeConfig.focusRing}`}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  suppressHydrationWarning
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 ${themeConfig.focusRing}`}
                />
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  suppressHydrationWarning
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 ${themeConfig.focusRing}`}
                />
              </div>
            </div>
          </div>

          <div className="pt-1">
            <label className="flex items-center gap-2 text-xs font-medium text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                required
                suppressHydrationWarning
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              I agree to the <a href="#" className="font-bold text-text-primary underline">Terms of Service</a> and <a href="#" className="font-bold text-text-primary underline">Privacy Policy</a>
            </label>
          </div>

          <button
            type="submit"
            suppressHydrationWarning
            className={`w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-md transition-all cursor-pointer ${themeConfig.primaryColor}`}
          >
            Create Account
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-gray-400 font-medium">or sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              suppressHydrationWarning
              onClick={handleRegister}
              className="py-2.5 px-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-text-primary flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span className="font-extrabold text-blue-600">G</span> Continue with Google
            </button>
            <button
              type="button"
              suppressHydrationWarning
              onClick={handleRegister}
              className="py-2.5 px-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-text-primary flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-gray-500" /> Continue with OTP
            </button>
          </div>
        </form>
      </Card>

      {/* Feature Badges */}
      <Card className="p-5 bg-white border border-border shadow-sm max-w-2xl mx-auto rounded-2xl">
        {activeTab === "customer" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center space-y-1">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs text-text-primary">Secure & Private</span>
              <span className="text-[10px] text-text-secondary">Your data is safe with us</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <BadgeCheck className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs text-text-primary">Verified Workers</span>
              <span className="text-[10px] text-text-secondary">Trusted & professional</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs text-text-primary">Easy Booking</span>
              <span className="text-[10px] text-text-secondary">Quick & hassle-free</span>
            </div>
          </div>
        )}

        {activeTab === "coordinator" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center space-y-1">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
                <Sliders className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs text-text-primary">Total Control</span>
              <span className="text-[10px] text-text-secondary">Manage all requests and workers</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs text-text-primary">Smart Assignment</span>
              <span className="text-[10px] text-text-secondary">Find the right worker for the job</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
                <Bell className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs text-text-primary">Real-time Updates</span>
              <span className="text-[10px] text-text-secondary">Track every request in real time</span>
            </div>
          </div>
        )}

        {activeTab === "worker" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center space-y-1">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-800">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs text-text-primary">Find Jobs Easily</span>
              <span className="text-[10px] text-text-secondary">Get relevant jobs near you</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-800">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs text-text-primary">Grow Your Business</span>
              <span className="text-[10px] text-text-secondary">Build reputation & earn more</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-800">
                <Headphones className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs text-text-primary">Support & Safety</span>
              <span className="text-[10px] text-text-secondary">We're here to support you</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-bold text-gray-500">Loading Sign Up...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
