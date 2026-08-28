"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store/use-app-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft, CheckCircle } from "lucide-react";

export default function RatePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { requests, submitRating } = useAppStore();

  const request = requests.find((r) => r.id === resolvedParams.id) || requests[0];
  const [stars, setStars] = useState(request.rating?.stars || 0);
  const [hoverStars, setHoverStars] = useState(0);
  const [review, setReview] = useState(request.rating?.review || "");
  const [selectedIssues, setSelectedIssues] = useState<string[]>(request.rating?.issues || []);
  const [submitted, setSubmitted] = useState(!!request.rating?.stars);

  const issuesList = [
    "Late arrival",
    "Incomplete work",
    "Behaviour issue",
    "Overcharging",
  ];

  const toggleIssue = (issue: string) => {
    if (selectedIssues.includes(issue)) {
      setSelectedIssues(selectedIssues.filter((i) => i !== issue));
    } else {
      setSelectedIssues([...selectedIssues, issue]);
    }
  };

  const handleSubmit = () => {
    if (stars === 0) return;
    submitRating(request.id, stars, review, selectedIssues);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-success rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary">Thank You for Your Feedback!</h1>
        <p className="text-sm text-text-secondary">
          Your rating helps maintain high quality and accountability across Labour Cooperative Societies.
        </p>

        <div className="pt-2">
          <Button variant="primary" size="md" onClick={() => router.push("/consumer/dashboard")}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <Link
          href={`/consumer/track/${request.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Tracking
        </Link>
        <h1 className="text-2xl font-bold text-text-primary">Rate Your Experience</h1>
        <p className="text-sm text-text-secondary">
          Help us evaluate worker performance for {request.id}.
        </p>
      </div>

      <Card className="space-y-6 text-center py-8">
        {/* Worker Info */}
        <div className="space-y-2">
          <div className="w-16 h-16 rounded-full bg-primary text-white font-bold text-2xl flex items-center justify-center mx-auto shadow">
            {request.assignedWorkerName ? request.assignedWorkerName.charAt(0) : "W"}
          </div>
          <h3 className="font-bold text-text-primary text-lg">
            {request.assignedWorkerName || "Assigned Worker"}
          </h3>
          <p className="text-xs text-text-secondary">
            {request.categoryName} · {request.preferredDate}
          </p>
        </div>

        {/* 5-Star Interactive Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest">
            TAP TO RATE
          </label>

          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((starNum) => {
              const active = starNum <= (hoverStars || stars);
              return (
                <button
                  key={starNum}
                  type="button"
                  onMouseEnter={() => setHoverStars(starNum)}
                  onMouseLeave={() => setHoverStars(0)}
                  onClick={() => setStars(starNum)}
                  className="p-1 focus:outline-none transition-transform transform hover:scale-110 cursor-pointer"
                >
                  <Star
                    className={`w-9 h-9 ${
                      active
                        ? "text-accent fill-accent"
                        : "text-gray-300 fill-gray-100"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Written Review */}
        <div className="text-left space-y-1">
          <label className="block text-xs font-bold text-text-primary uppercase tracking-wider">
            WRITTEN REVIEW (OPTIONAL)
          </label>
          <textarea
            rows={3}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write a brief review — e.g. 'Very professional, fixed the leak quickly. Highly recommended.'"
            className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* ANY ISSUES Checkbox Group */}
        <div className="text-left space-y-2 pt-2 border-t border-gray-100">
          <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest">
            ANY ISSUES FACED?
          </label>

          <div className="grid grid-cols-2 gap-2">
            {issuesList.map((issue) => {
              const isChecked = selectedIssues.includes(issue);
              return (
                <button
                  type="button"
                  key={issue}
                  onClick={() => toggleIssue(issue)}
                  className={`px-3 py-2 rounded-lg border text-xs font-semibold text-left transition-colors flex items-center justify-between cursor-pointer ${
                    isChecked
                      ? "border-danger bg-red-50 text-danger"
                      : "border-border text-text-secondary hover:bg-gray-50"
                  }`}
                >
                  <span>{issue}</span>
                  {isChecked && <span>✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Rating Button */}
        <Button
          variant="accent"
          size="lg"
          fullWidth
          disabled={stars === 0}
          onClick={handleSubmit}
          className="shadow-md"
        >
          Submit Rating
        </Button>
      </Card>
    </div>
  );
}
