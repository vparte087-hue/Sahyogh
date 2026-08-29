"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  HardHat,
  Mail,
  Phone,
  Wrench,
  Award,
  MapPin,
  Building2,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Edit3,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

export default function WorkerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile] = useState({
    fullName: "Deepak Patil",
    email: "deepak.patil@sahyog.coop",
    phone: "+91 87654 53209",
    primarySkills: "Plumbing, Pipe Repair",
    experience: "5 Years",
    serviceArea: "Thane, Mumbai Suburbs",
    societyName: "Sahyog Cooperative Society",
    workerId: "WRK-3CD4-0042",
    verificationStatus: "Verified",
    memberSince: "Dec 2023",
    skills: ["Plumbing", "Pipe Repair", "Tap Installation", "Bathroom Fitting", "Leakage Repair"],
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4 sm:p-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/worker/jobs" className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Jobs Queue
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-xs font-bold text-gray-500">Worker Profile</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            My Profile
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary">
            Manage your worker profile and skills
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 rounded-xl bg-accent hover:bg-amber-600 text-white font-bold text-xs shadow transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Edit3 className="w-3.5 h-3.5" /> {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      {/* Main Grid matching Bottom Wireframe */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Avatar Card */}
        <Card className="p-6 text-center space-y-4 border border-amber-100 bg-white shadow-md rounded-2xl flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-amber-100 text-amber-800 font-extrabold text-3xl flex items-center justify-center border-4 border-accent shadow-inner">
              DP
            </div>
            <span className="w-5 h-5 rounded-full bg-amber-500 border-2 border-white absolute bottom-1 right-1" />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-text-primary">{profile.fullName}</h2>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" /> Verified Worker
            </div>
          </div>

          <div className="w-full space-y-2 pt-2 border-t border-gray-100 text-xs text-text-secondary text-left">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="truncate">{profile.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>Member since {profile.memberSince}</span>
            </div>
          </div>
        </Card>

        {/* Right Column: Professional Information Card */}
        <Card className="lg:col-span-2 p-6 space-y-6 border border-border bg-white shadow-md rounded-2xl">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h3 className="font-bold text-base text-text-primary">Professional Information</h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3 h-3" /> Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-gray-400 font-semibold block flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-amber-700" /> Primary Skills
              </span>
              <p className="font-bold text-text-primary text-sm">{profile.primarySkills}</p>
            </div>

            <div className="space-y-1">
              <span className="text-gray-400 font-semibold block flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-700" /> Experience
              </span>
              <p className="font-bold text-text-primary text-sm">{profile.experience}</p>
            </div>

            <div className="space-y-1">
              <span className="text-gray-400 font-semibold block flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-700" /> Service Area
              </span>
              <p className="font-bold text-text-primary text-sm">{profile.serviceArea}</p>
            </div>

            <div className="space-y-1">
              <span className="text-gray-400 font-semibold block flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-700" /> Cooperative
              </span>
              <p className="font-bold text-text-primary text-sm">{profile.societyName}</p>
            </div>

            <div className="space-y-1">
              <span className="text-gray-400 font-semibold block flex items-center gap-1.5">
                <BadgeCheck className="w-3.5 h-3.5 text-amber-700" /> Worker ID
              </span>
              <p className="font-bold text-text-primary text-sm font-mono">{profile.workerId}</p>
            </div>

            <div className="space-y-1">
              <span className="text-gray-400 font-semibold block flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" /> Verification Status
              </span>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                {profile.verificationStatus}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Skills & Expertise Bar Card */}
      <Card className="p-6 space-y-4 border border-border bg-white shadow-md rounded-2xl">
        <h3 className="font-bold text-base text-text-primary border-b border-gray-100 pb-3">
          Skills & Expertise
        </h3>

        <div className="flex flex-wrap gap-2.5">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs shadow-sm hover:bg-amber-100 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
