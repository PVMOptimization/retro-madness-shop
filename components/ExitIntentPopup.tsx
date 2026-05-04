"use client";

import { useEffect, useState, useCallback } from "react";
import { BUSINESS } from "@/lib/repairData";

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const show = useCallback(() => { if (!dismissed) setVisible(true); }, [dismissed]);
  const dismiss = useCallback(() => { setVisible(false); setDismissed(true); }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => { if (e.clientY <= 0) show(); };
    document.addEventListener("mouseleave", fn);
    return () => document.removeEventListener("mouseleave", fn);
  }, [show]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [dismiss]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(8,8,24,0.85)", backdropFilter: "blur(12px)" }}
      onClick={dismiss}>
      <div className="relative glass-pink rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <button onClick={dismiss} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: "rgba(255,0,128,0.15)", border: "1px solid rgba(255,0,128,0.3)" }}>
          <span className="text-2xl">🎮</span>
        </div>
        <h2 className="text-white font-bold text-xl mb-2">Before you go —</h2>
        <p className="text-white/60 text-sm mb-6">
          Get a <span className="text-white font-semibold">free diagnosis</span> with any repair. Call us and we&apos;ll tell you exactly what&apos;s wrong.
        </p>
        <a href={BUSINESS.phoneHref}
          className="block w-full font-mono font-bold text-lg py-4 rounded-xl transition-all animate-pulse-pink"
          style={{ background: "#ff0080", color: "#fff" }}>
          {BUSINESS.phone}
        </a>
        <button onClick={dismiss} className="mt-3 text-white/25 text-xs hover:text-white/50 transition-colors">
          No thanks
        </button>
      </div>
    </div>
  );
}
