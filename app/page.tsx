"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { repairs, BUSINESS } from "@/lib/repairData";

const ConsoleScene = dynamic(() => import("@/components/ConsoleScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const SHOPIFY = "https://retro-madness-pro-console-repair.myshopify.com";

const MERCH = [
  {
    title: "RM Cuffed Beanie",
    price: "16.00",
    url: "https://retro-madness-pro-console-repair.myshopify.com/products/rm-cuffed-beanie?variant=40940546719811",
    image: "https://cdn.shopify.com/s/files/1/0095/0730/7567/files/cuffed-beanie-black-front-65cd47cbdb453.jpg?v=1768248555",
  },
  {
    title: "RM Good Guys Hoodie",
    price: "32.57",
    url: "https://retro-madness-pro-console-repair.myshopify.com/products/rm-good-guys-unisex-hoodie?variant=40730181238851",
    image: "https://cdn.shopify.com/s/files/1/0095/0730/7567/files/unisex-heavy-blend-hoodie-light-blue-front-654977fe865e2.jpg?v=1699313678",
  },
  {
    title: "RM Zelda Hoodie",
    price: "32.57",
    url: "https://retro-madness-pro-console-repair.myshopify.com/products/rm-zelda-unisex-hoodie?variant=40730110361667",
    image: "https://cdn.shopify.com/s/files/1/0095/0730/7567/files/unisex-heavy-blend-hoodie-sport-grey-front-654964a0d379d.jpg?v=1699308720",
  },
  {
    title: "RM Bad Guys Hoodie",
    price: "32.00",
    url: "https://retro-madness-pro-console-repair.myshopify.com/products/rm-bad-guys-unisex-hoodie?variant=40730139099203",
    image: "https://cdn.shopify.com/s/files/1/0095/0730/7567/files/unisex-heavy-blend-hoodie-indigo-blue-front-6549691c9bd27.jpg?v=1699309869",
  },
  {
    title: "RM Mario Hoodie",
    price: "27.57",
    url: "https://retro-madness-pro-console-repair.myshopify.com/products/rm-mario-unisex-hoodie?variant=40730086473795",
    image: "https://cdn.shopify.com/s/files/1/0095/0730/7567/files/unisex-heavy-blend-hoodie-black-front-6549615c21ae4.jpg?v=1768940705",
  },
  {
    title: "RM Mario Long Sleeve",
    price: "21.57",
    url: "https://retro-madness-pro-console-repair.myshopify.com/products/rm-mario-men-s-long-sleeve-shirt?variant=40685940834371",
    image: "https://cdn.shopify.com/s/files/1/0095/0730/7567/files/mens-long-sleeve-shirt-black-front-65401f806fc2f.jpg?v=1698701192",
  },
  {
    title: "RM Zelda Long Sleeve",
    price: "20.00",
    url: "https://retro-madness-pro-console-repair.myshopify.com/products/rm-zelda-long-sleeve-shirt?variant=40686023671875",
    image: "https://cdn.shopify.com/s/files/1/0095/0730/7567/files/mens-long-sleeve-shirt-sport-grey-front-65402f2a50d1e.jpg?v=1698705206",
  },
];

const FAQ = [
  { q: "How long does a repair take?", a: "Most repairs are same day — HDMI ports, fan cleaning, Joy-Con drift. Complex board-level jobs take 1–2 days. You'll know before we start." },
  { q: "Do I need an appointment?", a: "No. Walk in any time we're open. No scheduling, no queue." },
  { q: "What if you can't fix it?", a: "You pay nothing. No diagnosis fee, no inspection charge." },
  { q: "Is there a warranty?", a: "90 days on all repairs. Same issue comes back — we fix it free." },
  { q: "Can I ship my console?", a: "Yes. Mail-in repairs for customers anywhere in the US. We ship it back tracked." },
  { q: "What payment do you accept?", a: "Cash, all major cards, Venmo, Cash App, PayPal. Pay at pickup." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-xl overflow-hidden mb-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left group"
      >
        <span className="text-white font-medium text-sm group-hover:text-accent transition-colors pr-8">{q}</span>
        <span className="text-accent font-mono text-lg shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {open && <p className="text-muted text-sm leading-relaxed px-5 pb-4">{a}</p>}
    </div>
  );
}

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const fn = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setProgress(Math.max(0, Math.min(1, -rect.top / (rect.height * 0.6))));
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [ref]);
  return progress;
}

