"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppStore } from "@/lib/store/use-app-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, MapPin, UploadCloud, CheckCircle2 } from "lucide-react";

function NewRequestFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const catIdParam = searchParams.get("category") || "plumbing";

  const { categories, createRequest } = useAppStore();
  const category = categories.find((c) => c.id === catIdParam) || categories[0];

  const [title, setTitle] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [preferredDate, setPreferredDate] = useState("2026-08-29");
  const [preferredTimeSlot, setPreferredTimeSlot] = useState("Morning (8am – 12pm)");
  const [houseNo, setHouseNo] = useState("Flat 302, Royal Palms");
  const [locality, setLocality] = useState("Borivali East");
  const [city, setCity] = useState("Mumbai");
  const [pinCode, setPinCode] = useState("400066");
  const [photoAttached, setPhotoAttached] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !problemDescription) return;

    const newReqId = createRequest({
      categoryId: category.id,
      categoryName: category.name,
      title,
      problemDescription,
      preferredDate,
      preferredTimeSlot,
      address: {
        houseNo,
        locality,
        city,
        pinCode,
      },
      evidencePhotos: photoAttached ? ["/sample-leak.jpg"] : [],
    });

    router.push(`/consumer/track/${newReqId}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/consumer/browse"
          className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Category Selection
        </Link>
        <span className="block text-xs font-bold text-text-secondary uppercase tracking-widest">
          STEP 2 OF 3
        </span>
        <h1 className="text-2xl font-bold text-text-primary mt-1">Submit Requirement Details</h1>
        <p className="text-sm text-text-secondary mt-1">
          Provide your service requirement and schedule preference for cooperative admin review.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Selected Category Box */}
        <Card className="bg-blue-50/50 border-secondary/30 flex items-center justify-between p-4">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-secondary uppercase block">
              SELECTED SERVICE CATEGORY
            </span>
            <h3 className="text-lg font-bold text-text-primary mt-0.5">{category.name}</h3>
            <span className="text-xs text-text-secondary">{category.hindiName}</span>
          </div>

          <Link href="/consumer/browse">
            <Button variant="outline" size="sm">
              Change
            </Button>
          </Link>
        </Card>

        {/* Problem Title & Description */}
        <Card className="space-y-4">
          <h3 className="text-xs font-bold tracking-widest text-text-secondary uppercase">
            1. REQUIREMENT DETAILS
          </h3>

          <div>
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
              SERVICE TITLE / PROBLEM SUMMARY *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Main circuit breaker trips when AC is turned on"
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
              DETAILED DESCRIPTION *
            </label>
            <textarea
              rows={4}
              required
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="Describe the issue in detail — what happened, where is it located, any specific instructions..."
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Conditional Photo Upload Zone */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider">
              UPLOAD PHOTO EVIDENCE (OPTIONAL)
            </label>
            <div
              onClick={() => setPhotoAttached(!photoAttached)}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
                photoAttached
                  ? "border-success bg-emerald-50 text-emerald-800"
                  : "border-gray-300 hover:border-primary text-gray-500"
              }`}
            >
              <UploadCloud className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <span className="text-xs font-semibold block">
                {photoAttached
                  ? "✓ Photo attached (sample-leak.jpg)"
                  : "Click to simulate uploading photo of issue"}
              </span>
              <span className="text-[10px] text-gray-400 block mt-0.5">
                Supports JPG, PNG up to 5MB
              </span>
            </div>
          </div>
        </Card>

        {/* Schedule & Address */}
        <Card className="space-y-4">
          <h3 className="text-xs font-bold tracking-widest text-text-secondary uppercase">
            2. SCHEDULE PREFERENCE & LOCATION
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                PREFERRED DATE *
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                TIME SLOT *
              </label>
              <select
                value={preferredTimeSlot}
                onChange={(e) => setPreferredTimeSlot(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none bg-white"
              >
                <option>Morning (8am – 12pm)</option>
                <option>Afternoon (12pm – 4pm)</option>
                <option>Evening (4pm – 8pm)</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                FLAT / HOUSE NO / BUILDING *
              </label>
              <input
                type="text"
                required
                value={houseNo}
                onChange={(e) => setHouseNo(e.target.value)}
                placeholder="Flat 302, Royal Palms"
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                  LOCALITY / AREA *
                </label>
                <input
                  type="text"
                  required
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="Borivali East"
                  className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                  CITY *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Mumbai"
                  className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                  PIN CODE *
                </label>
                <input
                  type="text"
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  placeholder="400066"
                  className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Submit CTA */}
        <div className="pt-2">
          <Button variant="accent" size="lg" fullWidth type="submit" className="shadow-md">
            Submit Service Request →
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function NewRequestPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-text-secondary">Loading form...</div>}>
      <NewRequestFormContent />
    </Suspense>
  );
}
