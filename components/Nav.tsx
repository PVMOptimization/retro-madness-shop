"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { BUSINESS } from "@/lib/repairData";

const SHOPIFY = "https://retro-madness-pro-console-repair.myshopify.com";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 grid grid-cols-3 items-center px-6 py-4 border-b border-white/5"
        style={{
          background: "rgba(8,8,24,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* LEFT */}
        <div className="flex items-center justify-start">
          <Link href="/" className="flex items-center gap-1 shrink-0">
            <span
              className="hidden md:inline font-bold tracking-tight"
              style={{ fontSize: "1.1rem" }}
            >
              <span className="text-gradient">RETRO</span>
              <span className="text-white"> MADNESS</span>
            </span>
          </Link>

          {/* Start Repair - MOBILE ONLY (moved left) */}
          <Link
            href="/repair"
            className="ml-3 md:hidden font-bold text-sm px-3 py-1.5 rounded-lg transition-all animate-pulse-pink"
            style={{ background: "#ff0080", color: "#fff" }}
          >
            Repair
          </Link>
        </div>

        {/* CENTER LOGO */}
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            alt="Retro Madness Logo"
            width={105}
            height={38}
            className="object-contain"
            priority
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-end gap-3">
          <a
            href={BUSINESS.phoneHref}
            className="hidden md:block font-mono text-sm text-white/50 hover:text-white transition-colors"
          >
            {BUSINESS.phone}
          </a>

          {/* Desktop Start Repair */}
          <Link
            href="/repair"
            className="hidden md:inline font-bold text-sm px-4 py-2 rounded-lg transition-all animate-pulse-pink"
            style={{ background: "#ff0080", color: "#fff" }}
          >
            Start Repair
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-1.5"
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-5 h-[2px] bg-white transition-all ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block w-5 h-[2px] bg-white transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-[2px] bg-white transition-all ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* DESKTOP NAV LINKS UNDER NAVBAR */}
      <div
        className="hidden lg:flex fixed top-[72px] left-0 right-0 z-40 justify-center gap-8 py-3 border-b border-white/5"
        style={{
          background: "rgba(8,8,24,0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <Link href="/repair" className="text-white/60 text-sm hover:text-accent transition-colors">
          Repair
        </Link>
        <Link href="/mail-in-repair" className="text-white/60 text-sm hover:text-accent transition-colors">
          Mail-In
        </Link>
        <Link href="/console-repair-fort-worth" className="text-white/60 text-sm hover:text-accent transition-colors">
          Location
        </Link>
        <a href={`${SHOPIFY}/collections/all`} target="_blank" rel="noopener noreferrer"
          className="text-white/60 text-sm hover:text-accent transition-colors">
          Store ↗
        </a>
        <a href={SHOPIFY} target="_blank" rel="noopener noreferrer"
          className="text-white/60 text-sm hover:text-pink transition-colors">
          We Buy ↗
        </a>
      </div>

      {/* MOBILE DRAWER */}
      {open && (
        <div
          className="fixed inset-0 z-40 pt-[72px] px-6 flex flex-col lg:hidden"
          style={{ background: "rgba(8,8,24,0.97)", backdropFilter: "blur(20px)" }}
          onClick={() => setOpen(false)}
        >
          {[
            { href: "/repair", label: "Repair", color: "text-white" },
            { href: "/mail-in-repair", label: "Mail-In Repair", color: "text-white/60" },
            { href: "/console-repair-fort-worth", label: "Location", color: "text-white/60" },
          ].map(({ href, label, color }) => (
            <Link key={href} href={href} className={`py-4 border-b border-white/5 ${color} font-medium`}>
              {label}
            </Link>
          ))}

          <a href={`${SHOPIFY}/collections/all`} target="_blank" rel="noopener noreferrer"
            className="py-4 border-b border-white/5 text-white/60">
            Browse Store ↗
          </a>

          <a href={SHOPIFY} target="_blank" rel="noopener noreferrer"
            className="py-4 border-b border-white/5 text-white/60">
            We Buy Consoles ↗
          </a>

          <a href={BUSINESS.phoneHref} className="mt-8 font-mono text-accent text-2xl font-bold">
            {BUSINESS.phone}
          </a>
        </div>
      )}
    </>
  );
}