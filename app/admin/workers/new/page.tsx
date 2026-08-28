"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, UploadCloud } from "lucide-react";

export default function AdminAddWorkerPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("Suresh Kumar");
  const [mobileNumber, setMobileNumber] = useState("+91 98765 43210");
  const [primarySkill, setPrimarySkill] = useState("Plumbing");
  const [experienceYears, setExperienceYears] = useState("6 years");
  const [subSkills, setSubSkills] = useState(["Pipe repair", "Fittings", "Maintenance"]);
  const [serviceAreas, setServiceAreas] = useState(["Thane", "Kalwa"]);
  const [availability, setAvailability] = useState("AVAILABLE");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin/workers");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <Link
          href="/admin/workers"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-primary transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Workers
        </Link>
        <span className="text-xs font-mono text-text-secondary uppercase tracking-widest block">
          WORKERS / ADD
        </span>
        <h1 className="text-2xl font-extrabold text-text-primary mt-1">
          Add Cooperative Worker
        </h1>
        <p className="text-xs text-text-secondary mt-1">
          Register a new worker so they can start receiving matched job requests.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                FULL NAME *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Suresh Kumar"
                className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                MOBILE NUMBER *
              </label>
              <input
                type="text"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="+91 9XXXX XXXXX"
                className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                PRIMARY SKILL *
              </label>
              <select
                value={primarySkill}
                onChange={(e) => setPrimarySkill(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none bg-white"
              >
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Painting">Painting</option>
                <option value="Carpentry">Carpentry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                YEARS OF EXPERIENCE *
              </label>
              <input
                type="text"
                required
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                placeholder="6 years"
                className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Sub-skills */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider">
              SUB-SKILLS
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {subSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-lg text-xs font-semibold text-text-primary"
                >
                  {skill}
                </span>
              ))}
              <button
                type="button"
                className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>

          {/* Service areas */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider">
              SERVICE AREAS
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-lg text-xs font-semibold text-text-primary"
                >
                  {area}
                </span>
              ))}
              <button
                type="button"
                className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add area
              </button>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider">
              CERTIFICATIONS
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
              <UploadCloud className="w-6 h-6 text-gray-400 mx-auto mb-1" />
              <span className="text-xs font-bold text-amber-800">
                + Add certification document
              </span>
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider">
              AVAILABILITY
            </label>

            <div className="flex items-center gap-6 text-xs font-semibold text-text-primary">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="avail"
                  checked={availability === "AVAILABLE"}
                  onChange={() => setAvailability("AVAILABLE")}
                />
                <span>Available for assignment</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="avail"
                  checked={availability === "UNAVAILABLE"}
                  onChange={() => setAvailability("UNAVAILABLE")}
                />
                <span>Not yet available</span>
              </label>
            </div>
          </div>

          <p className="text-[11px] font-mono text-gray-400 border-t border-gray-100 pt-3">
            For the demo, worker data can be synthetic — no real ID verification is called.
          </p>

          <div className="flex gap-3 justify-end pt-2">
            <Button
              variant="outline"
              size="md"
              type="button"
              onClick={() => router.push("/admin/workers")}
            >
              Cancel
            </Button>
            <Button variant="accent" size="md" type="submit">
              Add Worker
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
