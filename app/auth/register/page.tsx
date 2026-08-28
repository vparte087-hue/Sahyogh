"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"MEMBER" | "WORKER">("MEMBER");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "MEMBER") router.push("/consumer/dashboard");
    else router.push("/worker/jobs");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white border border-border rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Panel: Brand & Tagline */}
        <div className="bg-primary text-white p-8 sm:p-12 flex flex-col justify-between space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-accent text-white px-3 py-1 rounded-lg font-bold text-xl">
                सहयोग
              </span>
              <span className="font-bold text-2xl">Sahyog</span>
            </div>
            <h2 className="text-2xl font-extrabold leading-tight">
              Built for the community, by the community.
            </h2>
            <p className="text-gray-300 text-sm mt-3 leading-relaxed">
              Connect with registered Labour Cooperative Societies for transparent, accountable, and fair household & community services.
            </p>
          </div>

          <div className="border-t border-white/10 pt-4 text-xs text-gray-300">
            <p>© Sahyog Labour Cooperative Federation</p>
          </div>
        </div>

        {/* Right Panel: Form */}
        <div className="p-8 sm:p-12 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-text-primary">Create an account</h3>
            <p className="text-xs text-text-secondary mt-1">
              Welcome! Select your role to get started on Sahyog.
            </p>
          </div>

          {/* Role Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
            <button
              type="button"
              onClick={() => setRole("MEMBER")}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                role === "MEMBER" ? "bg-primary text-white shadow" : "text-text-secondary"
              }`}
            >
              Join as Member
            </button>
            <button
              type="button"
              onClick={() => setRole("WORKER")}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                role === "WORKER" ? "bg-primary text-white shadow" : "text-text-secondary"
              }`}
            >
              Join as Worker
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                FULL NAME *
              </label>
              <input
                type="text"
                required
                placeholder="Priya Verma"
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                MOBILE NUMBER *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98200 11223"
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            {role === "WORKER" && (
              <div>
                <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                  COOPERATIVE SOCIETY NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Shivaji Labour Cooperative Society"
                  className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            )}

            <Button type="submit" variant="accent" size="lg" fullWidth className="shadow-md">
              Create Account →
            </Button>
          </form>

          <p className="text-center text-xs text-text-secondary">
            Already have an account?{" "}
            <Link href="/consumer/dashboard" className="text-secondary font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
