"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/lib/store/use-app-store";
import {
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Sparkles,
  Flower2,
  Car,
  Tv,
  ArrowLeft,
  UploadCloud,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Sparkles,
  Flower2,
  Car,
  Tv,
};

function RequestFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const catIdParam = searchParams.get("category") || "plumbing";

  const { categories, createServiceRequest } = useAppStore();
  const category = categories.find((c) => c.id === catIdParam) || categories[0];

  const [title, setTitle] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [preferredDate, setPreferredDate] = useState("2026-08-29");
  const [preferredTimeSlot, setPreferredTimeSlot] = useState("Morning (8am – 12pm)");
  const [houseNo, setHouseNo] = useState("Flat 402, Gokul Dham Heights");
  const [locality, setLocality] = useState("Borivali East");
  const [pinCode, setPinCode] = useState("400066");
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const photoReq = category.photoRequirement;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemDescription.trim()) return;

    if (photoReq === "REQUIRED" && !photoUploaded) {
      alert("Photos are required for this service category!");
      return;
    }

    const newReqId = createServiceRequest({
      categoryId: category.id,
      title: title.trim() || `${category.name} Service Request`,
      problemDescription,
      preferredDate,
      preferredTimeSlot,
      address: {
        houseNo,
        locality,
        pinCode,
        city: "Mumbai",
      },
      photos: photoUploaded ? ["/sample-photo.jpg"] : [],
    });

    router.push(`/consumer/track/${newReqId}`);
  };

  const Icon = ICON_MAP[category.iconName] || Wrench;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/consumer/browse"
          className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Categories
        </Link>
        <span className="block text-xs font-bold text-text-secondary uppercase tracking-widest">
          STEP 2 OF 3
        </span>
        <h1 className="text-2xl font-bold text-text-primary mt-1">Describe Your Request</h1>
        <p className="text-sm text-text-secondary mt-1">
          Provide accurate service requirements and schedule for cooperative admin assignment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Selected Service Read-only Box */}
        <Card className="bg-gray-50 border-gray-200">
          <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
            SERVICE TYPE
          </label>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary text-base">{category.name}</h3>
              <p className="text-xs text-text-secondary">{category.description}</p>
            </div>
          </div>
        </Card>

        {/* Problem Title & Description */}
        <Card className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
              ISSUE SUMMARY / TITLE
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Kitchen sink drain leakage"
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
              PROBLEM DESCRIPTION *
            </label>
            <textarea
              rows={4}
              required
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="Describe the issue clearly — e.g. 'Kitchen sink has a slow drip under the cabinet. Water drips constantly when tap is turned on.'"
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </Card>

        {/* Date & Time Slot */}
        <Card className="space-y-4">
          <label className="block text-xs font-bold text-text-primary uppercase tracking-wider">
            SCHEDULE PREFERENCE *
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-text-secondary mb-1 flex items-center gap-1 font-semibold">
                <Calendar className="w-3.5 h-3.5" /> Preferred Date
              </label>
              <input
                type="date"
                required
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none bg-white"
              />
            </div>

            <div>
              <label className="block text-xs text-text-secondary mb-1 flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5" /> Time Slot
              </label>
              <select
                value={preferredTimeSlot}
                onChange={(e) => setPreferredTimeSlot(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none bg-white"
              >
                <option value="Morning (8am – 12pm)">Morning (8am – 12pm)</option>
                <option value="Afternoon (12pm – 4pm)">Afternoon (12pm – 4pm)</option>
                <option value="Evening (4pm – 8pm)">Evening (4pm – 8pm)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Address */}
        <Card className="space-y-4">
          <label className="block text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-4 h-4 text-primary" /> SERVICE ADDRESS *
          </label>

          <div>
            <label className="block text-xs text-text-secondary mb-1">
              Flat / House No, Building Name *
            </label>
            <input
              type="text"
              required
              value={houseNo}
              onChange={(e) => setHouseNo(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-text-secondary mb-1">Area / Locality *</label>
              <input
                type="text"
                required
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-text-secondary mb-1">PIN Code *</label>
              <input
                type="text"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>
        </Card>

        {/* Conditional Photo Upload Zone */}
        {photoReq !== "NOT_REQUIRED" && (
          <Card className="space-y-3">
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider">
              ATTACH PHOTOS ({photoReq === "REQUIRED" ? "REQUIRED *" : "OPTIONAL"})
            </label>

            <div
              onClick={() => setPhotoUploaded(!photoUploaded)}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                photoUploaded
                  ? "border-success bg-emerald-50/50"
                  : "border-gray-300 hover:border-primary bg-gray-50"
              }`}
            >
              <UploadCloud
                className={`w-8 h-8 mx-auto mb-2 ${
                  photoUploaded ? "text-success" : "text-gray-400"
                }`}
              />
              <p className="text-sm font-semibold text-text-primary">
                {photoUploaded ? "Photo Attached (1 file selected)" : "Click or drag to upload photo evidence"}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                Supports JPG, PNG – Max 5MB. Helps admin assign the right worker.
              </p>
            </div>
          </Card>
        )}

        {/* Submit CTA */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          className="shadow-md"
        >
          Submit Request →
        </Button>
      </form>
    </div>
  );
}

export default function NewRequestPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <RequestFormContent />
    </Suspense>
  );
}
