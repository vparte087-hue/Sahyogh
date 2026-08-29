"use client";

import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAppStore } from "@/lib/store/use-app-store";

function DataInitializer({ children }: { children: React.ReactNode }) {
  const { initSupabaseData } = useAppStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Fetch live data from Supabase on every app load so all portals (consumer, admin, worker) share the same dataset
    initSupabaseData().finally(() => setReady(true));
  }, [initSupabaseData]);

  // Show children immediately — data will hydrate in the background
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <DataInitializer>{children}</DataInitializer>
    </QueryClientProvider>
  );
}
