import { Suspense } from "react";
import RepairFunnel from "@/components/RepairFunnel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Console Repair Quote | Retro Madness",
  description:
    "Get an instant price for PS5, Xbox, or Nintendo Switch repair. Walk-in or mail-in available in Fort Worth, TX.",
};

export default function RepairPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-base pt-24 px-4 text-muted">Loading...</div>}>
      <RepairFunnel />
    </Suspense>
  );
}
