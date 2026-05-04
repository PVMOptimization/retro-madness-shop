"use client";

import { useEffect, useState } from "react";

const EVENTS = [
  { name: "Tyler", city: "Fort Worth", action: "booked a PS5 HDMI repair" },
  { name: "Marcus", city: "Arlington", action: "just got his Xbox fixed" },
  { name: "Destiny", city: "Bedford", action: "booked a Switch screen repair" },
  { name: "Jordan", city: "Hurst", action: "booked a PS5 disc drive repair" },
  { name: "Aaliyah", city: "Euless", action: "just got Joy-Con drift fixed" },
  { name: "Chris", city: "Fort Worth", action: "booked an Xbox HDMI repair" },
  { name: "Darius", city: "Keller", action: "booked a PS5 fan cleaning" },
  { name: "Mia", city: "Grapevine", action: "just shipped her Switch in" },
];

export default function FOMONotification() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const hide = setTimeout(() => setVisible(false), 4000);
    const next = setTimeout(() => {
      setIndex((i) => (i + 1) % EVENTS.length);
      setVisible(true);
    }, 14000);
    return () => { clearTimeout(hide); clearTimeout(next); };
  }, [visible, index]);

  const event = EVENTS[index];

  return (
    <div
      className="fixed bottom-20 lg:bottom-6 left-4 z-50 transition-all duration-500"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="glass-pink rounded-xl px-4 py-3 max-w-[240px] shadow-xl">
        <div className="flex items-start gap-2">
          <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: "#ff0080" }} />
          <p className="text-white text-xs leading-snug">
            <span className="font-semibold">{event.name}</span>{" "}
            <span className="text-white/50">from {event.city}</span>{" "}
            <span>{event.action}</span>
          </p>
        </div>
        <p className="text-white/30 text-[10px] mt-1.5 ml-4 font-mono">just now</p>
      </div>
    </div>
  );
}
