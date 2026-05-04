"use client";

import { useEffect, useState } from "react";
import { BUSINESS } from "@/lib/repairData";

type Phase = "hidden" | "typing" | "open" | "dismissed";

export default function ChatWidget() {
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    const t = setTimeout(() => setPhase("typing"), 10000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;
    const t = setTimeout(() => setPhase("open"), 3000);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "hidden" || phase === "dismissed") return null;

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 z-50 flex flex-col items-end gap-2">
      {phase === "typing" && (
        <div className="glass rounded-2xl rounded-br-sm px-4 py-3 flex items-center gap-1.5 shadow-xl">
          {[0, 1, 2].map((i) => (
            <span key={i} className="w-2 h-2 rounded-full bg-white/30 inline-block animate-typing-dot"
              style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      )}
      {phase === "open" && (
        <div className="glass rounded-2xl rounded-br-sm px-4 py-3 max-w-[220px] shadow-xl animate-fade-up">
          <p className="text-white text-sm">Need help with a console? I&apos;m here 👋</p>
          <a href={BUSINESS.phoneHref} className="mt-2 block text-accent text-xs font-mono hover:text-accent-hover">
            Call {BUSINESS.phone}
          </a>
        </div>
      )}
      <button
        onClick={() => phase === "open" && setPhase("dismissed")}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all animate-pulse-cyan"
        style={{ background: "#00e5ff" }}
        aria-label="Chat"
      >
        <svg className="w-6 h-6 text-base" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </div>
  );
}
