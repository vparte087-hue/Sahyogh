"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store/use-app-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldCheck, CreditCard, QrCode, Building2, CheckCircle2 } from "lucide-react";

export default function PayPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { requests, processPayment } = useAppStore();

  const request = requests.find((r) => r.id === resolvedParams.id) || requests[0];
  const amount = request.amount || { base: 500, serviceFee: 50, gst: 99, total: 649 };

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(request.status === "PAID");

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      processPayment(request.id);
      setIsProcessing(false);
      setIsPaidSuccess(true);
    }, 1500);
  };

  if (isPaidSuccess) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-success rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary">Payment Successful!</h1>
        <p className="text-sm text-text-secondary">
          Thank you! Payment of <strong className="text-primary">₹{amount.total}</strong> has been confirmed for {request.id}.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="accent"
            size="lg"
            onClick={() => router.push(`/consumer/rate/${request.id}`)}
          >
            Rate Worker Experience ★
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push(`/consumer/track/${request.id}`)}
          >
            View Receipt / Timeline
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link
          href={`/consumer/track/${request.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Tracking
        </Link>
        <h1 className="text-2xl font-bold text-text-primary">Confirm & Pay</h1>
        <p className="text-sm text-text-secondary">
          Review payment summary and choose your digital payment method.
        </p>
      </div>

      {/* Sandbox Notice Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">SANDBOX TEST MODE</span>
          This is a simulated Razorpay payment gateway checkout. No real money will be charged.
        </div>
      </div>

      {/* Order Summary */}
      <Card className="space-y-4">
        <h3 className="text-xs font-bold tracking-widest text-text-secondary uppercase">
          ORDER SUMMARY — {request.id}
        </h3>

        <div className="space-y-2 text-sm text-text-primary border-b border-border pb-4">
          <div className="flex justify-between">
            <span>{request.categoryName} Base Service Fee</span>
            <span className="font-semibold">₹{amount.base}</span>
          </div>

          <div className="flex justify-between text-xs text-text-secondary">
            <span>Cooperative Platform Service Fee</span>
            <span>₹{amount.serviceFee}</span>
          </div>

          <div className="flex justify-between text-xs text-text-secondary">
            <span>GST (18%)</span>
            <span>₹{amount.gst}</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-lg font-bold text-primary pt-1">
          <span>Total Payable</span>
          <span className="text-xl text-accent">₹{amount.total}</span>
        </div>
      </Card>

      {/* Payment Method Selector */}
      <Card className="space-y-4">
        <h3 className="text-xs font-bold tracking-widest text-text-secondary uppercase">
          SELECT PAYMENT METHOD
        </h3>

        <div className="space-y-3">
          <label
            onClick={() => setPaymentMethod("upi")}
            className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
              paymentMethod === "upi"
                ? "border-primary bg-blue-50/40 ring-1 ring-primary"
                : "border-border hover:bg-gray-50"
            }`}
          >
            <input type="radio" name="payment" checked={paymentMethod === "upi"} onChange={() => {}} />
            <QrCode className="w-5 h-5 text-primary" />
            <div>
              <span className="font-bold text-sm block">UPI / GPay / PhonePe / Paytm</span>
              <span className="text-xs text-text-secondary">Instant zero-fee transfer</span>
            </div>
          </label>

          <label
            onClick={() => setPaymentMethod("card")}
            className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
              paymentMethod === "card"
                ? "border-primary bg-blue-50/40 ring-1 ring-primary"
                : "border-border hover:bg-gray-50"
            }`}
          >
            <input type="radio" name="payment" checked={paymentMethod === "card"} onChange={() => {}} />
            <CreditCard className="w-5 h-5 text-primary" />
            <div>
              <span className="font-bold text-sm block">Debit / Credit Card</span>
              <span className="text-xs text-text-secondary">Visa, Mastercard, RuPay</span>
            </div>
          </label>

          <label
            onClick={() => setPaymentMethod("netbanking")}
            className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
              paymentMethod === "netbanking"
                ? "border-primary bg-blue-50/40 ring-1 ring-primary"
                : "border-border hover:bg-gray-50"
            }`}
          >
            <input type="radio" name="payment" checked={paymentMethod === "netbanking"} onChange={() => {}} />
            <Building2 className="w-5 h-5 text-primary" />
            <div>
              <span className="font-bold text-sm block">Net Banking</span>
              <span className="text-xs text-text-secondary">All major Indian banks supported</span>
            </div>
          </label>
        </div>
      </Card>

      {/* Pay CTA */}
      <Button
        variant="accent"
        size="lg"
        fullWidth
        disabled={isProcessing}
        onClick={handlePay}
        className="shadow-lg py-4 text-base"
      >
        {isProcessing ? "Processing Payment..." : `Pay ₹${amount.total}`}
      </Button>
    </div>
  );
}
