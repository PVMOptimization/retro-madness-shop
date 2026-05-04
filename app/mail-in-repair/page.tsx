import Link from "next/link";
import type { Metadata } from "next";
import { BUSINESS } from "@/lib/repairData";

export const metadata: Metadata = {
  title: "Mail-In Console Repair | Retro Madness",
  description:
    "Ship your console to us for repair. Fast turnaround, tracked shipping, and a no-fix-no-pay guarantee.",
};

function CopyButton({ text }: { text: string }) {
  return (
    <span className="text-xs text-muted ml-2 cursor-pointer select-none hover:text-accent transition-colors">
      [copy]
    </span>
  );
}

export default function MailInPage() {
  const steps = [
    {
      num: "01",
      title: "Fill out the form",
      body: "Tell us your device and issue. We'll confirm pricing before you ship anything.",
    },
    {
      num: "02",
      title: "Package & ship",
      body: `Pack your console securely. Ship to: ${BUSINESS.address}. Use any carrier — we recommend USPS Priority or UPS.`,
    },
    {
      num: "03",
      title: "We repair it",
      body: "Once we receive it, we'll start the repair. You'll get a call or text with an update.",
    },
    {
      num: "04",
      title: "We ship it back",
      body: "Fully repaired and tested, shipped back to your door. Tracking number included.",
    },
  ];

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-base">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-accent text-xs uppercase tracking-widest mb-4">
            Not Local?
          </p>
          <h1 className="text-white font-bold text-4xl md:text-5xl mb-4">
            Mail-In Repair
          </h1>
          <p className="text-muted text-lg max-w-xl">
            Ship us your console. We fix it, we ship it back. Simple.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 pb-20 bg-base">
        <div className="max-w-3xl mx-auto space-y-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex gap-6 bg-panel border border-white/10 rounded-2xl p-6"
            >
              <span className="font-mono text-accent text-3xl font-bold shrink-0">
                {step.num}
              </span>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ship-to address */}
      <section className="px-6 py-16 bg-panel">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-accent text-xs uppercase tracking-widest mb-4">
            Ship To
          </p>
          <div className="bg-base border border-white/10 rounded-2xl p-8">
            <p className="text-white font-bold text-xl mb-1">Retro Madness</p>
            <p className="text-white font-mono text-lg">{BUSINESS.address}</p>
            <p className="text-muted text-sm mt-4">
              Include a note with your name, phone number, and description of the issue.
            </p>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="px-6 py-16 bg-base">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-panel border border-white/10 rounded-2xl p-6">
            <p className="font-mono text-accent text-xs uppercase tracking-widest mb-3">
              Turnaround
            </p>
            <p className="text-white font-bold text-2xl mb-1">3–7 days</p>
            <p className="text-muted text-sm">
              From when we receive it. Complex repairs may take longer — we&apos;ll tell you upfront.
            </p>
          </div>
          <div className="bg-panel border border-white/10 rounded-2xl p-6">
            <p className="font-mono text-accent text-xs uppercase tracking-widest mb-3">
              Guarantee
            </p>
            <p className="text-white font-bold text-2xl mb-1">No fix, no pay</p>
            <p className="text-muted text-sm">
              If we can&apos;t fix it, you pay nothing. We&apos;ll ship it back at our cost.
            </p>
          </div>
          <div className="bg-panel border border-white/10 rounded-2xl p-6">
            <p className="font-mono text-accent text-xs uppercase tracking-widest mb-3">
              Pricing
            </p>
            <p className="text-white font-bold text-2xl mb-1">Upfront</p>
            <p className="text-muted text-sm">
              We confirm the price before we start. No surprise charges when you get it back.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-panel text-center">
        <h2 className="text-white font-bold text-3xl mb-4">
          Ready to send it in?
        </h2>
        <p className="text-muted mb-8">
          Start by selecting your device — takes 2 minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/repair"
            className="inline-flex items-center justify-center gap-2 bg-accent text-base font-bold px-8 py-4 rounded-xl hover:bg-accent-hover transition-colors text-lg"
          >
            Get Repair Quote →
          </Link>
          <a
            href={BUSINESS.phoneHref}
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:border-accent hover:text-accent transition-colors font-mono"
          >
            {BUSINESS.phone}
          </a>
        </div>
      </section>
    </>
  );
}
