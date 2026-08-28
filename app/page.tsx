"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/consumer/dashboard");
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-sm text-text-secondary">Loading Sahyog (सहयोग) Platform...</p>
    </div>
  );
}