function useTimeStatus() {
  const [s, setS] = useState<{ label: string; open: boolean } | null>(null);
  useEffect(() => {
    const h = new Date().getHours();
    const day = new Date().getDay();
    const isSun = day === 0;
    const open = isSun ? h >= 12 && h < 18 : h >= 11 && h < 20;
    let label = "";
    if (isSun) label = h < 12 ? "Opens at 12 PM" : h < 18 ? "Open until 6 PM" : "Closed — back Mon 11 AM";
    else label = h < 11 ? "Opens at 11 AM" : h < 20 ? "Open now" : "Closed — back tomorrow 11 AM";
    setS({ label, open });
  }, []);
  return s;
}

function getSlotsRemaining() {
  const d = new Date();
  return 2 + ((d.getDate() * 7 + d.getMonth() * 31) % 3);
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const scrollProgress = useScrollProgress(heroRef);
  const status = useTimeStatus();
  const slots = getSlotsRemaining();

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden pt-[72px]">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,0,128,0.18) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)", transform: "translate(20%, 20%)" }} />

        {/* Retro grid floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[55%] pointer-events-none overflow-hidden"
          style={{ perspective: "600px" }}>
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(255,0,128,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,128,0.22) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform: "rotateX(55deg) translateY(20%)",
            transformOrigin: "50% 0%",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 100%)",
          }} />
        </div>

        {/* Left — copy */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-16 lg:py-0 lg:w-[52%] lg:pl-14 lg:pr-10">
          <p className="font-mono text-xs uppercase tracking-[0.35em] mb-5" style={{ color: "#ff0080" }}>
            Fort Worth · Walk-In · Mail-In
          </p>
          <h1 className="font-bold leading-[0.88] tracking-tighter mb-6"
            style={{ fontSize: "clamp(3.8rem, 9vw, 8rem)" }}>
            <span className="block text-white">RETRO</span>
            <span className="block text-gradient">MADNESS</span>
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-sm leading-relaxed">
            Console broken? We fix it — fast, same day, upfront price. No guesswork.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link href="/repair"
              className="inline-flex items-center justify-center gap-2 font-bold px-7 py-3.5 rounded-lg text-base transition-all"
              style={{ background: "#ff0080", color: "#fff" }}>
              Start Repair →
            </Link>
            <a href={BUSINESS.phoneHref}
              className="inline-flex items-center justify-center gap-2 font-mono font-bold px-7 py-3.5 rounded-lg border-2 text-accent hover:bg-accent/10 transition-colors"
              style={{ borderColor: "#00e5ff" }}>
              {BUSINESS.phone}
            </a>
          </div>
          <div className="glass rounded-xl px-5 py-4 inline-flex flex-col gap-2 max-w-xs">
            {status && (
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full shrink-0 ${status.open ? "bg-accent" : "bg-danger"}`} />
                <span className="font-mono text-xs text-white">{status.label}</span>
              </div>
            )}
            <span className="text-muted text-xs">{BUSINESS.address}</span>
            <span className="text-muted text-xs">{BUSINESS.hoursShort}</span>
          </div>
        </div>

        {/* Right — 3D console */}
        <div className="relative lg:w-[48%] h-[50vw] lg:h-auto min-h-[340px]">
          <ConsoleScene scrollProgress={scrollProgress} className="absolute inset-0 w-full h-full" />
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted/40 text-xs font-mono">
          <span>scroll</span>
          <span className="animate-bounce">↓</span>
        </div>
      </section>

      {/* ── DEVICE SELECTION ─────────────────────────────────── */}
      <section className="relative bg-base px-6 py-20 lg:px-14">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent)" }} />
        <p className="font-mono text-xs uppercase tracking-[0.35em] mb-3" style={{ color: "#00e5ff" }}>Start here</p>
        <h2 className="text-white font-bold mb-10" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
          What needs fixing?
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {repairs.map((device) => (
            <Link key={device.id} href={`/repair?device=${device.id}`}
              className="group glass rounded-2xl p-6 hover:border-white/20 transition-all duration-200 relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ background: "linear-gradient(135deg, rgba(255,0,128,0.08) 0%, rgba(0,229,255,0.08) 100%)" }} />
              <span className="relative block font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "#ff0080" }}>
                {device.shortLabel}
              </span>
              <span className="relative block text-white font-bold text-xl mb-4 group-hover:text-accent transition-colors">
                {device.label}
              </span>
              <div className="relative flex items-end justify-between">
                <span className="text-muted text-xs">{device.issues.length} repairs</span>
                <span className="font-mono text-white font-bold">
                  from ${Math.min(...device.issues.map((i) => i.price))}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/mail-in-repair" className="text-muted text-sm hover:text-accent transition-colors">
            Not local? Mail-In Repair →
          </Link>
        </div>
      </section>

      {/* ── HONEST COPY ──────────────────────────────────────── */}
      <section className="bg-panel px-6 py-20 lg:px-14 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(255,0,128,0.07) 0%, transparent 60%)" }} />
        <div className="relative max-w-3xl">
          <p className="text-white font-medium leading-relaxed"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.45rem)" }}>
            Fort Worth&apos;s fastest console repair. We stock the parts, we know the hardware,
            and we don&apos;t charge you if we can&apos;t fix it. Most consoles walk out the same day.
          </p>
          <p className="text-gradient font-bold mt-6 tracking-tight"
            style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)" }}>
            &quot;No appointment. No guesswork. No surprise charges.&quot;
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-xs text-muted font-mono">
            <span><span style={{ color: "#00e5ff" }}>✓</span> 90-day warranty</span>
            <span><span style={{ color: "#ff0080" }}>✓</span> No-fix no-pay</span>
            <span><span style={{ color: "#00e5ff" }}>✓</span> Same-day most repairs</span>
            <span><span style={{ color: "#ff0080" }}>✓</span> Walk-in or mail-in</span>
          </div>
        </div>
      </section>

      {/* ── URGENCY ──────────────────────────────────────────── */}
      <section className="bg-base border-t border-b border-white/5 px-6 py-7 lg:px-14">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
          <div>
            <p className="text-white font-semibold">
              Today&apos;s repair slots:{" "}
              <span className="font-mono" style={{ color: "#00e5ff" }}>{slots} remaining</span>
            </p>
            <p className="text-muted text-xs mt-1 font-mono">Walk-ins served first · Slots reset daily</p>
          </div>
          <div className="flex gap-1.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`h-3 w-8 rounded-sm transition-colors`}
                style={{ background: i < 5 - slots ? "rgba(255,255,255,0.08)" : "#00e5ff" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MERCH ────────────────────────────────────────────── */}
      <section className="bg-panel px-6 py-20 lg:px-14">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] mb-2" style={{ color: "#ff0080" }}>
              Madness Merch
            </p>
            <h2 className="text-white font-bold" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
              Rep the brand.
            </h2>
          </div>
          <a href={`${SHOPIFY}/collections/all`} target="_blank" rel="noopener noreferrer"
            className="text-muted text-sm hover:text-accent transition-colors shrink-0">
            View all →
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {MERCH.map((item) => (
            <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer"
              className="group glass rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-200">
              <div className="aspect-square overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <p className="text-white text-sm font-medium leading-snug mb-2 group-hover:text-accent transition-colors">
                  {item.title}
                </p>
                <p className="font-mono font-bold text-sm" style={{ color: "#ff0080" }}>
                  ${item.price}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="bg-base px-6 py-20 lg:px-14">
        <p className="font-mono text-xs uppercase tracking-[0.35em] mb-3" style={{ color: "#ff0080" }}>Common questions</p>
        <h2 className="text-white font-bold text-2xl mb-8">Answered honestly.</h2>
        <div className="max-w-2xl">
          {FAQ.map((item) => <FAQItem key={item.q} q={item.q} a={item.a} />)}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/repair"
              className="inline-flex items-center justify-center gap-2 font-bold px-6 py-3 rounded-lg text-base transition-all"
              style={{ background: "#ff0080", color: "#fff" }}>
              Start Repair →
            </Link>
            <a href={BUSINESS.phoneHref}
              className="inline-flex items-center justify-center gap-2 font-mono font-bold px-6 py-3 rounded-lg border-2 text-accent hover:bg-accent/10 transition-colors"
              style={{ borderColor: "#00e5ff" }}>
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── BOTTOM STRIP ─────────────────────────────────────── */}
      <section className="glass border-t border-white/5 px-6 py-8 lg:px-14">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:justify-between">
          <div>
            <p className="text-muted text-xs uppercase tracking-widest mb-2 font-mono">We accept</p>
            <p className="text-white text-sm">Cash · Card · Venmo · Cash App · PayPal</p>
          </div>
          <div className="flex gap-5 text-sm">
            <a href={`${SHOPIFY}/collections/all`} target="_blank" rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors">Browse Store ↗</a>
            <a href={SHOPIFY} target="_blank" rel="noopener noreferrer"
              className="text-muted transition-colors" style={{ color: undefined }}
              onMouseEnter={e => (e.currentTarget.style.color = "#ff0080")}
              onMouseLeave={e => (e.currentTarget.style.color = "")}>We Buy Consoles ↗</a>
          </div>
        </div>
      </section>
    </>
  );
}