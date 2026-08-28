"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store/use-app-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, ShieldCheck, CheckCircle2, QrCode } from "lucide-react";

export default function ConsumerPaymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { requests, processPayment } = useAppStore();

  const request = requests.find((r) => r.id === resolvedParams.id) || requests[0];
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "CARD" | "NETBANKING">("UPI");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(request.status === "PAID");

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      processPayment(request.id, paymentMethod);
      setIsProcessing(false);
      setIsPaidSuccess(true);
    }, 1500);
  };

  const amount = request.amount || {
    base: 350,
    fee: 50,
    tax: 72,
    total: 472,
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link
          href={`/consumer/track/${request.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Tracking
        </Link>
        <span className="block text-xs font-bold text-text-secondary uppercase tracking-widest">
          STEP 3 OF 3
        </span>
        <h1 className="text-2xl font-bold text-text-primary mt-1">Payment & Invoice</h1>
      </div>

      {isPaidSuccess ? (
        <Card className="p-8 text-center space-y-4 border-success bg-emerald-50/50">
          <div className="w-16 h-16 rounded-full bg-success text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary">Payment Successful!</h2>
          <p className="text-xs text-text-secondary max-w-md mx-auto">
            ₹{amount.total} paid successfully to <strong>Sahyog Labour Cooperative Federation</strong>.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <Button
              variant="accent"
              size="lg"
              onClick={() => router.push(`/consumer/rate/${request.id}`)}
            >
              Rate Worker Service ★
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push("/consumer/dashboard")}>
              Return to Dashboard
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Order Summary */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-mono font-bold text-gray-500">{request.id}</span>
              <Badge status={request.status} />
            </div>

            <div>
              <h3 className="font-bold text-text-primary text-base">{request.title}</h3>
              <p className="text-xs text-text-secondary mt-0.5">{request.categoryName}</p>
            </div>

            <div className="space-y-2 text-xs pt-2 border-t border-gray-100">
              <div className="flex justify-between">
                <span className="text-text-secondary">Base Service Fare</span>
                <span className="font-bold text-text-primary">₹{amount.base}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-text-secondary">Cooperative Facilitation Fee</span>
                <span className="font-bold text-text-primary">₹{amount.fee}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-text-secondary">GST (18%)</span>
                <span className="font-bold text-text-primary">₹{amount.tax}</span>
              </div>

              <div className="flex justify-between items-center text-sm font-extrabold pt-2 border-t border-gray-200">
                <span className="text-text-primary">Total Payable</span>
                <span className="text-primary text-lg">₹{amount.total}</span>
              </div>
            </div>
          </Card>

          {/* Payment Options */}
          <Card className="space-y-4">
            <h3 className="text-xs font-bold tracking-widest text-text-secondary uppercase">
              SELECT PAYMENT METHOD
            </h3>

            <div className="space-y-2">
              <label
                onClick={() => setPaymentMethod("UPI")}
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "UPI" ? "border-primary bg-blue-50/40" : "border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <QrCode className="w-5 h-5 text-primary" />
                  <div>
                    <span className="text-xs font-bold text-text-primary block">UPI / GPay / PhonePe</span>
                    <span className="text-[10px] text-text-secondary block">Instant zero-fee transfer</span>
                  </div>
                </div>
                <input type="radio" name="pay" checked={paymentMethod === "UPI"} readOnly />
              </label>

              <label
                onClick={() => setPaymentMethod("CARD")}
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "CARD" ? "border-primary bg-blue-50/40" : "border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <div>
                    <span className="text-xs font-bold text-text-primary block">Credit / Debit Card</span>
                    <span className="text-[10px] text-text-secondary block">Visa, MasterCard, RuPay</span>
                  </div>
                </div>
                <input type="radio" name="pay" checked={paymentMethod === "CARD"} readOnly />
              </label>
            </div>

            <div className="p-3 bg-amber-50 rounded-lg text-[11px] text-amber-900 border border-amber-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Razorpay Sandbox Mode Active — No real currency will be charged.</span>
            </div>

            <Button
              variant="accent"
              size="lg"
              fullWidth
              onClick={handlePay}
              disabled={isProcessing}
              className="shadow-md"
            >
              {isProcessing ? "Processing Payment..." : `Pay ₹${amount.total} via Razorpay →`}
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
