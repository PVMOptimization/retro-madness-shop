"use client";

import { BUSINESS } from "@/lib/repairData";

export default function StickyCallBar() {
  return (
    <a
      href={BUSINESS.phoneHref}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-3 font-bold py-4 text-center text-white transition-all"
      style={{ background: "#ff0080" }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <span className="font-mono">{BUSINESS.phone}</span>
    </a>
  );
}
