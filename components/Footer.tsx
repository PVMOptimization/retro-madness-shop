import Link from "next/link";
import { BUSINESS } from "@/lib/repairData";

const SHOPIFY = "https://retro-madness-pro-console-repair.myshopify.com";

export default function Footer() {
  return (
    <footer className="bg-panel border-t border-white/5 py-14 px-6 lg:px-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        <div>
          <div className="mb-3">
            <span className="font-bold text-lg">
              <span className="text-gradient">RETRO</span>
              <span className="text-white"> MADNESS</span>
            </span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Fast, reliable console repair in Fort Worth. PS5, Xbox, Switch. Walk in or ship it.
          </p>
        </div>
        <div>
          <h3 className="text-white/40 text-xs uppercase tracking-widest font-mono mb-4">Services</h3>
          <ul className="space-y-2.5 text-sm text-white/50">
            <li><Link href="/repair" className="hover:text-accent transition-colors">Console Repair</Link></li>
            <li><Link href="/mail-in-repair" className="hover:text-accent transition-colors">Mail-In Repair</Link></li>
            <li><Link href="/console-repair-fort-worth" className="hover:text-accent transition-colors">Fort Worth Location</Link></li>
            <li><a href={`${SHOPIFY}/collections/all`} target="_blank" rel="noopener noreferrer" className="hover:text-pink transition-colors">Browse Store ↗</a></li>
            <li><a href={SHOPIFY} target="_blank" rel="noopener noreferrer" className="hover:text-pink transition-colors">We Buy Consoles ↗</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white/40 text-xs uppercase tracking-widest font-mono mb-4">Contact</h3>
          <ul className="space-y-2.5 text-sm text-white/50">
            <li><a href={BUSINESS.phoneHref} className="hover:text-accent transition-colors font-mono text-white/70">{BUSINESS.phone}</a></li>
            <li className="leading-relaxed">{BUSINESS.address}</li>
            <li>{BUSINESS.hoursShort}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/25 text-xs font-mono">
        <span>© {new Date().getFullYear()} Retro Madness · Pro Console Repair</span>
        <span>Fort Worth, TX 76132</span>
      </div>
    </footer>
  );
}
